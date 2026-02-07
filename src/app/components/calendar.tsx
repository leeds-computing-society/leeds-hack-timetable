"use client";
import useSWR from "swr";
import * as z from "zod";
import { Event, EventType } from "./event";
import { useWindowSize } from "../hooks/window-size";
import { useEffect, useRef, useState } from "react";

interface Cluster
{
    start: Date;
    end: Date;
    eventList: Array<EventType>;
};

interface ClusterLayout
{
    offset: number;
    height: number;
    eventList: Array<EventTypeLayout>;
};

interface EventTypeLayout
{
    offset: number;
    height: number;
    name: string;
    location: string;
    start: Date;
    end: Date;
};

const CalendarResponseSchema = z.array(z.object({
    name: z.string(),
    location: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date()
}));

type CalendarResponse = z.infer<typeof CalendarResponseSchema>;

const fetcher = async (): Promise<CalendarResponse> =>
{
    let response = await fetch(`https://api.timetable.leedshack.com/event`, {
        method: "GET"
    });

    let responseSafe = CalendarResponseSchema.safeParse(await response.json());

    if (responseSafe.success === false) throw new Error("Malformed response loading route list.");

    return responseSafe.data;
};

function cluster(eventList: Array<EventType>): Array<Cluster>
{
    let clusterList: Array<Cluster> = [];

    let eventIndex: number = 0;
    let clusterIndex: number = 0;

    while (eventIndex < eventList.length)
    {
        let event: EventType = eventList[eventIndex];

        clusterList.push({
            start: event.start,
            end: event.end,
            eventList: [event]
        });

        let skipped: number = 0;

        for (let checkEventIndex = eventIndex + 1; checkEventIndex < eventList.length; checkEventIndex++)
        {
            let checkEvent: EventType = eventList[checkEventIndex];

            if (event.end.getTime() <= checkEvent.start.getTime()) break;

            clusterList[clusterIndex].eventList.push(checkEvent);
            if (clusterList[clusterIndex].end.getTime() <= checkEvent.end.getTime()) clusterList[clusterIndex].end = checkEvent.end;
            skipped++;
        };

        eventIndex += skipped + 1;
        clusterIndex++;
    };

    return clusterList;
};

interface Properties
{
    className: string;
};

export const Calendar = (properties: Properties) =>
{
    let { data, error, isLoading } = useSWR("calendar", fetcher);

    let windowSize = useWindowSize();
    let containerReference = useRef<HTMLDivElement>(null);
    let [outputClusterList, setOutputClusterList] = useState<ClusterLayout[]>([]);
    let [currentTime, setCurrentTime] = useState<Date>(new Date());

    const buffer = 128;
    const offset = 384;
    const pixelsPerMinute = 4;

    useEffect(() =>
    {
        let frameId: number;

        let update = () =>
        {
            setCurrentTime((previous) =>
            {
                if (Date.now() - previous.getTime() < 10000) return previous;
                return new Date();
            });
            frameId = requestAnimationFrame(update);
        };

        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, []);

    useEffect(() =>
    {
        if (containerReference.current === null) return;
        if (currentTime === undefined) return;
        if (data === undefined) data = [];

        let height = containerReference.current.clientHeight;

        let fromTime = currentTime.getTime() - ((offset + buffer) / pixelsPerMinute * 60000);
        let toTime = currentTime.getTime() + ((height - offset + buffer) / pixelsPerMinute * 60000);

        data.sort((a, b) =>
        {
            if (a.start.getTime() !== b.start.getTime()) return a.start.getTime() - b.start.getTime();
            return a.end.getTime() - b.end.getTime();
        });

        let clusterList: Cluster[] = cluster(data);
        let inViewClusterList: ClusterLayout[] = [];

        for (let cluster of clusterList)
        {
            if ((cluster.end.getTime() < fromTime || cluster.end.getTime() > toTime) &&
                (cluster.start.getTime() < fromTime || cluster.start.getTime() > toTime)) continue;

            inViewClusterList.push({
                offset: Math.max(0, cluster.start.getTime() - fromTime) / 60000 * pixelsPerMinute,
                height: (Math.min(cluster.end.getTime(), toTime) - Math.max(cluster.start.getTime(), fromTime)) / 60000 * pixelsPerMinute,
                eventList: cluster.eventList.map((event) =>
                {
                    return {
                        offset: (event.start.getTime() - Math.max(cluster.start.getTime(), fromTime)) / 60000 * pixelsPerMinute,
                        height: (Math.min(event.end.getTime(), toTime) - event.start.getTime()) / 60000 * pixelsPerMinute,
                        name: event.name,
                        location: event.location,
                        start: event.start,
                        end: event.end
                    };
                })
            });
        };

        setOutputClusterList([...inViewClusterList]);
    }, [data, currentTime, windowSize]);

    // // if (error) return <div></div>;
    // // if (isLoading) return <div></div>;
    // if (data === undefined) data = [];

    // data.sort((a, b) =>
    // {
    //     if (a.start.getTime() !== b.start.getTime()) return a.start.getTime() - b.start.getTime();
    //     return a.end.getTime() - b.end.getTime();
    // });

    // let clusterList: Array<Cluster> = cluster(data);

    return (
        <div ref={containerReference} {...properties}>
            <div className="absolute w-full h-full">
                {/* <div className="absolute h-0.5 w-full bg-leeds-hack-2026-primary-200/75" style={{ top: offset }}></div> */}
                {outputClusterList.map((cluster, index) => <div className="absolute w-full left-0 overflow-hidden" style={{
                    top: cluster.offset - buffer,
                    height: cluster.height
                }} key={index}>
                    {cluster.eventList.map((event, index) => <div className="absolute" style={{
                        width: `${100 / cluster.eventList.length}%`,
                        left: `${100 / cluster.eventList.length * index}%`,
                        top: event.offset,
                        height: event.height,
                        paddingRight: index + 1 === cluster.eventList.length ? undefined : 4,
                        paddingBottom: 4
                    }} key={index}>
                        <Event className="h-full" style={{
                        }} {...event}></Event>
                    </div>)}
                </div>)}
            </div>
        </div>
    );
};
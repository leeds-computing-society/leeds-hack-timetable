"use client";
import { useState, useEffect, useRef } from "react";

interface Properties
{
    target: Date;
};

interface TimeRemaining
{
    hours: number;
    minutes: number;
    seconds: number;
};

export const Countdown = (properties: Properties) =>
{
    const requestReference = useRef<number | null>(null);
    const containerReference = useRef<HTMLDivElement>(null);
    const targetEpoch: number = new Date(properties.target).getTime();
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const format = (remaining: TimeRemaining) =>
    {
        if (remaining.hours < 1)
        {
            if (remaining.minutes < 1) return `${String(remaining.seconds).padStart(2, "0")}`;
            return `${String(remaining.minutes).padStart(2, "0")}:${String(remaining.seconds).padStart(2, "0")}`;
        };

        return `${String(remaining.hours).padStart(2, "0")}:${String(remaining.minutes).padStart(2, "0")}:${String(remaining.seconds).padStart(2, "0")}`;
    };

    const update = () =>
    {
        let now: number = Date.now();
        let remaining: number = targetEpoch - now;

        if (remaining <= 0)
        {
            setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
            cancelAnimationFrame(requestReference.current!);
            return;
        };

        let hours = Math.floor(remaining / (1000 * 60 * 60));
        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        setTimeRemaining((previous) =>
        {
            if (previous.hours === hours &&
                previous.minutes === minutes &&
                previous.seconds === seconds) return previous;
            return { hours, minutes, seconds };
        });

        requestReference.current = requestAnimationFrame(update);
    };

    useEffect(() =>
    {
        requestReference.current = requestAnimationFrame(update);

        return () =>
        {
            if (requestReference.current !== null) cancelAnimationFrame(requestReference.current);
        };
    }, [properties.target]);

    if (timeRemaining.hours < 1)
    {
        return <div className="text-[#fb2a4d]">{format(timeRemaining)}</div>;
    };

    return <div className="text-white" ref={containerReference}>{format(timeRemaining)}</div>;
};
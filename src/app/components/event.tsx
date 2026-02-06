"use client";
import * as z from "zod";

export const EventSchema = z.object({
    name: z.string(),
    location: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date()
});

export type EventType = z.infer<typeof EventSchema>;

type Properties = React.HTMLAttributes<HTMLDivElement> & EventType;

export const Event = (properties: Properties) =>
{
    const timeToHuman = (date: Date) =>
    {
        return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };

    return (
        <div className={"border border-white/50 bg-white/10 text-white px-3 py-3 flex flex-col gap-6 " + properties.className} style={properties.style}>
            <div className="flex flex-col">
                <div className="text-md">{properties.name}</div>
                <div className="text-sm text-white/75">{properties.location}</div>
            </div>
            <div className="text-sm">{timeToHuman(properties.start)} - {timeToHuman(properties.end)}</div>
        </div>
    );
};
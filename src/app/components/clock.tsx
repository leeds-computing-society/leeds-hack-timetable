"use client";
import { useState, useEffect, useRef } from "react";

interface Time
{
    hour: number;
    minute: number;
    second: number;
};

export const Clock = () =>
{
    const requestReference = useRef<number | null>(null);
    const [time, setTime] = useState<Time>({
        hour: 0,
        minute: 0,
        second: 0,
    });

    const format = (remaining: Time) =>
    {
        return `${String(remaining.hour).padStart(2, "0")}:${String(remaining.minute).padStart(2, "0")}:${String(remaining.second).padStart(2, "0")}`;
    };

    const update = () =>
    {
        let now: Date = new Date();

        setTime((previous) =>
        {
            if (previous.hour === now.getHours() &&
                previous.minute === now.getMinutes() &&
                previous.second === now.getSeconds()) return previous;
            return {
                hour: now.getHours(),
                minute: now.getMinutes(),
                second: now.getSeconds()
            };
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
    }, []);

    return <>{format(time)}</>;
};
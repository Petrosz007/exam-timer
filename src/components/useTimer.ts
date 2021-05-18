import { Duration } from "luxon";
import { useCallback, useEffect, useState } from "react";

export const useTimer = (duration: number) => {
    const [timeRemaining, setTimeRemaining] = useState(Duration.fromMillis(duration));
    const [intervalId, setIntervalId] = useState<number|undefined>(undefined);

    useEffect(() => {
        if(timeRemaining.toMillis() < 0) {
            clearInterval(intervalId);
            setIntervalId(undefined);
            setTimeRemaining(Duration.fromMillis(0));
        }
    }, [timeRemaining, intervalId, setTimeRemaining]);

    const start = useCallback((newDuration: number) => {
        if(intervalId !== undefined) {
            clearInterval(intervalId);
        }

        setTimeRemaining(Duration.fromMillis(newDuration));
        const interval = window.setInterval(() => {
            setTimeRemaining(prevTime => prevTime.minus({ milliseconds: 100 }));
        }, 100);
        setIntervalId(interval);
    }, [setTimeRemaining, setIntervalId, intervalId]);

    return [timeRemaining, start] as const;
}
import React, { useEffect, useState } from "react";

const Timer = () => {
    const MINUTES_IN_MS = 10 * 60 * 1000;
    const INTERVAL = 1000;
    const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - INTERVAL);
        }, INTERVAL);

        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log("타임아웃이다.");
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
    const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

    return (
        <span>
            {minutes} : {second}
        </span>
    );
}

export default Timer;
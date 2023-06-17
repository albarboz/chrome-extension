import { useState, useEffect } from 'react';
import './css/Time.css'

export default function Time() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const currentTime = date.toLocaleTimeString('en-us', { timeStyle: 'short' });
            setTime(currentTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
            <div className="time-container">
                <h1 className="time">{time}</h1>
            </div>
    )
}
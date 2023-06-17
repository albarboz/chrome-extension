import React from 'react'
import Draggable from 'react-draggable';
import { useState } from 'react';
import './css/Inspiration.css'

type InspirationData = {
    quote: string;
}

export default function Inspiration() {
    const [inspiration, setInspiration] = useState<InspirationData | null>(null)

    React.useEffect(() => {
        fetch("https://api.kanye.rest/")
            .then(response => response.json())
            .then(data => {
                setInspiration(data)
            })
    }, [])

    return (
        <Draggable>
            <div className="quote-container">
                <h1>Inspiration</h1>
                {inspiration && <h1 className="quote"><em>"{inspiration.quote}"</em></h1>}
            </div>
        </Draggable>
    )
}
import { useState, useEffect } from 'react';
import CryptoComponent from './Crypto';
import WeatherData from './Weather';
import Time from './Time';
import Inspiration from './Inspiration';
import LinkManager from './LinkManager';
import './css/ChromeMain.css'


type UnplashData = {
    urls?: { full?: string },
    user: { name: string },
}

export default function ChromeMain() {
    const [unsplash, setUnsplash] = useState<UnplashData | null>(null);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        fetch(
            `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature&w=${screenWidth}&h=${screenHeight}`
        )
            .then((response) => response.json())
            .then((data) => {
                let img = new Image();
                img.src = data.urls.full;
                img.onload = () => {
                    setUnsplash(data)
                }
                console.log(data)
            });
    }, []);


    return (
        <div>
            <div className="background" style={{ backgroundImage: `url(${unsplash?.urls?.full})` }}>
                {unsplash && unsplash.user.name}
            </div>
            <WeatherData />
            <Time />
            <CryptoComponent />
            <Inspiration />
            <LinkManager />
        </div >
    );
}
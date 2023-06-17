import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './css/Crypto.css'

type CryptoData = {
    image: { small: string },
    name: string,
    market_data: {
        current_price: { usd: number },
        high_24h: { usd: number },
        low_24h: { usd: number },
    }
}

export default function Crypto() {
    const [crypto, setCrypto] = useState<CryptoData | null>(null);

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/ethereum')
            .then((response) => response.json())
            .then((data) => {
                setCrypto(data);
            });
    }, []);

    return (
        <Draggable>
            <div className="crypto-container">
                {crypto && (
                    <div>
                        <div>
                            <h1>
                                <img src={crypto.image.small} alt="Crypto Icon" />
                                {crypto.name}
                            </h1>
                        </div>
                        <div>
                            <p>Current: {crypto.market_data.current_price.usd}</p>
                            <p>High: {crypto.market_data.high_24h.usd}</p>
                            <p>Low: {crypto.market_data.low_24h.usd}</p>
                        </div>
                    </div>
                )}
            </div>
        </Draggable>
    )
}
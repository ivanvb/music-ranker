import React from 'react';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const BackgroundShape = () => {
    const minDuration = 40,
        maxDuration = 95;

    const minOpacity = 0.1,
        maxOpacity = 0.2;

    const shapes = ['circle', 'square'];
    const selectedShape = shapes[Math.floor(getRandomArbitrary(0, shapes.length))];

    return (
        <div
            className={`${selectedShape} absolute x z-0`}
            style={{
                animationDuration: `${getRandomArbitrary(minDuration, maxDuration)}s`,
                animationDelay: `-${getRandomArbitrary(0, maxDuration)}s`,
            }}
        >
            <div
                className={`inner-${selectedShape} border-primary y`}
                style={{
                    animationDuration: `${getRandomArbitrary(minDuration, maxDuration)}s`,
                    animationDelay: `-${getRandomArbitrary(0, maxDuration)}s`,
                    opacity: `${getRandomArbitrary(minOpacity, maxOpacity)}`,
                }}
            ></div>
        </div>
    );
};

const BackgroundShapes = () => {
    const amountOfShapes = 10;
    const shapes = Array.from(new Array(amountOfShapes));
    return (
        <>
            <div className="fixed -z-10 h-screen w-screen overflow-hidden left-0 top-0">
                {shapes.map((_, i) => (
                    <BackgroundShape key={i} />
                ))}
            </div>
        </>
    );
};

export default BackgroundShapes;

import React from 'react';

interface TimerProps {
    time: string;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
    

    return (
        <div className="my-8">
            <h1>{time}</h1>
        </div>
    );
};

export default Timer;
import React from 'react';

interface AvatarProps {
    image_file: string;
    name: string;
    isComplete: boolean;
    id: number;
}

const Avatar: React.FC<AvatarProps> = ({ image_file, name, id, isComplete }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
            src={image_file}
            alt={name}
            style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                objectFit: 'cover',
            }}
            className={`${isComplete ? "opacity-50" : ""}`} />
            {isComplete && (
            <img
                src="green-check.png"
                alt="completed"
                style={{
                width: 50,
                height: 50,
                position: 'absolute',
                top: 0,
                right: 0,
                }}
            />
            )}
        </div>
    );
};

export default Avatar;
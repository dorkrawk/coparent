import React from 'react';

interface ButtonProps {
    onClick: () => void;
    classes: string;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, classes }) => {
    return (
        <button onClick={onClick} className={`btn ${classes}`}>
            {text}
        </button>
    );
};

export default Button;
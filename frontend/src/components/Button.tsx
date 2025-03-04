import React from 'react';

interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className="btn btn-lg btn-success">
            {text}
        </button>
    );
};

export default Button;
import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

interface AvatarProps {
    image_file: string;
    name: string;
    id: number;
    isComplete: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ image_file, name, id, isComplete }) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        disabled: isComplete,
      });

      const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
        opacity: isComplete ? 0.5 : 1
      };

    return (
        <button 
            className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2 z-10"  
            ref={setNodeRef} 
            style={style} 
            {...(!isComplete && listeners)} 
            {...attributes}
            disabled={isComplete}
        >
            <img
                src={image_file}
                alt={name}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    objectFit: 'cover',
                }}
            />
        </button>
       
    );
};

export default Avatar;
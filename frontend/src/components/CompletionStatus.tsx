import React from 'react';
import { Kid } from '../types';
import AvatarIndicator from './AvatarIndicator';

interface KidsWithCompletion extends Kid {
    isComplete: boolean;
}

interface CompletionStatusProps {
    kids: Array<Kid>;
    kids_completed: string;
}


const CompletionStatus: React.FC<CompletionStatusProps> = ({kids, kids_completed}) => {
    const arrayOfKidsCompleted = kids_completed.split(',').map((kid) => parseInt(kid));
    const kidsWithCompletion: Array<KidsWithCompletion> = kids.map((kid) => {
        return {
            ...kid,
            isComplete: arrayOfKidsCompleted.includes(kid.id),
        };
    });
    return (
        <div>
            {kidsWithCompletion.map((kid) => (
                <AvatarIndicator key={kid.id} image_file={kid.image_file} name={kid.name} id={kid.id} isComplete={kid.isComplete} />
            ))}
        </div>
    );
};

export default CompletionStatus;
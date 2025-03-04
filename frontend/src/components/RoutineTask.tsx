import {useDroppable} from '@dnd-kit/core';
import { Kid } from '../types';
import CompletionStatus from './CompletionStatus';

interface RoutineTaskProps {
    name: string;
    image_file: string;
    id: number;
    state: string;
    kids_completed: Array<number>;
    kids: Array<Kid>;
}

const RoutineTask = ({name, image_file, id, state, kids_completed, kids}: RoutineTaskProps) => {
    const isComplete = state == "complete";
    const {isOver, setNodeRef} = useDroppable({
        id: id,
      });
      const style = {
        opacity: isComplete ? 0.5 : isOver ? 1 : 0.75,
      };
    return (
        <div className="card bg-base-100 w-96 shadow-sm" ref={setNodeRef} style={style}>
            <figure>
                <div className="relative" style={{ width: '250px', height: '250px' }}>
                    <img
                    src={image_file}
                    alt="routine task image"
                    className={`${isComplete ? "opacity-50" : ""}`}
                    style={{ width: '250px', height: '250px' }} />
                    {isComplete && <img src="green-check.png" alt="completed" className="absolute top-0 left-0 w-full h-full" style={{ width: '250px', height: '250px' }} />}
                </div>
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{name}</h2>
                <div className="card-actions justify-center">
                    <CompletionStatus kids_completed={kids_completed} kids={kids} />
                    {/* <button className="btn btn-primary" onClick={() => console.log(`Completing task ${id}`)}>Complete Task</button> */}
                </div>
            </div>
        </div>
    );
};

export default RoutineTask;
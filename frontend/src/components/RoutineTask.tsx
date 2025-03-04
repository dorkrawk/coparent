interface RoutineTaskProps {
    name: string;
    image_file: string;
    id: number;
}



const RoutineTask = ({name, image_file, id}: RoutineTaskProps) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                src={image_file}
                alt="routine task image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{name}</h2>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary" onClick={() => console.log(`Completing task ${id}`)}>Complete Task</button>
                </div>
            </div>
        </div>
    );
};

export default RoutineTask;
export interface Kid {
    id: number;
    age: number;
    name: string;
    image_file: string;
}

export interface RoutineTask {
    id: number;
    audio_file: string;
    image_file: string;
    name: string;
    status: string;
    kids_completed: Array<number>;
}

export interface Routine {
    id: number;
    name: string;
    owner_id: number;
    reward: {
        link: string;
        name: string;
    }
    routine_tasks: Array<RoutineTask>;
    kids: Array<Kid>;
    status: string;
    total_time: number;
}
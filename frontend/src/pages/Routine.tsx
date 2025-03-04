import { use, useEffect, useState } from "react";
import { Routine } from "../types";
import Timer from "../components/Timer";
import Button from "../components/Button";
import RoutineTask from "../components/RoutineTask";
// useeffect to load the routine from https://19c0ad2a-57e8-4f90-983b-e1d200311393.mock.pstmn.io



function RoutinePage() {
    const [currentTime, setCurrentTime] = useState('');
    const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        setCurrentTime(formatTime(remainingTimeInSeconds));
    }, [remainingTimeInSeconds]);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTimeInSeconds(time => (time > 0 ? time - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingTimeInSeconds]);
    
    const setData = (data: Routine) => {
        setRoutine(data);
        setTotalTime(data.total_time * 60);
        setRemainingTimeInSeconds(data.total_time * 60);
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const [routine, setRoutine] = useState<Routine | null>(null);
    useEffect(() => {
        fetch('https://19c0ad2a-57e8-4f90-983b-e1d200311393.mock.pstmn.io/routine/1')
            .then(response => response.json())
            .then(data => setData(data));
    }, [])

    return routine ? <div className="flex flex-col items-center">
        <Timer time={currentTime} />
        <h2 className="my-8">Current Routine: {routine.name}</h2>
        <div className="flex flex-row justify-around w-full my-16">
            {routine.routine_tasks.map(task => {
                return <RoutineTask key={task.id} name={task.name} image_file={task.image_file} id={task.id} />
            })}
        </div>
        
        <Button text="Complete routine" classes="btn-success btn-lg btn-active" onClick={() => console.log("Complete routine")} />
    </div> : <div>Loading...</div>
  }
  
  export default RoutinePage;
import { useEffect, useState } from "react";
import { Routine } from "../types";
import Timer from "../components/Timer";
import { DragEndEvent } from '@dnd-kit/core';
import Button from "../components/Button";
import RoutineTask from "../components/RoutineTask";
import Avatar from "../components/Avatar";
import {DndContext} from '@dnd-kit/core';
import VideoEmbed from "../components/VideoEmbed";
// useeffect to load the routine from https://19c0ad2a-57e8-4f90-983b-e1d200311393.mock.pstmn.io



function RoutinePage() {
    const [currentTime, setCurrentTime] = useState('');
    const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

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
        setIsComplete(data.status === "complete");
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
        fetch('https://19c0ad2a-57e8-4f90-983b-e1d200311393.mock.pstmn.io/routine/1/start')
            .then(response => response.json())
            .then(data => setData(data));
    }, [])

    useEffect(() => {
        // Submit complete task
        // Reset
        if (parent) {
            setParent(null)
        }

    }, [])

    const [parent, setParent] = useState<number | null>(null);
    const [drop, setDrop] = useState<number | null>(null);

    
    function handleDragEnd(event: DragEndEvent) {
        const { over, active } = event;
        setDrop(active ? Number(active.id) : null);
        // submit event to complete task, update state!
        setParent(over ? Number(over.id) : null);
    }

    // Make a map of kids to see if they are complete based on if their ID is in the `kids_completed` array of every routine task
    const kidsCompletionMap = routine ? routine.kids.reduce((acc, kid) => {
        const isComplete = routine.routine_tasks.every(task => task.kids_completed.includes(kid.id));
        acc[kid.id] = isComplete;
        return acc;
    }, {} as Record<number, boolean>) : {};


    return routine ? isComplete ? <VideoEmbed link={routine.reward.link} /> : <div className="flex flex-col items-center">
        <Timer time={currentTime} />
        <h2 className="my-8">Current Routine: {routine.name}</h2>
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex justify-around w-50">
                {routine.kids.map(kid => {
                    return <Avatar key={kid.id} name={kid.name} image_file={kid.image_file} id={kid.id} isComplete={kidsCompletionMap[kid.id]} />
                })}
            </div>
            <div className="flex flex-row justify-around w-full my-16">
                {routine.routine_tasks.map(task => {
                    return <RoutineTask key={task.id} name={task.name} image_file={task.image_file} id={task.id} kids={routine.kids} kids_completed={task.kids_completed} state={task.status} />
                })}
            </div>
        </DndContext>
        
        
        {/* <Button text="Complete routine" classes="btn-accent btn-lg btn-active" onClick={() => console.log("Complete routine")} /> */}
    </div> : <div>Loading...</div>
  }
  
  export default RoutinePage;
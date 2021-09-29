import {useEffect, useState} from "react";
import React from 'react';
import './App.css'

const Counter = () => {
    const storedCounter = Number(localStorage.getItem("counter"))
    const storedBoolean = localStorage.getItem("boolean")
    const [counter, setCounter] = useState(Number.isInteger(storedCounter) ? storedCounter : 0);
    const secondCounter = counter % 60;
    const hourCounter = Math.floor(counter / 3600);
    const minuteCounter = Math.floor(counter / 60 - hourCounter * 60);
    let computedSecond =
        String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter

    let computedMinute =
        String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;
    let computedHour =
        String(hourCounter).length === 1
            ? `0${hourCounter}`
            : hourCounter;
    const [second, setSecond] = useState( Number.isInteger(storedCounter) ? computedSecond : 0);
    const [minute, setMinute] = useState(Number.isInteger(storedCounter) ? computedMinute : 0);
    const [hour, setHour] = useState(Number.isInteger(storedCounter) ? computedHour : 0);
    const [isActive, setIsActive] = useState(JSON.parse(storedBoolean));
    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setSecond(computedSecond);
                setMinute(computedMinute);
                setHour(computedHour);
                setCounter(counter => counter + 1);

            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);

    useEffect(() => {
        localStorage.setItem("counter", String(counter),
        )
    }, [counter])
    useEffect(() => {
        localStorage.setItem("boolean", isActive)
    } , [isActive])

    return (
        <>
            <div className="time" style={{display: isActive ? 'block' : 'none' }}>
                <span className="hour">{hour}</span>
                <span>:</span>
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
    <button onDoubleClick={() => setIsActive(!isActive)} className="stud">{isActive ? "Pause" : "Start study"}</button>
        </>
    );
};

export default Counter;

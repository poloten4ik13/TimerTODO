import React, {useEffect, useState} from 'react';
import "./ListButtons.css"
import './App.css'

// eslint-disable-next-line react/prop-types
const ListButtons = ({text, indification}) => {
    const storedBoolean = localStorage.getItem("boolean")
    const [counter, setCounter] = useState(0);
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

    const [isActive, setIsActive] = useState(JSON.parse(storedBoolean));
    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setCounter( counter => counter + 1);
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);



    useEffect(() => {
        localStorage.setItem("boolean", JSON.stringify(isActive))
    } , [isActive])

    useEffect(() => {
        const existingClock = JSON.parse(localStorage.getItem(indification))
        setCounter(existingClock);
    } , [])


    console.log(counter)

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <div className="time" style={{display: isActive ? 'block' : 'none' }}>
                <span className="hour">{computedHour}</span>
                <span>:</span>
                <span className="minute">{computedMinute}</span>
                <span>:</span>
                <span className="second">{computedSecond}</span>
            </div>
            <div className="buttonItem">
                <li   id={indification} key={indification}  className="item" onDoubleClick={() => {
                    setIsActive(!isActive);
                    localStorage.setItem(indification, JSON.stringify(counter))
                }}>
                    {isActive ? 'Pause' : text}
                </li>
            </div>
        </>

    );
};

export default ListButtons;
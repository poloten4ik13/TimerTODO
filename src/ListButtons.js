import React, {useContext, useEffect, useState} from 'react';
import "./ListButtons.css"
import './App.css'
import {Context} from "./Context";

// eslint-disable-next-line react/prop-types
const ListButtons = ({text, indification}) => {
    // eslint-disable-next-line no-unused-vars
    const {buttonHandler, setButtonHandler} = useContext(Context)
    //console.log(setButtonHandler)
    const storedBoolean = JSON.parse(localStorage.getItem(`${indification}boolean`));
    const existingClock = JSON.parse(localStorage.getItem(`${indification}counter`));
    const [lessons, setLessons] = useState(true);
    const [counter, setCounter] = useState(0);
    console.log(counter)
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

    const [isActive, setIsActive] = useState(storedBoolean);

    useEffect(() => {
        let intervalId;

        if (isActive=== true) {
            intervalId = setInterval(() => {
                setCounter( counter => counter + 1);
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [isActive]);




const handlerLessons = ()=>{
    setLessons(false)
    localStorage.removeItem(`${indification}boolean`)
    localStorage.removeItem(`${indification}counter`)
    const filtered = buttonHandler.filter(item=> item.id !== indification)
     setButtonHandler(filtered)
    console.log(filtered)
}
  /*  useEffect(() => {
        handlerLessons()
    }, [lessons]);
*/

    useEffect(() => {
        localStorage.setItem(`${indification}boolean`, isActive)
    } , [isActive])

    useEffect(() => {
        localStorage.setItem(`${indification}counter`, counter )
    } , [counter])


    useEffect(() => {
        setCounter(existingClock);
        setIsActive(storedBoolean)
    } , [])




    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        (lessons) ?
        <>
            <div>
                <div className="time" style={{display: isActive===true ? 'block' : 'none' }}>
                    <span className="hour">{computedHour}</span>
                    <span>:</span>
                    <span className="minute">{computedMinute}</span>
                    <span>:</span>
                    <span className="second">{computedSecond}</span>
                </div>
            </div>
            <div className="buttonItem">
                <li   id={indification} key={indification}  className="item" onDoubleClick={() => {
                    setIsActive(!isActive);
                }}>
                    {isActive===true ? 'Pause' : text}
                    <div className="close" onClick={handlerLessons}> </div>
                </li>
            </div>
        </> : null

    );
};

export default ListButtons;
import React, {useEffect, useState} from 'react';
import "./App.css";
import {useDrag} from 'react-use-gesture';


const App = () => {
   /* const storedSecond = Number(localStorage.getItem("second"))
    const storedMinute  = Number(localStorage.getItem("minute"))
    const storedHour = Number(localStorage.getItem("hour"))
    console.log(storedValueAsNumber)*/

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

    const [buttonPos, SetButtonPos] = useState({x: 0, y: 0})
const bindButtonPos = useDrag((params)=>{
    SetButtonPos({
        x: params.offset[0],
        y: params.offset[1],
    })
});

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
      <div>
          <div className="container">
              <div className="time" style={{display: isActive ? 'block' : 'none' }}>
                  <span className="hour">{hour}</span>
                  <span>:</span>
                  <span className="minute">{minute}</span>
                  <span>:</span>
                  <span className="second">{second}</span>
              </div>
              <button {...bindButtonPos()} style={{
                  position: "absolute",
                  top: buttonPos.y,
                  left: buttonPos.x
              }
              } onDoubleClick={() => setIsActive(!isActive)} className="stud">{isActive ? "Pause" : "Start study"}</button>
          </div>
      </div>
  );
};

export default App;

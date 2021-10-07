import React, {useEffect, useRef, useState} from 'react';
import "./List.css";
import ListButtons from "./ListButtons";
import Draggable from "react-draggable";

// eslint-disable-next-line react/prop-types
const List = ({buttonHandler}) => {


    const [positions, setPositions] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const nodeRef = useRef(null);
    const existingDivPositions = JSON.parse(
        localStorage.getItem("positions_div")
    );
    useEffect(() => {
        setPositions(existingDivPositions);
        setHasLoaded(true);
        console.log("has loaded");
        console.log(existingDivPositions)
    }, []);


    function handleStop(e, data) {
        let dummyPositions = { ...positions };
        const itemId = e.target.id;
        dummyPositions[itemId] = {};
        dummyPositions[itemId]["x"] = data.x;
        dummyPositions[itemId]["y"] = data.y;
        setPositions(dummyPositions);
    }

    useEffect(() => {
        localStorage.setItem(`positions_div`, JSON.stringify(positions));
        console.log(positions)
    }, [positions]);

    return hasLoaded ? (
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            {buttonHandler.map((item) => {
                return (
                    <>
                        <Draggable
                            defaultPosition={positions[item.id] === undefined ? {x: 0, y: 0} : {x:positions[item.id].x, y: positions[item.id].y} }
                            position={null}
                            key={item.id}
                            nodeRef={nodeRef}
                            onStop={handleStop}
                            bounds={{ top: -290, left: -600, right: 600, bottom: 355 }}
                        >
                            <div ref={nodeRef}>
                                <ListButtons id={item.id} text={item.text} indification={item.id}/>
                            </div>
                        </Draggable>
                    </>
                );
            })}
        </div>
    ) : null;
}

export default List;

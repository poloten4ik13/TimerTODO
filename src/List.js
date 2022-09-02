import React, {useEffect, useRef, useState} from 'react';
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
        setPositions(existingDivPositions === null ? {x: 0, y: 0} : existingDivPositions );
        setHasLoaded(true);
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
    }, [positions]);
    console.log(Math.floor(Math.random(500)))

    return hasLoaded ? (
        <>
            {/* eslint-disable-next-line react/prop-types */}
            {buttonHandler.map((item) => {
                return (
                        <Draggable
                            defaultPosition={positions[item.id] === undefined  ? {x: Math.floor(Math.random(50)*1000), y: Math.floor(Math.random(20)*500)} : {x:positions[item.id].x, y: positions[item.id].y}}
                            position={null}
                            key={item.id}
                            nodeRef={nodeRef}
                            onStop={handleStop}
                            bounds={{ top: 0,left: 0, right: 1210, bottom: 715}}
                        >
                            <div ref={nodeRef}>
                                <ListButtons id={item.id} text={item.text} indification={item.id}/>
                            </div>
                        </Draggable>
                );
            })}
        </>
    ) : null;
}

export default List;

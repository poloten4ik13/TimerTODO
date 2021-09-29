import React, {useEffect, useRef, useState} from 'react';
import "./App.css";
import Counter from "./Counter";
import Draggable from 'react-draggable';

const App = () => {
    const [positions, setPositions] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        const existingDivPositions = JSON.parse(
            localStorage.getItem("positions_div")
        );
        setPositions(existingDivPositions);
        setHasLoaded(true);
    }, []);

    function handleStop(e, data) {
        let dummyPositions = { ...positions };
        dummyPositions= {};
        dummyPositions["x"] = data.x;
        dummyPositions["y"] = data.y;
        setPositions(dummyPositions);

    }

    useEffect(() => {
        localStorage.setItem(`positions_div`, JSON.stringify(positions));
    }, [positions]);
    console.log(positions)
    return hasLoaded ? (
        <div>
            <div className="container">
                <Draggable
                    defaultPosition={{x: positions.x, y: positions.y}}
                    nodeRef={nodeRef}
                    onStop={handleStop}
                >
            <div ref={nodeRef} >
             <Counter  />
            </div>
                    </Draggable>
            </div>
        </div>
    ): null;
};

export default App;

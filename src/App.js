import React, {useEffect,  useState} from 'react';
import "./App.css";
import Form from "./Form";
import List from "./List"


const App = () => {
    /*Input state*/

    useEffect(() => {
        LocalButtonHandler();
    }, []);


    const [inputText, setInputText] = useState("");
    const [buttonHandler, setButtonHandler] = useState( []);

    const localButton = () => {
      localStorage.setItem('buttonHandler', JSON.stringify(buttonHandler));
    }
    useEffect(() => {
        localButton();
    }, [buttonHandler]);

    const LocalButtonHandler = () =>{
        if(localStorage.getItem('buttonHandler') === null){
            localStorage.setItem('buttonHandler', JSON.stringify([]))
        }else{
            let LocalButton = JSON.parse(localStorage.getItem('buttonHandler'));
            setButtonHandler(LocalButton)
        }
    };





    /*Draggable code start*/
   /* const [positions, setPositions] = useState({});
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
        let dummyPositions = {...positions};
        dummyPositions = {};
        dummyPositions["x"] = data.x;
        dummyPositions["y"] = data.y;
        setPositions(dummyPositions);
    }
    useEffect(() => {
        localStorage.setItem(`positions_div`, JSON.stringify(positions));
    }, [positions]);*/
    /*Draggable code end*/
    return /*hasLoaded ?*/ (
        <div>
            <header className="header">10 000 Hour</header>
            <div>
                <Form setInputText={setInputText} buttonHandler={buttonHandler} setButtonHandler={setButtonHandler} inputText={inputText} />
            </div>
            <div className="container">
                <List inputText={inputText} buttonHandler={buttonHandler} />
               {/* <Draggable
                    defaultPosition={{x: positions.x, y: positions.y}}
                    nodeRef={nodeRef}
                    onStop={handleStop}
                >
                    <div ref={nodeRef}>
                    </div>
                </Draggable>*/}
            </div>
        </div>
    )
};

export default App;

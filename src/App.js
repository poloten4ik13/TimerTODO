import React, { useEffect, useState} from 'react';
import "./App.css";
import Form from "./Form";
import List from "./List"
import {Context} from "./Context";


const App = () => {

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


    return  (
        <Context.Provider value={{buttonHandler, setButtonHandler}}>
        <div>
            <header className="header">10 000 Hour</header>
            <div>
                <Form setInputText={setInputText} buttonHandler={buttonHandler} setButtonHandler={setButtonHandler} inputText={inputText} />
            </div>
            <div className="container">
                  <List inputText={inputText} buttonHandler={buttonHandler} />
            </div>
        </div>
        </Context.Provider>
    )
};

export default App;

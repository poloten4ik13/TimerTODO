import React from 'react';
import './Form.css';
// eslint-disable-next-line react/prop-types
const Form = ({setInputText, buttonHandler, setButtonHandler, inputText}) => {
const submitHandler = (e) => {
    e.preventDefault();
   if(inputText){
       setButtonHandler([...buttonHandler, {text: inputText, id: Math.random() * 10 }]);
       setInputText("");
   }

    };

    const eventHandler = (e) => {
        setInputText(e.target.value);
    }
    return (
        <div>
            <form className="inputForm">
                <input value={inputText} onChange={eventHandler} type="text" className="inputForm" placeholder="Lesson" required/>
                <button onClick={submitHandler}  type="submit" className="submitButton">
                    <i className="ibutton">Create</i>
                </button>
            </form>
        </div>
    );
};

export default Form;
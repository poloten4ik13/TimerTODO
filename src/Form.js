import React from 'react';

const Form = () => {
    return (
        <div>
            <form>
                <input type="text" className="inputForm"/>
                <button type="submit" className="submitButton">
                    <i className="ibutton">Create</i>
                </button>
            </form>
        </div>
    );
};

export default Form;
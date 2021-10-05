import React from 'react';
import "./List.css";
import ListButtons from "./ListButtons";
// eslint-disable-next-line react/prop-types
const List = ({buttonHandler}) => {

    return (
        <div>
    <ul className="createButtons">
        {/* eslint-disable-next-line react/prop-types,no-unused-vars */}
        {buttonHandler.map(elm => <ListButtons text={elm.text} key={elm.id}/>)}
    </ul>
        </div>
    );
};

export default List;

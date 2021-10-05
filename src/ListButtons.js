import React from 'react';
import "./ListButtons.css"
// eslint-disable-next-line react/prop-types
const ListButtons = ({text}) => {
    return (
        <div>
            <div className="buttonItem">
                <li className="item">
                    {text}
                </li>
            </div>
        </div>
    );
};

export default ListButtons;

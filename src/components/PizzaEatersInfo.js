import React from 'react';
import '../styles/PizzaEatersInfo.css';
import '../App.css';

function PizzaEatersInfo(props) {
    return (
        <div id="info">
            A number of party participants: {props.eaters}<br></br>
            Pizza eaters: {props.allParticipants}
        </div>
    )
}

export default PizzaEatersInfo;
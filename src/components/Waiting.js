import React from 'react';
import '../App.css';
import '../styles/Waiting.css'

function Waiting() {
    return (
        <div id="waiting">
            <span>Waiting</span>
            <div className="points first_point"/>
            <div className="points secont_point"/>
            <div className="points third_point"/>
        </div>
    )
}

export default Waiting;
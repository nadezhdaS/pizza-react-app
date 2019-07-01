import React, {Component} from 'react';
import '../App.css';
import '../styles/PizzaVisualization.css'

class PizzaVisualization extends Component {
    render() {
        const cuts = [];
        let numberOfCuts = this.props.eaters / 2;
        let rotation = 180 / numberOfCuts;

        for (let i = 1; i <= numberOfCuts; i++) {
            let deg = rotation * i;
            cuts.push(
                <div key={i} className='cuts' style={{transform: `rotate(${deg}deg)`}}/>
            );
        }
        return (
            <div>
                <div id="pizza">
                    {cuts}
                </div>
            </div>
        )

    }
}

export default PizzaVisualization;
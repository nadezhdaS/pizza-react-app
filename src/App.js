import React, {Component} from 'react';
import './App.css';
import PizzaVisualization from './components/PizzaVisualization';
import Waiting from './components/Waiting';
import PizzaEatersInfo from './components/PizzaEatersInfo';
import PizzaShoppingCart from './components/PizzaShoppingCart';
import PizzaService from "./services/PizzaService"

class App extends Component {
    constructor() {
        super();
        this.state = {
            participants: [],
            pizzaEaters: [],
            showWaiting: false,
            showPizza: false,
        };
        this.getParticipants = this.getParticipants.bind(this)
    }

    render() {
        const {showWaiting, showPizza} = this.state;
        return (
            <div>
                <button onClick={this.getParticipants} id="load">Load</button>
                {
                    showWaiting && <Waiting/>
                }
                {
                    showPizza && this.renderPizza()
                }
            </div>
        )
    }

    renderPizza() {
        const {participants, pizzaEaters} = this.state;
        return (
            <div>
                <PizzaVisualization eaters={pizzaEaters.length}/>
                <PizzaEatersInfo eaters={pizzaEaters.length} allParticipants={participants.length}/>
                <PizzaShoppingCart pizzaEaters={pizzaEaters}/>
            </div>
        )
    }

    getParticipants() {
        this.setState({showWaiting: true,
            showPizza: false,
            showInfoText: false
        });
        PizzaService.getParticipiants()
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                const participants = response.party;
                PizzaService.getDiets(participants)
                    .then((response) => {
                        return response.json()
                    })
                    .then((response) => {
                        const pizzaEatersMap = new Map();

                        participants.forEach(element => {
                            if (element.eatsPizza === true) {
                                pizzaEatersMap.set(element.name, element);
                            }
                        });

                        response.diet.forEach(dietRecord => {
                            const pizzaEater = pizzaEatersMap.get(dietRecord.name);
                            pizzaEater.isVegan = dietRecord.isVegan;
                        });

                        this.setState({
                            showWaiting: false,
                            showPizza: true,
                            participants: participants,
                            pizzaEaters: [...pizzaEatersMap.values()],
                        });
                    });


            })
    }
}


export default App;

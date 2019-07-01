import React, {Component} from 'react';
import '../App.css';
import '../styles/PizzaShoppingCart.css';
import PizzaService from '../services/PizzaService';
import Waiting from "./Waiting";

class PizzaShoppingCart extends Component {
    constructor() {
        super();
        this.state = {
            pizzaEaters: [],
            pizzaInfoForOrder: null,
            currency: null,
            pizzaPriceByn: 0,
            moneyToCollect: 0,
            moneyCollected: 0,
            priceForEater: 0,
            isPizzaPriceCalculated: false
        };
        this.orderPayment = this.orderPayment.bind(this);
        this.calculateInitialPizzaPrice = this.calculateInitialPizzaPrice.bind(this)
    }

    componentDidMount() {
        this.setState({pizzaEaters: this.props.pizzaEaters});

        PizzaService.getPrice(this.props.pizzaEaters)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({pizzaInfoForOrder: response});
            });

        PizzaService.getCurrency()
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({currency: response});
            })

    }

    render() {
        const {isPizzaPriceCalculated} = this.state;
        this.calculateInitialPizzaPrice();
        return (
            <div>
                {
                    isPizzaPriceCalculated ? (this.renderShopingCart()) : (<Waiting/>)
                }
            </div>

        )
    }

    renderShopingCart() {
        const tableBody = [];
        this.state.pizzaEaters.forEach((pizzaEater, index) => {
            tableBody.push(
                <tr key={index}>
                    <td className={pizzaEater.isVegan ? 'eaterVegan' : 'eaterNotVegan'}>{pizzaEater.name}</td>
                    <td className='priceCell'>{Math.round(this.state.priceForEater * 10) / 10} BYN</td>
                    <td>
                        <button className={pizzaEater.isPaid ? 'paid' : 'pay'}
                                onClick={() => this.orderPayment(index)}
                                disabled={pizzaEater.isPaid}> {pizzaEater.isPaid ? 'PAID' : 'PAY'}</button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Share to pay
                        </th>
                        <th>
                            Pay
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableBody}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>Total order</td>
                        <td colSpan="2">{Math.round(this.state.pizzaPriceByn * 10) / 10} BYN</td>
                    </tr>
                    <tr>
                        <td>Money to collect</td>
                        <td colSpan="2">{Math.round(this.state.moneyToCollect * 10) / 10} BYN</td>
                    </tr>
                    <tr>
                        <td>Money collected</td>
                        <td colSpan="2">{Math.round(this.state.moneyCollected * 10) / 10} BYN</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        )
    }

    orderPayment(eaterIndex) {
        let {pizzaEaters, moneyCollected, moneyToCollect} = this.state;
        pizzaEaters[eaterIndex].isPaid = true;
        moneyCollected += this.state.priceForEater;
        moneyToCollect -= this.state.priceForEater;
        this.setState({
            pizzaEaters: pizzaEaters,
            moneyCollected: moneyCollected,
            moneyToCollect: moneyToCollect
        });
    }

    calculateInitialPizzaPrice() {
        let {pizzaInfoForOrder, currency, pizzaPriceByn, moneyToCollect, priceForEater, isPizzaPriceCalculated} = this.state;
        if (pizzaInfoForOrder && currency && !isPizzaPriceCalculated) {
            const currencyPrice = pizzaInfoForOrder.price.split(' ');
            switch (currencyPrice[1]) {
                case 'USD':
                    pizzaPriceByn = currencyPrice[0] * currency.USD;
                    break;
                case 'EUR':
                    pizzaPriceByn = currencyPrice[0] * currency.EUR;
                    break;
                case 'BYN':
                    pizzaPriceByn = currencyPrice[0];
            }
            moneyToCollect = pizzaPriceByn;
            priceForEater = pizzaPriceByn / this.props.pizzaEaters.length;

            this.setState({
                pizzaPriceByn: pizzaPriceByn,
                moneyToCollect: moneyToCollect,
                priceForEater: priceForEater,
                isPizzaPriceCalculated: true
            });
        }
    }
}

export default PizzaShoppingCart;
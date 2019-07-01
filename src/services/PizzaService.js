class PizzaService {

    static apiUrl = "https://gp-js-test.herokuapp.com";

    static getParticipiants() {
        return fetch(`${this.apiUrl}/pizza`);
    }

    static getDiets(participants) {
        let guestsNames = [];
        participants.forEach(element => {
            if (element.eatsPizza === true) {
                guestsNames.push(element.name);
            }
        });
        const string = guestsNames.join(',');
        return fetch(`${this.apiUrl}/pizza/world-diets-book/${string}`)

    }

    static getPrice(pizzaEaters) {
        let amountOfVegans = 0;
        let typeOfPizza = '';
        pizzaEaters.forEach((pizzaEater) => {
            if (pizzaEater.isVegan === true) {
                amountOfVegans++;
            }
        });
        if(amountOfVegans/pizzaEaters>0.51){
            typeOfPizza = Math.round(Math.random()) ? 'vegan' : 'cheese';
        }
        else{
            typeOfPizza = 'meat';
        }
        return fetch(`${this.apiUrl}/pizza/order/${typeOfPizza}/${pizzaEaters.length}`);
    }

    static getCurrency(){
        return fetch(`${this.apiUrl}/pizza/currency`)
    }

}

export default PizzaService;
import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BurgerComponent from '../../components/BurgerComponents/BurgerComponent';
import BuildControls from '../../components/BurgerComponents/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/BurgerComponents/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.3,
    cheese: 1,
    meat: 1.5,
    bacon: 0.6
}

class Burger extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-application-a2cfd.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            }).catch(error=>{
                this.setState({error:true});
        });

    }

    updatePurchState = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({
            purchasable: sum > 0//'sum>0' can be true or false
        })
    }

    clearPurchase = () => {
        this.setState({
            ingredients: {
                salad: 0,
                cheese: 0,
                bacon: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            showModal: false
        })
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];

        const updatedCount = oldCount + 1;
        const upgradedIngredients = {
            ...this.state.ingredients
        };
        upgradedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: upgradedIngredients,
            totalPrice: newPrice
        })


        this.updatePurchState(upgradedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const upgradedIngredients = {
            ...this.state.ingredients
        };
        upgradedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({
            ingredients: upgradedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchState(upgradedIngredients);
    }

    toggleModalHandler = () => {
        const show = this.state.showModal;
        this.setState({
            showModal: true
        })


    }
    closeModalHandler = () => {
        this.setState({
            showModal: false
        })
    }

    purchaseContinueHandler = () => {
        // //alert('You continue!');

        this.props.history.push('/checkout');
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            path:'/checkout',
            search: '?' +queryString
        });


    }

    render() {
        // const disabledInfo ={
        //     ...this.state.ingredients
        // }
        // for(let key in disabledInfo){
        //     disabledInfo[key]= disabledInfo[key]<=0;
        // }
        let orderSummary = null;


        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner/>;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <BurgerComponent ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        price={this.state.totalPrice}
                        purchase={this.state.purchasable}
                        clear={this.clearPurchase}
                        toggleModal={this.toggleModalHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                continue={this.purchaseContinueHandler}
                cancel={this.closeModalHandler}
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        // disabled = {disabledInfo}

        return (
            <Aux>

                <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        );
    }
}

export default withErrorHandler(Burger, axios);
import React,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';
import {NavLink} from "react-router-dom";

class OrderSummary extends Component{


    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{
            return( <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
            </li>);
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Burger with following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Continue to Checkout?</p>
                <p className={classes.TotalPrice}>Total price: {this.props.price.toFixed(2)}</p>
                <Button btnType='Danger' clicked={this.props.cancel}>CANCEL</Button>

                <Button btnType='Success' clicked={this.props.continue}>CONTINUE</Button>
            </Aux>
        );
    }




};

export default OrderSummary;
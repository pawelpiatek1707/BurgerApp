import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends  Component{
    state= {
        ingredients: null,
        totalPrice:0
    }
    componentWillMount() {
        const querry = new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price =0;
        for(let param of querry.entries()){
            if(param[0]==='price'){
                price=param[1];
            }else{
                ingredients[param[0]] = +param[1];
                //       returns a pair of key and the array element as an object
            }

        }
        this.setState({ingredients:ingredients,totalPrice:price})

    }

    checkoutCanceledHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                       render={(props)=>(
                           <ContactData
                               ingredients={this.state.ingredients}
                               price={this.state.totalPrice}
                               {...props}
                           />)}/>
                       {/*this is how we can pass props to the routing*/}
            </div>
        )
    }
}

export default Checkout;
import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
import classes from './BurgerComponent.module.css';
//The same class as Burger
const burgerComponent = (props)=>{
    //we can return an array of keys from object and then we can use a map method on this
    //Object.keys returns an array ([salad,meat,bacon......etc])
    const transformedIngredients = Object.keys(props.ingredients).map(igKey=>{
        console.log(igKey);
        //"_" means that we don't care about the name of the array element but we only want to know the index of this element
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            console.log(i);
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    console.log(transformedIngredients);
    return(

        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients.length!=0?transformedIngredients:<p className={classes.EmptyBurger}>Brak składników</p>}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burgerComponent;

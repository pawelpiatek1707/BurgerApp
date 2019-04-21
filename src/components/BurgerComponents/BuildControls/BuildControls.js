import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuiltControls.module.css';

const controls =[
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];

const builtControls =(props)=>(

    <div className={classes.BuiltControls}>
        <p className={classes.Price}>Current price: {props.price.toFixed(2)} $</p>
        {props.purchase?<button className={classes.RemoveIngredients} onClick={props.clear}>Remove ingredients</button>:null}
        {/*toFix method limit our price to only two positions after coma*/}
        {controls.map(ctr=>(
            <BuildControl
                key={ctr.label}
                label={ctr.label}
                added = {()=>props.ingredientAdded(ctr.type)}
                removed ={()=>props.ingredientRemove(ctr.type)}

                /*disabled = {props.disabledInfo[ctr.type]}*/
            />
        ))}
        <button className={classes.OrderButton} disabled={!props.purchase} onClick={props.toggleModal}>ORDER NOW</button>
    </div>
);

export default builtControls;
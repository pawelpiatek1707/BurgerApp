import React from 'react';
import classes from './BuildControl.module.css';

const builtControl = (props)=>(
    <div className={classes.BuildControl}>

        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed}>Less</button>
        {/*disabled = {props.disabled}*/}
        <button className={classes.More} onClick={props.added}>More</button>
    </div>

);


export default builtControl;
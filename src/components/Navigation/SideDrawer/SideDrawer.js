import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigatioItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} backdropClick={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%"/>
                <nav className={classes.NavigationItems}>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;

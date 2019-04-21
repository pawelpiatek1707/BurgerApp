import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import  classes from './NavigationItems.module.css';

const navigationItems =(props)=>(
    <ul className={classes.NavigationItems}>
        {/*for boolen props we don't have to set for example active = true, we can just write active*/}
        <NavigationItem link={'/'} >Burger Builder</NavigationItem>
        <NavigationItem link={'/orders'}>Orders</NavigationItem>
    </ul>
);

export default navigationItems;
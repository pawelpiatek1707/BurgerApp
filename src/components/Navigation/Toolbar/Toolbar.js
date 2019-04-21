import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigatioItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';


const toolBar =(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.toggle}/>

        <Logo height="80%" />

        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolBar
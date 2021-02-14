import React from 'react';
import './Toolbar.css'
import Logo from '../Logo/Logo';
import DrawerToggle from '../DrawerToggle/DrawerToggle';
import DateTime from '../DateTime/DateTime';

const toolbar = (props) => (
    <header className="Toolbar">
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <Logo height="80%" />
      <DateTime />
    </header>  
)

export default toolbar;
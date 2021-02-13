import React from 'react';
import './Toolbar.css'
import Logo from '../Logo/Logo';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className="Toolbar">
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <Logo height="80%" />
      <div><b>SIGN OUT</b></div>
    </header>  
)

export default toolbar;
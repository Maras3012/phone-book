import React from 'react';
import './Toolbar.css'
import Logo from '../Logo/Logo';

const toolbar = (props) => (
    <div className="Toolbar">
      <div><b>NOTES</b></div>
      <Logo />
      <div><b>SIGN OUT</b></div>
    </div>  
)

export default toolbar;
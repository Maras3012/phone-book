import React from 'react';
import './DrawerToggle.css';

const drawerToggle = (props) => (
    <div onClick={props.clicked}><b>NOTES</b></div>
);

export default drawerToggle;
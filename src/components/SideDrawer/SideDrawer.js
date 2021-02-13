import React from 'react';
import Logo from '../Logo/Logo';
import './SideDrawer.css';
import Backdrop from '../Backdrop/Backdrop';

const sideDrawer = (props) => {
    let css = ['SideDrawer', 'Close'];
    if(props.open) {
        css = ['SideDrawer', 'Open'];
    }

    return (
        <div>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={css.join(' ')}>
            <Logo height="11%" />
        </div>
        </div>
    );
}

export default sideDrawer;
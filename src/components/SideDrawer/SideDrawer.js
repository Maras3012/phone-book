import React from 'react';
import Logo from '../Logo/Logo';
import './SideDrawer.css'

const sideDrawer = (props) => {
    let css = ['SideDrawer', 'Close'];
    if(props.open) {
        css = ['SideDrawer', 'Open'];
    }

    return (
        <div className={css.join(' ')}>
            <Logo height="11%" />
        </div>
    );
}

export default sideDrawer;
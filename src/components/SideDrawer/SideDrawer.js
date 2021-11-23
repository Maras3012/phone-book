import React from 'react';
import Logo from '../Logo/Logo';
import './SideDrawer.css';
import Backdrop from '../Backdrop/Backdrop';
import TextEditor from '../TextEditor/TextEditor';

const sideDrawer = (props) => {
    let css = ['SideDrawer', 'Close'];
    sessionStorage.setItem('Data-b', 'Ileana molim te unesi i nove korisnike. - Nov 19, 2021 4:16 PM');
    localStorage.setItem('Data-get', 'Ileana molim te unesi i nove korisnike. - Nov 19, 2021 4:16 PM');
    if(props.open) {
        css = ['SideDrawer', 'Open'];
    }

    return (
        <div>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={css.join(' ')}>
            <Logo height="11%" />
            <TextEditor />
        {/* Ileana molim te unesi i nove korisnike. */}
        {/* Jelena molim te ispravi greske u unosu. */}
        <div className="Notes">{(sessionStorage.getItem('Data-b') ? 
            (sessionStorage.getItem('Data-b')).replace('<p>','').replace('</p>', '').replace('null', '').replace(/&nbsp;/g, ' ') : 
            localStorage.getItem('Data-get')).replace('<p>','').replace('</p>', '').replace('null', '').replace(/&nbsp;/g, ' ')}</div> 
        </div>
        </div>
    );
}

export default sideDrawer;
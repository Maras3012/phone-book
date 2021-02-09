import React from 'react';
import phonebookLogo from './phonebook.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={phonebookLogo} alt="Phonebook"/>
    </div>
);

export default logo;
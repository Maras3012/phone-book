import React, { Component } from 'react';
import './Toolbar.css'
import Logo from '../Logo/Logo';

class Toolbar extends Component {
  render() {
    return (
// const toolbar = (props) => (
    <header className="Toolbar">
      <div><b>NOTES</b></div>
      <Logo />
      <div><b>SIGN OUT</b></div>
    </header>  
    )
  }
}    

export default Toolbar;
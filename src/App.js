import './App.css';
import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from './config';

class App extends Component {
  constructor() {
    super()

    this.app = firebase.initializeApp(firebaseConfig);
    this.database = this.app.database().ref().child('value');

    /* this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); */

    this.state = {
      value: 0
    }
  }
/* 
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    
  } */

  componentDidMount() {
    this.database.on('value', snap => {
      this.setState({
        value:  snap.val()
      });
    });
  }

  render() {
    return (
      <div className="App">
        {/* <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form> */}

        <h1>HAHAHAHAHAHAHAHA</h1>
        <h1>Value: {this.state.value}</h1>
      </div>
    )
  }
}

export default App;
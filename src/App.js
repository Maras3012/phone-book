import './App.css';
import React, { Component } from 'react';

import firebase from 'firebase';
import { firebaseConfig } from './config';

class App extends Component {
  constructor() {
    super()

    this.app = firebase.initializeApp(firebaseConfig);
    this.database = this.app.database().ref().child('number');

    this.state = {
      number: 0
    }
  }

  componentDidMount() {
    this.database.on('value', snap => {
      this.setState({
        number:  snap.val()
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>HAHAHAHAHAHAHAHA</h1>
        <h1>Value: {this.state.number}</h1>
      </div>
    )
  }
}

export default App;
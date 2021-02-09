import React, { Component } from "react";
import './Home.css'

import app from "./auth/base";
import 'firebase/database';

class Home extends Component {
    constructor() {
        super()
    
        this.database = app.database().ref().child('value'); //access to a specific part of database
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
          value: null
        }
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        //logika za update firebase-a
        this.database.set( this.state.value );
        //logika za refresh nakon push-a na firebase
        this.database.on('value', snap => {
          this.setState({
            value:  snap.val()
          });
        });
      }
    
      componentDidMount() { //every time the database renders it will set the state to same value as on firebase
        this.database.on('value', snap => {
          this.setState({
            value:  snap.val()
          });
        });
    }

  render() {  
  return (
    <div >
        <div className="Content">
            <h1>Testing external components</h1>
            <h3>Value: {this.state.value}</h3>
            <form onSubmit={this.handleSubmit}>
            <label>
                Value: <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
            {/* button for signout from firebase, when we click on it we call signOut() in auth module which is created with initializeApp() */}
            <button onClick={() => app.auth().signOut()}>Sign out</button>
        </div>
    </div>
  );
  }
};

export default Home;
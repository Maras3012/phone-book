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
          value: null,
          data: null
        };

        localStorage.setItem('Data-get', this.state.data);
      }

      handleSignOut() {
        app.auth().signOut();
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        //logika za update firebase-a
        app.database().ref().child('value').set( this.state.value );
        //logika za refresh nakon push-a na firebase
        this.database.on('value', snap => {
          this.setState({
            value:  snap.val()
          });
        });
        //logika za spremanje CKEditora u Home component
        this.setState(() => ({
        data: localStorage.getItem('Data-post')
        }));
        //logika za spremanje CKEditora na firebase
        app.database().ref().child('data').set( this.state.data );
      }
    
      componentDidMount() { //every time the component renders it will set the state to same value as on firebase
        app.database().ref().child('value').on('value', snap => {
          this.setState({
            value:  snap.val()
          });
        });

        app.database().ref().child('data').on('value', snap => {
          this.setState({
            data:  snap.val()
          });
        });
      }

      // ovo je ovdje kako bi localStorage imao vremena ukomponirat u CKEditor iz baze
      componentDidUpdate() {  
        localStorage.setItem('Data-get', this.state.data);
      }

  render() {  
  return (
    <div>
        <div className="Content">
            <h1>MyContacts</h1>
            {/* <h1>Testing external components</h1>
            <h3>Value: {this.state.value}</h3>
            <form onSubmit={this.handleSubmit}>
            <label>
                Value: <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form> */}
            {/* button for signout from firebase, when we click on it we call signOut() in auth module which is created with initializeApp() */}
            <button onClick={this.handleSignOut}><b>Sign out</b></button>
        </div>
    </div>
  );
  }
};

export default Home;
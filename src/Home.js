import React, { Component } from "react";
import './Home.css'

import app from "./auth/base";
import 'firebase/database';

const Contact = (props) => {
  return (
      <tr className="leftPadding">
          <th>{props.user.name}</th>
          <th>{props.user.number}</th>
          <th>{props.user.email}</th>
          <th>{props.user.date}</th>
          <th><button className="Danger" onClick={() => {
            props.deleteContactHandler(props.index)
          }}>Delete</button></th>
      </tr>
  )
}

class AddContact extends Component {
  state = {
    name: "",
    number: "",
    email: "",
    date: ""
  }

  onChangeName = (e) => {
    this.setState({name: e.target.value})
  }
  onChangeNumber = (e) => {
    this.setState({number: e.target.value})
  }
  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }
  onChangeDate = (e) => {
    this.setState({date: e.target.value})
  }

  render() {
    return (
      <div>
        Name: <input placeholder="Name" type="text" value={this.state.name} onChange={this.onChangeName}></input> <br/>
        Number: <input placeholder="Number" type="text" value={this.state.number} onChange={this.onChangeNumber}></input> <br/>
        Email: <input placeholder="Email" type="text" value={this.state.email} onChange={this.onChangeEmail}></input> <br/>
        Date of birth: <input type="date" value={this.state.date} onChange={this.onChangeDate} min="1900-01-01" max="2100-12-31"></input> <br/>
        <button className="Green-btn">Add Contact</button>
      </div>
    )
  }
}

class Home extends Component {
    constructor() {
        super()
    
        this.database = app.database().ref().child('value'); //access to a specific part of database
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
          ContactList: [
            {
              name: 'Mario',
              number: 323421414,
              email: 'test@test.com',
              date: '30.12.1998'
            },
            {
              name: 'Mario',
              number: 323421414,
              email: 'test@test.com',
              date: '30.12.1998'
            }
          ],
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

      deleteContactHandler = (index) => {
        const { ContactList } = this.state;
        ContactList.splice(index, 1);
        this.setState({ContactList: ContactList});
      }

  render() {  
  return (
    <div>
        <div className="Content">
            
            <form onSubmit={this.handleSubmit}>
              <div className="ContactsList">
                  <h1>Add Contact</h1>
                  <AddContact />
                  <br/>
                  <hr/>
                  <h1>MyContacts</h1>
                  <div className="Contact">
                      <table>
                          <tr>
                              <th>Name</th>
                              <th>Number</th>
                              <th>Email</th>
                              <th>Date of birth</th>
                              <th>Delete Contact</th>
                          </tr>
                          {this.state.ContactList.map((user, index) => {
                            return <Contact user={user} index={index} deleteContactHandler={this.deleteContactHandler} />
                          })}
                      </table>
                  </div>
              </div>
            <input type="submit" value="Save" />
            </form>
            {/* button for signout from firebase, when we click on it we call signOut() in auth module which is created with initializeApp() */}
            <button onClick={this.handleSignOut}><b>Sign out</b></button>
        </div>
    </div>
  );
  }
};

export default Home;
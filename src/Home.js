import React, { Component } from "react";
import './Home.css'

import app from "./auth/base";
import 'firebase/database';

const Contact = (props) => {
  return (
      <tr>
          <th className="a1">{props.user.name}</th>
          <th className="a2">{props.user.number}</th>
          <th className="a3">{props.user.email}</th>
          <th className="a4">{props.user.date}</th>
          <th className="a5"><button className="Red-btn" onClick={() => {
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
        Name: <input style={{marginRight:'5px'}} required placeholder="Mario Marasović" type="text" value={this.state.name} onChange={this.onChangeName}></input>
        Number: <input required placeholder="+385996045695" type="text" value={this.state.number} onChange={this.onChangeNumber}></input> <br/>
        Email: <input style={{marginRight:'5px'}} required placeholder="maras007@gmail.com" type="text" value={this.state.email} onChange={this.onChangeEmail}></input>
        Date of birth: <input required type="date" value={this.state.date} onChange={this.onChangeDate} min="1900-01-01" max="2100-12-31"></input> <br/>
        <button className="Blue-btn" onClick={() => this.props.addContactHandler(this.state)}>Add</button>
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
              name: 'Mario Marasović',
              number: '+385996045695',
              email: 'maras007@gmail.com',
              date: '30.12.1998'
            },
            {
              name: 'Domagoj Barbača',
              number: '+385982567643',
              email: 'dome007@gmail.com',
              date: '10.8.1998'
            },
            {
              name: 'Ivan Mršić',
              number: '+385978459945',
              email: 'mrso007@gmail.com',
              date: '9.7.1998'
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
        //logika za spremanje kontakata na firebase
        app.database().ref().child('contacts').set( this.state.ContactList );
      }
    
      componentDidMount() { //every time the component renders it will set the state to same value as on firebase
        app.database().ref().child('value').on('value', snap => {
          this.setState({
            value:  snap.val()
          });
        });
        //every time the component renders it will set the data to same value as on firebase
        app.database().ref().child('data').on('value', snap => {
          this.setState({
            data:  snap.val()
          });
        });
        //every time the component renders it will set the ContactList to same value as on firebase
        app.database().ref().child('contacts').on('value', snap => {
          this.setState({
            ContactList:  snap.val()
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

      addContactHandler = (contactData) => {
        const newContact = contactData;
        const { ContactList } = this.state;
        ContactList.unshift(newContact);
        this.setState({ContactList});
      }

  render() {  
  return (
    <div>
        <div className="Content">
                <h2>Add Contact</h2>
                <AddContact addContactHandler={this.addContactHandler} />
                <br/>
                <table>
                <tr className="Table-top">
                  <th className="a1">Name</th>
                  <th className="a2">Number</th>
                  <th className="a3">Email</th>
                  <th className="a4">Date of birth</th>
                  <th className="a5">Delete Contact</th>
                </tr>
                </table>
              {/* <div className="ContactsList"> */}
                <div className="Contact">
                      <table>
                          <thead>
                          </thead>
                          <tbody>
                          {this.state.ContactList.map((user, index) => {
                            return <Contact user={user} index={index} deleteContactHandler={this.deleteContactHandler} />
                          })}
                          </tbody>
                      </table>
                </div>
              {/* </div> */}

            <button className="Save-btn" onClick={this.handleSubmit}>Save</button>
            {/* button for signout from firebase, when we click on it we call signOut() in auth module which is created with initializeApp() */}
            <button className="Red-btn-1" onClick={this.handleSignOut}><b>Sign out</b></button>
        </div>
    </div>
  );
  }
};

export default Home;
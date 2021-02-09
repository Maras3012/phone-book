import './App.css';
import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import Footer from './components/Footer/Footer';
//authentication
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Toolbar />
        <Router>
          <div className="App">
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </Router>
        <Footer />
      </AuthProvider>
    )
  }
}

export default App;
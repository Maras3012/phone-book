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
import SideDrawer from './components/SideDrawer/SideDrawer';

class App extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState( (prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render() {
    return (
       <AuthProvider> {/* everything below has access to current user throw context and than it chooses what to show based on authentication status */}
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler} />
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
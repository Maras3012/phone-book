import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import './Padding.css';
import './Style.css';

const Login = ({ history }) => {
  const handleLogin = useCallback( //fires up when we click on login button
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value); //we call signin on firebase
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) { //if we have a user it will redirect us to path set by "/" and that is Home
    return <Redirect to="/" />;
  }

  return ( //layout
    <div className="Padding">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label className="Padding-1">
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button className="Login-btn" type="submit">Log in</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
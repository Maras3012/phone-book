import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import './Padding.css';
import './Style.css';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => { //it fires up when we click signup button, using useCallback to minimalize callback
    event.preventDefault(); //it helps to not reload the page
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value); //we try to create user on firebase
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return ( //layout
    <div className="Padding">
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp}>
        <label className="Padding-1">
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button className="Signin-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
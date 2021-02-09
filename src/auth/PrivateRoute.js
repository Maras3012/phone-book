import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => { //it tells us which component wether the user is authenticated
  const {currentUser} = useContext(AuthContext); //it accepts auth context and returns the value ment for provider
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? ( //if we have the user than render RouteComponent and if we don't than we render Redirect to login
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};


export default PrivateRoute
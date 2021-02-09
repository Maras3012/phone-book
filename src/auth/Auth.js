import React, { useEffect, useState } from "react";
import app from "./base.js";
//the use of this module stores authentication status and updates component tree
export const AuthContext = React.createContext(); //context propagates data throw the whole react component three

export const AuthProvider = ({ children }) => { //stores authentication status
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => { //updates the authentication status everytime it changes
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{ //user that is loged in
        currentUser
      }}
    >
      {children} {/* children are the other components that are passed */}
    </AuthContext.Provider>
  );
};
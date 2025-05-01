/** @format */

import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { setCredentials } from "./store/authSlice";
import { useDispatch } from "react-redux";
import { AuthContext } from "react-oauth2-code-pkce";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      <div className="container">
        {!token ? (
          <div className="login-container">
            <h1>Fitness App</h1>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#dc004e" }}
              onClick={() => logIn()}
            >
              LOGIN
            </Button>
          </div>
        ) : (
          <div className="authenticated-container">
            <pre>{JSON.stringify(tokenData, null, 2)}</pre>
            <pre>{JSON.stringify(token, null, 2)}</pre>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

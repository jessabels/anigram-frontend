import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Theme from "./Theme";
import { loadToken, loadUserInfo } from "./store/authentication";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      rest.needLogin === true ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

function App() {
  const token = useSelector((state) => state.authentication.token);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const needLogin = !token;

  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(loadUserInfo());
    }
  }, [token]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <Theme>
        <Router>
          <Navbar />
          <Route path="/signup" component={Signup}></Route>
          <Route path="/login" component={Login}></Route>

          <PrivateRoute
            path="/"
            exact={true}
            needLogin={needLogin}
            component={Homepage}
          />
          <PrivateRoute
            path="/profile"
            exact={true}
            needLogin={needLogin}
            component={Profile}
          />
        </Router>
      </Theme>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
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
    dispatch(loadUserInfo());
  }, [token]);

  if (!loaded) {
    return null;
  }
  return (
    <>
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
      </Router>
    </>
  );
}

export default App;

import Homepage from "./Homepage";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/" exact={true} component={Homepage}></Route>
      </Router>
    </>
  );
}

export default App;

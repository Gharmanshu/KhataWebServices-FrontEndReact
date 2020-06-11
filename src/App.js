import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AddEvent from "./AddEvent";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import UpdateEvent from "./UpdateEvent";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/addEvent" exact={true} component={AddEvent} />
        <Route path="/updateEvent" exact={true} component={UpdateEvent} />
        <Route path="/" exact={true} component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

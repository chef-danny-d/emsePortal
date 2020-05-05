import React from "react";
import AppNavbar from "./components/AppNavbar";
import Modules from "./components/modules";
import ModuleHousing from "./components/modules/ModuleHousing";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Dashboard from "./components/Dashboard";
import Portal from "./components/Portal";
import { Protector } from "./components/Protector";
import "./App.sass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Logout from "./components/users/Logout";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Portal} />

          <Route path="/dashboard" exact component={Dashboard} />

          <Route path="/modules" exact component={Modules} />

          <Protector path="/modules/:moduleId" component={ModuleHousing} />

          <Route path="/users/login" exact component={Login} />

          <Route path="/users/register" exact component={Register} />

          <Route path="/users/logout" exact component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import SideBar from "./components/SideBar.jsx";
import People from "./components/People.jsx";
import Planets from "./components/Planets.jsx";
import Starships from "./components/Starships.jsx";

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <Nav />
        <div className="container">
          <SideBar />
          <Route exact={true} path="/" component={People}></Route>
          <Route exact={true} path="/planets" component={Planets}></Route>
          <Route exact={true} path="/starships" component={Starships}></Route>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;

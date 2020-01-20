import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../css/sideBar.css";

const style = {
  color: "white"
};

export default class SideBar extends Component {
  render() {
    return (
      <div className="sideBar-container">
        <div className="sideBar-link">
          <NavLink exact to={"/"} activeStyle={style}>
            People
          </NavLink>
        </div>
        <div className="sideBar-link">
          <NavLink exact to={"/planets"} activeStyle={style}>
            Planets
          </NavLink>
        </div>
        <div className="sideBar-link">
          <NavLink exact to={"/starships"} activeStyle={style}>
            Starships
          </NavLink>
        </div>
      </div>
    );
  }
}

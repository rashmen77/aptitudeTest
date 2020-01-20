import React, { Component } from "react";
import "../css/nav.css";

export default class Nav extends Component {
  render() {
    return (
      <header className="nav-container">
        <div className="nav-title">
          <h2>FlightHub Developer Aptitude Test</h2>
        </div>
      </header>
    );
  }
}

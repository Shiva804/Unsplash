import React, { Component } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Home from "./components/Home";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: localStorage.getItem("loggedIn"),
      images: [],
    };
  }

  authenticate = () => {
    this.setState({ loggedin: true });
  };

  logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    this.setState({ loggedin: false });
  };

  images = (images) => {
    this.setState({ images: images });
  };

  render() {
    return (
      <div>
        {this.state.loggedin ? (
          <Header
            logout={this.logout}
            images={this.images}
            style={{ top: 0, position: "fixed" }}
          />
        ) : null}
        {this.state.loggedin ? <Main images={this.state.images} /> : null}
        {!this.state.loggedin ? (
          <Home authenticate={this.authenticate} />
        ) : null}
      </div>
    );
  }
}

import React, { Component } from "react";
import Header from "./components/header";
import Main from "./components/main";
import Home from "./components/Home";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
    };
  }

  authenticate = () => {
    this.setState({ loggedin: true });
  };

  logout = () => {
    this.setState({ loggedin: false });
  };

  render() {
    return (
      <div>
        {this.state.loggedin ? <Header /> : null}
        {this.state.loggedin ? <Main /> : null}
        {!this.state.loggedin ? (
          <Home authenticate={this.authenticate} />
        ) : null}
      </div>
    );
  }
}

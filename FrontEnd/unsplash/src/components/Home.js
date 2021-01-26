import React, { Component } from "react";

import Register from "./register";
import Login from "./login";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      register: false,
    };
  }

  registerButton = (e) => {
    if (e === "login") {
      this.setState({ register: false });
    } else {
      this.setState({ register: true });
    }
  };

  render() {
    return (
      <div>
        {this.state.register ? (
          <Register register={this.registerButton} />
        ) : (
          <Login register={this.registerButton} />
        )}
      </div>
    );
  }
}

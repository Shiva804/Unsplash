import React, { Component } from "react";
import "../styles/login.css";
import logo from "../my_unsplash_logo.svg";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: null,
      password: null,
    };
  }

  handleEvent = (e) => {
    if (e.target.id === "email") this.setState({ email: e.target.value });
    if (e.target.id === "password") this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div id="lg">
        <img src={logo} id="lg-logo"></img>
        <Button
          id="lg-register"
          variant="contained"
          onClick={() => {
            this.props.register("register");
          }}
        >
          Register
        </Button>
        <div id="login">
          <form onSubmit={this.handleSubmit}>
            <h2 id="lg-txt">Login !</h2>
            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={this.handleEvent}
            />{" "}
            <br />
            <br />
            <TextField
              id="password"
              label="Password"
              type="password"
              onChange={this.handleEvent}
            />
            <br />
            <br />
            <br />
            <Button type="submit" id="lg-submit" variant="contained">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

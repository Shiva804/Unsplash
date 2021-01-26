import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../styles/register.css";
import logo from "../my_unsplash_logo.svg";
import TextField from "@material-ui/core/TextField";
import axios from "../config";
import Alert from "./alert";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      username: null,
      password: null,
      error: null,
      message: null,
    };
  }

  handleMessage = () => {
    this.setState({ message: null });
    this.setState({ error: null });
  };

  handleEvent = (e) => {
    if (e.target.id === "email") this.setState({ email: e.target.value });
    if (e.target.id === "username") this.setState({ username: e.target.value });
    if (e.target.id === "password") this.setState({ password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (
      this.state.email == null ||
      this.state.username == null ||
      this.state.password == null
    )
      this.setState({ error: "Fill all the fields" });
    else {
      const user = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };

      const addUser = await axios.post("/registerUser", user);

      if (addUser.data == "409") {
        this.setState({ error: "User Already Exist" });
      } else {
        this.setState({ message: "Registered Successfully" });
      }

      setTimeout(() => {
        this.props.register("login");
      }, 1500);
    }
  };

  render() {
    return (
      <div id="rg">
        <img src={logo} id="rg-logo"></img>
        <Button
          id="rg-login"
          variant="contained"
          onClick={() => {
            this.props.register("login");
          }}
        >
          Login
        </Button>
        <div id="register">
          <form onSubmit={this.handleSubmit}>
            <h2 id="rg-txt">Register !</h2>
            <TextField
              id="username"
              label="Username"
              onChange={this.handleEvent}
            />
            <br />
            <br />
            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={this.handleEvent}
            />
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
              Register
            </Button>
          </form>
          {this.state.error !== null ? (
            <Alert
              error={this.state.error}
              handlemessage={this.handleMessage}
            />
          ) : null}
          {this.state.message !== null ? (
            <Alert
              message={this.state.message}
              handlemessage={this.handleMessage}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

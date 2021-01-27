import React, { Component } from "react";
import "../styles/login.css";
import logo from "../Images/my_unsplash_logo.svg";
import TextField from "@material-ui/core/TextField";
import Alert from "./Component/alert";
import Button from "@material-ui/core/Button";
import axios from "../config";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  handleEvent = (e) => {
    if (e.target.id === "email") this.setState({ email: e.target.value });
    if (e.target.id === "password") this.setState({ password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.email == "" || this.state.password == "")
      this.setState({ error: "Fill all the fields" });
    else {
      const login = {
        email: this.state.email,
        password: this.state.password,
      };

      const auth = await axios.post("/fetchUser", login);
      console.log(auth.data);
      if (auth.data == "404" || auth.data == "500") {
        this.setState({ error: "Invalid email or password" });
      } else {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("email", auth.data.email);
        localStorage.setItem("username", auth.data.username);
        localStorage.setItem("message", "Logged in successfully");
        this.props.handleLogin();
      }
    }
  };

  handleMessage = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <div id="lg">
        <img src={logo} id="lg-logo" alt="lg-logo"></img>
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
              Login
            </Button>
          </form>
        </div>
        {this.state.error !== null ? (
          <Alert error={this.state.error} handlemessage={this.handleMessage} />
        ) : null}
      </div>
    );
  }
}

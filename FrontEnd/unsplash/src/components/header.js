import React, { Component } from "react";
import logo from "../my_unsplash_logo.svg";
import "../styles/header.css";
import Button from "@material-ui/core/Button";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      search: null,
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ search: this.search.value }, () => {
      console.log(this.state.search);
    });

    this.search.value = "";
  };

  render() {
    return (
      <div id="header">
        <div id="ls">
          <img src={logo} alt="logo" id="logo" />
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              id="search"
              ref={(input) => (this.search = input)}
              placeholder="&#xf002; &nbsp; Search by name"
            />
          </form>
        </div>

        <Button variant="contained" id="add">
          Add a photo
        </Button>
      </div>
    );
  }
}

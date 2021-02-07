import React, { Component } from "react";
import logo from "../Images/my_unsplash_logo.svg";
import "../styles/header.css";
import Button from "@material-ui/core/Button";
import avatar from "../Images/user.svg";
import gallery from "../Images/gallery.svg";
import Popper from "@material-ui/core/Popper";
import Upload from "./upload";
import MenuIcon from "@material-ui/icons/Menu";
import Sidebar from "./sidebar";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      search: null,
      anchorEl: null,
      photoCount: 0,
      open: false,
      openMenu: false,
    };
  }

  handleClick = (event) => {
    this.state.anchorEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ search: this.search.value }, () => {
      console.log(this.state.search);
    });

    this.search.value = "";
  };

  handleToggle = () => {
    this.setState({ open: true });
  };

  handleClose = (images) => {
    this.setState({ open: false });
    if (images) {
      this.props.images(images);
    }
  };

  handleMenu = () => {
    if (this.state.openMenu) {
      this.setState({ openMenu: false });
    } else {
      this.setState({ openMenu: true });
    }
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const id = open ? "simple-popper" : undefined;
    return (
      <div className="header">
        <div className="head">
          <div className="ls">
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
          <div id="avt-btn">
            <Button variant="contained" id="add" onClick={this.handleToggle}>
              Add a photo
            </Button>

            <div className="gal">
              <img src={gallery} alt="gallery" className="gallery" />
              <img
                src={avatar}
                aria-describedby={id}
                id="avt"
                onClick={this.handleClick}
              />
            </div>
            <MenuIcon
              id="menu-icon"
              fontSize="large"
              onClick={this.handleMenu}
            />

            <Popper id={id} open={open} anchorEl={this.state.anchorEl}>
              <div>
                <h5 id="wb">Welcome Back</h5>
                <h4 id="user">{localStorage.getItem("username")}</h4>
                <h4>My Photos: {this.state.photoCount}</h4>
                <Button
                  id="signout"
                  variant="contained"
                  onClick={this.props.logout}
                >
                  Logout&nbsp; &#xf08b;
                </Button>
              </div>
            </Popper>
          </div>
          {this.state.open ? <Upload handleClose={this.handleClose} /> : null}
        </div>
        {this.state.openMenu ? (
          <Sidebar
            handleMenu={this.handleMenu}
            photoCount={this.state.photoCount}
          />
        ) : null}
      </div>
    );
  }
}

import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";

export default class Sidebar extends Component {
  render() {
    return (
      <div>
        <Drawer
          anchor="right"
          open={true}
          onClose={this.props.handleMenu}
        ></Drawer>
      </div>
    );
  }
}

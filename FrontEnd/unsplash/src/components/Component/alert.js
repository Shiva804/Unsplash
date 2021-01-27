import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default class Alert extends Component {
  constructor() {
    super();
    this.state = {
      open: true,
      error: null,
      message: null,
    };
  }
  componentDidMount = () => {
    if (this.props.message !== undefined)
      this.setState({ message: this.props.message });
    if (this.props.error !== undefined)
      this.setState({ error: this.props.error });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.handlemessage();
  };

  render() {
    return (
      <div>
        {this.state.message !== null ? (
          <Snackbar
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={this.handleClose}
              severity="success"
            >
              {this.state.message}
            </MuiAlert>
          </Snackbar>
        ) : null}

        {this.state.error !== null ? (
          <Snackbar
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={this.handleClose}
              severity="error"
            >
              {this.state.error}
            </MuiAlert>
          </Snackbar>
        ) : null}
      </div>
    );
  }
}

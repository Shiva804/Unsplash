import React, { Component } from "react";
import Alert from "./Component/alert";
import axios from "../config";

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
      message: localStorage.getItem("message"),
      pictures: [],
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }
  componentDidMount = async () => {
    const images = await axios.get("/getImages");

    this.setState({ images: images });
  };

  handleMessage = () => {
    localStorage.removeItem("message");
  };
  render() {
    return (
      <div>
        <div id="main">
          {this.state.pictures.length > 0 ? (
            <img src={this.state.pictures[0]} />
          ) : null}
          {this.state.message !== null ? (
            <Alert
              handlemessage={this.handleMessage}
              message={this.state.message}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "../config";

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      images: [],
    };
  }

  componentDidMount = async () => {
    // const images = await axios.get()
  };

  render() {
    return <div id="main"></div>;
  }
}

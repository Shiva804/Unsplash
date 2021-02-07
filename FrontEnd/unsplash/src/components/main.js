import React, { Component } from "react";
import Alert from "./Component/alert";
import axios from "../config";
import "../styles/main.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

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
    const myImages = await axios.get("/getUserImages");

    this.setState({ images: images.data.reverse() });
  };

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.images !== this.props.images &&
      this.props.images.length !== 0
    ) {
      console.log(this.props.images);
      this.setState({
        images: [this.props.images[0], ...this.state.images],
      });
    }
  };

  handleMessage = () => {
    localStorage.removeItem("message");
  };
  render() {
    return (
      <div className="main">
        <div className="grid">
          {this.state.pictures.length > 0 ? (
            <img src={this.state.pictures[0]} />
          ) : null}

          {this.state.images.length > 0 ? (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry columnsCount={5} gutter="10px">
                {this.state.images.map((image) => (
                  <div className="grid-item">
                    <div className="image-div">
                      <img
                        src={image.data_url}
                        id={image.label}
                        style={{ width: "100%", display: "block" }}
                      />
                    </div>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
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

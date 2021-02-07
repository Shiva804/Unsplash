import React from "react";
import ImageUploading from "react-images-uploading";
import Dialog from "@material-ui/core/Dialog";
import "../styles/upload.css";
import Button from "@material-ui/core/Button";
import Alert from "./Component/alert";
import axios from "../config";

export default function Upload(props) {
  const [images, setImages] = React.useState([]);
  const [label, setLabel] = React.useState("Untitled");
  const [error, setError] = React.useState(null);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit

    setImages(imageList);
  };

  const handleClose = () => {
    props.handleClose();
  };

  const handleMessage = () => {
    setError(null);
  };

  const handleChange = (e) => {
    setLabel(e.target.value);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setError("Select an image to upload..");
    } else {
      const data = {
        email: localStorage.getItem("email"),
        dataUrl: images[0].data_url,
        label: label,
      };

      console.log(data);
      const upload = await axios.post("/postImage", data);

      images[0] = { ...images[0], label: label };

      props.handleClose(images);
    }
  };

  return (
    <div className="upload">
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <div id="img-upload">
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={69}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageRemoveAll }) => (
              <div className="upload__image-wrapper">
                <Button
                  onClick={onImageUpload}
                  id="brw_btn"
                  color="primary"
                  variant="contained"
                >
                  Browse
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button
                  onClick={onImageRemoveAll}
                  id="rbtn"
                  color="secondary"
                  variant="contained"
                >
                  Remove
                </Button>
                <h3 id="ptxt">Preview</h3>
                <div id="preview">
                  {imageList.map((image, index) => (
                    <div key={index} id="image-item">
                      <img
                        src={image["data_url"]}
                        alt=""
                        width="250"
                        height="128px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
          <div className="label">
            <label for="label" style={{ fontWeight: "bolder" }}>
              Label: &nbsp;
            </label>
            <input
              id="label"
              type="text"
              defaultValue={label}
              onChange={handleChange}
            />
            <br />
            <Button id="ubtn" variant="contained" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </div>
      </Dialog>
      {error ? <Alert error={error} handlemessage={handleMessage} /> : null}
    </div>
  );
}

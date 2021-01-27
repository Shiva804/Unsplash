import React from "react";
import ImageUploading from "react-images-uploading";
import Dialog from "@material-ui/core/Dialog";
import "../styles/upload.css";
import Button from "@material-ui/core/Button";

export default function Upload(props) {
  const [images, setImages] = React.useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div className="upload">
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <div id="img-upload">
          <input id="label" type="text" />

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
                  id="ubtn"
                  color="primary"
                  variant="contained"
                >
                  Upload
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
        </div>
      </Dialog>
    </div>
  );
}

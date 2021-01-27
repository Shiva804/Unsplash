const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var cors = require("cors");
//import models

const UserData = require("./models/UserData");

require("dotenv").config();
app.use(bodyparser.json());
app.use(cors());
//Connect to DB
mongoose.connect(
  process.env.URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected");
  }
);
mongoose.set("useFindAndModify", false);

app.post("/registerUser", async (req, res) => {
  try {
    const checkUser = await UserData.find({ email: req.body.email });

    if (checkUser.length == 1) {
      res.send("409");
    } else {
      const hash = await bcrypt.hash(req.body.password, saltRounds);

      const newUser = new UserData({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });

      const saved = await newUser.save();
      res.json(saved);
    }
  } catch (error) {
    res.send(error);
  }
});

app.post("/postImage", async (req, res) => {
  try {
    const imageObj = { label: req.body.label, image_url: req.body.imageUrl };
    const images = await UserData.find({ email: req.body.email });
    const imageData = images[0].image;
    imageData.push(imageObj);

    const updateData = await UserData.updateOne(
      { email: req.body.email },
      { image: imageData }
    );

    res.json(updateData);
  } catch (error) {
    res.json(error);
  }
});

app.get("/getUserImages", async (req, res) => {
  try {
    const data = await UserData.find({ email: req.body.email });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/getImages", async (req, res) => {
  try {
    const images = [];

    const data = await UserData.find();

    data.forEach((elem) => {
      if (elem.image.length > 0) {
        elem.image.forEach((img) => {
          images.push(img);
        });
      }
    });

    res.send(images);
  } catch (err) {
    res.json(err);
  }
});

app.post("/fetchUser", async (req, res) => {
  try {
    const data = await UserData.find({ email: req.body.email });

    if (!data.length) {
      res.send("404");
    }

    const password = await bcrypt.compare(req.body.password, data[0].password);

    if (password) {
      res.send(data[0]);
    } else {
      res.send("500");
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(5000, () => {
  console.log("listening..");
});

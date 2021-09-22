const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Model = require("./Schema/model");
const mongoose = require("mongoose");
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors())
const URI =
  "mongodb+srv://mahi:mahihacker@sandboxx.6epsu.mongodb.net/MaP?retryWrites=true&w=majority";

mongoose.connect(
  URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("error", err);
      throw err;
    } else {
      console.log("Database connected");
    }
  }
);
const uploadDataInDB = (name, pos, date) => {
  console.log(pos)
  let locationModel = new Model({
    name: name,
    lan: pos.lat,
    lon: pos.lon,
    date: date,
  });
  locationModel
    .save()
    .then((doc) => {
      console.log(doc);
      console.log("uploaded");
      return true;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        return false;
      }
    });
};

app.post("/postlocation", (req, res) => {
  console.log(req)
  if (uploadDataInDB(req.body.name, req.body.pos, Date.now())) {
    res.status(200).json({
      result: "Data uploaded sucessfully",
      state: true,
    });
  }
  res.status(400).json({
    state: false,
    result: "Data was not uploaded",
  });
});

app.get("/getlocation", (req, res) => {

  Model.find({}, (docs ,err) => {
    console.log(err,docs)
    res.send(docs);
    // let position =docs 
    // if (!err) {
    //   console.log(err);
    //   res.json({
    //     state: false,
    //     docs: null,
    //   });
    // } else {
    //   console.log(err,docs)
    //   console.log("document received");
    //   console.log(position)
    //   res.json(position);
    // }
  });
});

app.listen(5000, (err) => {
  if (!err) {
    console.log("server connected PORT::5000");
  }
});
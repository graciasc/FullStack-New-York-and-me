const express = require("express");
const port = process.env.PORT || 3000;
require("dotenv").config();
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  "mongodb+srv://gman:1@learning-cluster-jurht.mongodb.net/test?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const feedbackSchema = new Schema({
  name: { type: String, required: true },
  textInput: { type: String, required: true }
});

const Feed = mongoose.model("Feedback", feedbackSchema);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// serving static files
app.use("/server", (req, res) => {
  // sending server world ---
  res.send("Server World");
  //   res.writeHead(200);
});
app.post("/Feedback.html", (req, res, next) => {
  // This is saving the body of the post request
  // console.log(req.body.name, req.body.feed)
  // fixed need to pass in the specifically what needs to be saved in the db
  const myData = new Feed({ name: req.body.name, textInput: req.body.feed });
  myData
    .save()
    .then(item => {
      res.send("item saved to database. Go back to App");
    })
    .catch((item, err) => {
      res.status(400).send(`unable to save to database ${item}`);
    });
  // res.send(`post request for feedback: FeedBack written: ${req.body.feed}`);
});
app.listen(port, () => {
  console.log("Server Started....");
});

app.get("/about.html/:feedback", (req, res) => {
  //should look for a specific user
});

//looks for everyone in the Db
app.get("/json", (req, res) => {
  Feed.find({}, (err, data) => {
    if (err) return console.error(err);
    res.send(data);
  });
});

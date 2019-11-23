const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect(
  "mongodb+srv://gman:1@learning-cluster-jurht.mongodb.net/test?retryWrites=true",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// .then(() => {
//   console.log("Connected to Database");
//   }).catch((err) => {
//       console.log("Not Connected to Database ERROR! ", err);
//   });
// console.log(process.env.MONGO_URI)

//created a nenw schema for a person
const feedbackSchema = new Schema({
  name: { type: String, required: true },
  textInput: { type: String, required: true }
});

const Feed = mongoose.model("Feedback", feedbackSchema);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/", express.static("public")); // serving static files
app.use("/about.html", express.static("public")); // serving static files
app.use("/server", (req, res) => {
  // sending server world ---
  res.send("Server World");
  //   res.writeHead(200);
});
app.post("/about.html", (req, res) => {
  // beilieve this is saving the body of the post request
  const myData = new Feed(req.body);
  myData
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  // res.send(`post request for feedback: FeedBack written: ${req.body.feed}`);
  console.log(req.body.feed, req.body.name);
});
app.listen(3000, () => {
  console.log("Server Started....");
});
module.export = app;

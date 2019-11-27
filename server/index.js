const express = require("express");
require('dotenv').config();
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// mongodb+srv://gman:1@learning-cluster-jurht.mongodb.net/test?retryWrites=true
console.log(process.env.MONGO_URI)

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
app.use(express.static("public")); // serving static files
app.use("/server", (req, res) => {
  // sending server world ---
  res.send("Server World");
  //   res.writeHead(200);
});
app.post("/Feedback.html", (req, res) => {
  // beilieve this is saving the body of the post request
  // console.log(req.body.name, req.body.feed)
  // fixed need to pass in the specifically what needs to be saved in the db
  const myData = new Feed({ name: req.body.name, textInput: req.body.feed });
  myData
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch((item, err) => {
      res.status(400).send(`unable to save to database ${item}`);
    });
  // res.send(`post request for feedback: FeedBack written: ${req.body.feed}`);
});
app.listen(3000, () => {
  console.log("Server Started....");
});

app.get('/about.html/:feedback', (req, res) => {
  //should look for a specific user
})
//looks for everyone in the Db
app.get('/json', (req, res) => {
  Feed.find({}, (err,data) => {
    if(err) return console.error(err);
    res.send(data);
  })
})
module.export = app;

// using ky to call the data
//   const ky = require("ky")(async () => {
//   const parsed = await ky
//     .post("http://localhost:3000/json", { json: { foo: true } })
//     .json();
//   console.log(parsed);
//   //=> `{data: '🦄'}`
// })();
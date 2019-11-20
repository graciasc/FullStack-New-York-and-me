const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// app.use('/generic', routes);
// app.get('/')
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
  res.send(`post request for feedback: FeedBack written: ${req.body.feed}`);
  console.log(req.body.userfeed);
});
app.listen(3000, () => {
  console.log("Server Started....");
});
module.export = app;

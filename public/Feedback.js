const fetch = require("node-fetch"); // was trying to use import but not working

const returnedData = async () => {
  const response = await fetch("http://localhost:3000/json");
  const data = await response.json();
  console.log(data);
  feedback_content_div = document.getElementsByClassName(
    "feedback-content"
  ).innerHTML = `<h1> ${data.name} </h1> <p> ${data.textInput} </p>`;
};

console.log(returnedData());

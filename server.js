const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

const historicalData = fs.readFileSync("historicalData.json");

const dataSchema = [
  {
    name: "Time",
    type: "date",
    format: "%d/%m/%y %-H:%M"
  },
  {
    name: "Type",
    type: "string"
  },
  {
    name: "Weight",
    type: "number"
  }
];

let dummyData = {
  paper: 222,
  recyclables: 130,
  compost: 150,
  landfill: 355
};

const addLeadingZero = num => {
  return num <= 9 ? "0" + num : num;
};

const getCurrentTime = () => {
  let date_time = new Date();
  let curr_hour = date_time.getHours();
  let curr_min = date_time.getMinutes();
  let curr_sec = date_time.getSeconds();
  let curr_time =
    addLeadingZero(curr_hour) +
    ":" +
    addLeadingZero(curr_min) +
    ":" +
    addLeadingZero(curr_sec);
  return curr_time;
};

const updateDummyData = () => {
  dummyData.paper += Math.floor(Math.random() * 50 - 25);
  dummyData.recyclables += Math.floor(Math.random() * 20 - 10);
  dummyData.compost += Math.floor(Math.random() * 20 - 10);
  dummyData.landfill += Math.floor(Math.random() * 100 - 50);
};

app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/currentdata", function(req, res) {
  //   let newJson = [];
  //   for (i = 0; i < historicalData.length; i++) {
  //     newJson.push([historicalData[i][0], "Paper", historicalData[i][1]]);
  //     newJson.push([historicalData[i][0], "Recyclables", historicalData[i][2]]);
  //     newJson.push([historicalData[i][0], "Compost", historicalData[i][3]]);
  //     newJson.push([historicalData[i][0], "Landfill", historicalData[i][4]]);
  //   }
  //   fs.writeFileSync("./new-format.json", JSON.stringify(newJson));
  updateDummyData();
  res.send({ ...dummyData, time: getCurrentTime() });
});

app.get("/historicaldata", function(req, res) {
  res.send(historicalData);
});

app.get("/dataschema", function(req, res) {
  res.send(dataSchema);
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

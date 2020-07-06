const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(data => {
      res.json(data);
    })
    .catch(data => {
      res.json(data);
    });
});

app.post("/api/workouts", (req, res) => {
  db.Workout.create(new db.Workout(req.body))
    .then(data => {
      res.send(data);
    })
    .catch(data => {
      res.json(data);
    });
});

app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        exercise: req.body
      }
    },
    {
      new: !0
    }
  )
    .then(data => {
      res.json(data);
    })
    .catch(data => {
      res.json(data);
    });
}),
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.findByIdAndUpdate({}).then(data => {
      res.json(data);
    });
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

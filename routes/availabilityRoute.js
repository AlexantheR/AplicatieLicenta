var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;

// Parameters:
// {
//   "date": String ("Dec 02 2019 06:00")
// }

router.post("/", function(req, res, next) {
  console.log("request attempted");

  console.log(req.body);
  const dateTime = new Date(req.body.date);

  Day.find({ date: dateTime }, (err, docs) => {
    if (!err) {
      if (docs.length > 0) {
        // Record already exists
        console.log("Inregistarea exista. Documentele au fost trimise");
        res.status(200).send(docs[0]);
      } else {
        // Searched date does not exist and we need to create it
        const allTables = require("../data/allTables");
        const day = new Day({
          date: dateTime,
          tables: allTables
        });
        day.save(err => {
          if (err) {
            res.status(400).send("Eroare la salvarea unei date noi");
          } else {
            // Saved date and need to return all tables (because all are now available)
            console.log("A fost creata o data noua. Documentele au fost trimise");
            Day.find({ date: dateTime }, (err, docs) => {
              err ? res.sendStatus(400) : res.status(200).send(docs[0]);
            });
          }
        });
      }
    } else {
      res.status(400).send("Nu s-a putut cauta data");
    }
  });
});

module.exports = router;

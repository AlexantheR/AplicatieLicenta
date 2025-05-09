const mongoose = require("mongoose");

var mongoURL =
"mongodb+srv://adinu90:pFBfDnMXIHNhThNB@cluster0.ptrzjxu.mongodb.net/mern-pizza"

  //"mongodb+srv://adinu90:a9CvgC7NR0GBvfiL@cluster0.22avqt6.mongodb.net/mern-pizza";
  

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", () => {
  console.log("Error connecting to MongoDB");
});

module.exports = mongoose;

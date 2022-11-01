//import Express
const express = require("express");
const cors = require("cors");
const exampleRoutes = require("./routes/exampleRoutes");
const { mongoose } = require("mongoose");
const morgan = require("morgan");
const indexRoutes = require("./routes/indexRoutes");

//Create Express Create
const app = express();

//Connect to mongo
mongoose.connect(
  "mongodb+srv://backend:backend@backend.ullktfa.mongodb.net/?retryWrites=true&w=majority"
);

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Error");
});
connection.once("open", () => {
  console.log("Connection Successfull");
});

//GET - To Read
//POST - To Create
//DELETE - To Delete
//PUT - To Update

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(new Date());
//   console.log("Middlewear");
//   // next();
// });

app.use("/", indexRoutes);
app.use("/example", exampleRoutes);

// Listen To Port
app.listen(3000, () => {
  console.log("Express Server Started");
});

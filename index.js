//import Express
const express = require("express");
const exampleRoutes = require("./routes/exampleRoutes");

//Create Express Create
const app = express();

//GET - To Read
//POST - To Create
//DELETE - To Delete
//PUT - To Update

// app.use((req, res) => {
//   res.json({
//     message: "Use Example",
//   });
// });

app.use("/example", exampleRoutes);

// Listen To Port
app.listen(3000, () => {
  console.log("Express Server Started");
});

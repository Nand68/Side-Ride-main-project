const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const auth=require('./routes/auth')
const cookieParser =require('cookie-parser')
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();
const PORT = process.env.port;
const mongourl=process.env.mongourl;

app.use(
  cors({ 
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());


app.use("/", routes);
app.use("/", auth);
app.use("/admin", adminRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(mongourl);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

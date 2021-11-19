const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config(); // to start our .env package

// db connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to server...🔌"))
  .catch(() => console.log("Couldn't connect to db...❌"))

// middleware connection
app.use(express.json());
app.use(cors())

// routes
app.use("/api/v1/beans", require('./routes/bean'));
app.use("/api/v1/coffees", require("./routes/coffee")); 
app.use("/api/v1/auth", require("./routes/user"));

// port setup & listen to clients
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running...⚡"));

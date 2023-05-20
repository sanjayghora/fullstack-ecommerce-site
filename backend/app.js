// const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// const db = "mongodb+srv://sanjay-ghora:<pEKfWzJsXEJUI5Xp>@sanjayg.durqefg.mongodb.net/mernstack?retryWrites=true&w=majority";

// mongoose.connect(db);

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

//route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;

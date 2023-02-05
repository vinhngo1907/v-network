require('dotenv').config();
const express = require('express');
const cors = require('cors');

const createRoutes = require('./routes/index.routing');
const connectDB = require('./config/db.config');
const keys = require("./config/main.config");
const {mongoURL, port} = keys;

connectDB(mongoURL);

const app = express();
app.use(express.json());
app.use(cors());

createRoutes(app);

app.listen(port, () => console.log(`Server started on port ${port}`))

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
require("./config/mysql");
require("./models/index");
const userRoutes = require('./routers/user');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/', userRoutes);

app.listen(process.env.PORT || 5000, () => {
    logger.info(`Server running on port ${process.env.PORT || 5000}`);
});

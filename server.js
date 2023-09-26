const express = require('express');
const bodyParser = require('body-parser');
const channelRouter = require('./routes/channel/channelRoutes');
const globalErrHandler = require('./middlewares/globalErrHandler');
const categoryRouter = require('./routes/category/categoryRoutes');

require('dotenv').config();
require('./config/dbConnect');
const app = express();

app.use(bodyParser.json());

//-------------------------------------------routes----------------------------------------------------------

app.use(process.env.CHANELL_BASE_PATH, channelRouter);

app.use(process.env.CATEGORY_BASE_PATH, categoryRouter);

//---------------------------------------------------------------------------------------------------------
//error handlers middleware
app.use(globalErrHandler);

//404 error handler
app.use('*', (req, res) => {
    console.log(req.originalUrl);
    res.status(404).json({
        message: 'Route not found'
    });
});

//start server
const port = process.env.PORT || 9002;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
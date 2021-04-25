process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require("express");
const { ValidationError } = require("express-validation");

const app = express();
global.App = app;

global.configHolder = require("./configurations/dependency-include");

require("./configurations/init")();

const commonRoutes = require("./configurations/routes/common");
const projectRoutes = require("./configurations/routes/project");

app.use("/api/v1/common", commonRoutes);
app.use("/api/v1/project", projectRoutes);

app.get('/', (req, res) => res.status(200).send('Server is running'));

app.use((error, req, res, next) => {
    console.error('Error ', { error });

    if (error instanceof ValidationError) {
        console.log({ error });
        error = views.ErrorView({ status: error.statusCode, message: error.details.body[0].message });
        return res.status(error.status).json(error);
    }

    const status = error.statusCode || 500;
    const message = error.message || 'Something went wrong';

    error = views.ErrorView({ status, message });
    // error = { status, message }
    return res.status(error.status).json(error);
});

const Socket = require('pusher');

const pusher = new Socket({
    appId: process.env.APP_ID,
    key: process.env.APP_KEY,
    secret: process.env.APP_SECRET,
    cluster: process.env.AOO_CLUSTER,
    useTLS: true
});

global.Pusher = pusher;

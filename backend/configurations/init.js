const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require("path");
const cors = require('cors');

App.use(express.json());
App.use(express.static(path.join(__dirname, 'public')));
App.use(bodyParser.json({ limit: '100mb' }));
App.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
App.use(helmet())
App.use(hpp())
App.use(cors())

// global.swaggerDocs = swaggerJsDoc(options);

const createAdmin = async () => {
    try {
        const data = {
            name: process.env.ADMIN_FULL_NAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            phone: process.env.ADMIN_PHONE,
            role: "super_admin",
            isEmailVerified: true,
            isPhoneVerified: true
        };

        const admin = await domain.User.findOne({
            where: {
                role: 'super_admin'
            }
        });

        if (!admin) {
            await domain.User.create(data);
        }
    } catch (err) {
        next(err)
    }
}

module.exports = () => {
    console.log("process.env.PORT", process.env.PORT)
    App.listen(process.env.PORT, () => {
        Logger.info(`Express server starting at port ${process.env.PORT}, in ${process.env.NODE_ENV} environment`)
        // createAdmin()
    })
}

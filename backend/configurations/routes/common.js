const { Router } = require("express");
const { validate } = require("express-validation");
// Controllers
const { registerController, loginController, getUserListController } = require("../../controllers/authentication");
// middlewares
const validationSchema = require("../../application/validations");
const { canAccess } = require("../../application/middlewares/access");
const authenticated = require("../../application/middlewares/authentication");

const router = Router();

router.post(
    "/register/:role",
    validate(validationSchema.signupValidation, {}, {}),
    canAccess(["anonymous"]),
    registerController
)
    .post(
        "/login",
        validate(validationSchema.loginValidation, {}, {}),
        canAccess(["anonymous"]),
        loginController,
    ).get(
        "/get-user-list",
        authenticated,
        canAccess(["user"]),
        getUserListController
    );

module.exports = router;

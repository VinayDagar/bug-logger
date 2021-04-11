const { Router } = require("express");
const { validate } = require("express-validation");
const validationSchema = require("../../application/validations");
const { canAccess } = require("../../application/middlewares/access");
const authenticated = require("../../application/middlewares/authentication");
const {
    updateDeliveryBoyController, updateActiveStatusController,
    approveDeliveryBoy, findAndCountDeliveryBoy,
    getDeliveryDataController, getDeliveryDataByUserController
} = require("../../controllers/user");

const router = Router();

router.put(
    "/update-delivery-content",
    validate(validationSchema.updateDeliveryContentValidation, {}, {}),
    authenticated,
    canAccess(["delivery", "admin"]),
    updateDeliveryBoyController
)
    .post(
        "/update-online-status",
        authenticated,
        canAccess(["delivery", "admin"]),
        updateActiveStatusController,
    ).put(
        "/approve-delivery-boy/:deliveryId",
        authenticated,
        canAccess(["admin"]),
        approveDeliveryBoy
    ).get(
        '/find-and-count/delivery-boy',
        authenticated,
        canAccess(['admin']),
        findAndCountDeliveryBoy
    ).get(
        "/user-detail",
        authenticated,
        canAccess(["delivery"]),
        getDeliveryDataController
    ).get(
        "/user-detail/:userId",
        authenticated,
        canAccess(["delivery"]),
        getDeliveryDataByUserController
    );

module.exports = router;

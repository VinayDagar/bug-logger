const moment = require("moment");

exports.updateDeliveryBoyController = async (req, res, next) => {
    try {
        const {
            name, alternatePhone, address,
            image, panCard, aadharCardFront,
            aadharCardBack, drivingLicence,
            aadharNumber, panNumber,
            drivingLicenceNumber,
            referralCode
        } = req.body;

        const deliveryBoy = await domain.DeliveryBoy.findOne({
            where: {
                userId: req.loggedInUser.id
            }
        });

        let referredBy;
        let isValid = true;

        if (referralCode) {
            referredBy = await domain.User.findOne({
                where: {
                    referralCode
                }
            });

            if (!referredBy) {
                isValid = false;
            }
        }

        if (!deliveryBoy) {
            const error = new Error("Delivery Boy not found!");
            error.statusCode = 404;
            return next(error);
        }

        if (referralCode && !isValid) {
            const error = new Error("Referral code not found!");
            error.statusCode = 404;
            return next(error);
        }

        const data = {
            image, panCard, aadharCardFront,
            aadharCardBack, drivingLicence,
            aadharNumber, panNumber,
            drivingLicenceNumber,
        };
        const userData = {
            name, address, alternatePhone,
        };
        const isAlreadyRegistered = deliveryBoy.aadharNumber && deliveryBoy.drivingLicenceNumber ? true : false;

        if (referralCode && isValid && !isAlreadyRegistered) {
            userData.referredBy = referredBy.id;
        }

        await Promise.all([
            domain.User.findByIdAndUpdate(req.loggedInUser.id, userData),
            deliveryBoy.update(data),
        ]);

        const user = await domain.User.findOne({
            where: {
                id: req.loggedInUser.id
            },
            attributes: {
                exclude: ["salt", "password", "createdAt", "updatedAt"]
            },
            include: [{
                model: domain.DeliveryBoy,
                as: "deliveryBoy",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }]
        });

        user.isAlreadyRegistered = true;
        user.dataValues.isAlreadyRegistered = true;

        const response = views.JsonView({ message: "user succssfully updated!", user });
        return res.status(200).json(response);

    } catch (err) {
        next(err);
    }
};


exports.verifyOtpController = async (req, res, next) => {
    try {
        const { otp } = req.body;

        const otpValue = await domain.Otp.findOne({
            where: {
                otp,
                phone: req.loggedInUser.phone,
                status: "active"
            }
        });

        if (!otpValue) {
            const error = new Error("OTP not matched!");
            error.statusCode = 401;
            return next(error);
        }

        const isOtpValid = checkIfOtpValid(otpValue.createdAt);

        if (!isOtpValid) {
            await otpValue.update({
                status: "expired"
            });

            const error = new Error("The validity of the OTP entered has expired. Please try resending the OTP to verify your mobile number.");
            error.statusCode = 400;
            return next(error);
        }

        await Promise.all([
            domain.User.findByIdAndUpdate(req.loggedInUser.id, {
                isPhoneVerifeid: true,
                isLoggedIn: true
            }),
            otpValue.update({
                status: "verified"
            })
        ]);

        const response = views.JsonView({ message: "otp successfully verified!" });
        return res.status(200).json(response);

    } catch (err) {
        next(err);
    }
};

exports.approveDeliveryBoy = async (req, res, next) => {
    try {
        const { deliveryId } = req.params;

        const user = await domain.User.findOne({
            include: [{
                model: domain.DeliveryBoy,
                as: "deliveryBoy",
                where: {
                    id: deliveryId
                }
            }]
        });

        if (!user) {
            const error = new Error("Delivery boy not found!");
            error.statusCode = 404;
            return next(error);
        }

        let response = {};
        if (user.deliveryBoy.isApproved) {
            response = views.JsonView({ message: "user is already approved!" });
            return res.status(200).json(response);
        } else {
            const referralCode = await createUniqueReferralCode(user.name, next);

            await user.update({
                referralCode,
            });

            await domain.DeliveryBoy.update({
                isApproved: true
            }, {
                where: {
                    id: deliveryId
                }
            });

            response = views.JsonView({ message: "delivery boy updated successfully!" });
            return res.status(200).json(response);
        }

    } catch (err) {
        next(err);
    }
};


/**
 * 
 * @param {string} createdAt    current OTP created time
 * 
 * @description                 verify OTP if still vaild by, differencing  between the OTP created Time and current time, 
 *                              if current time is greater or equal to 2 minutes then return false else true
 *                              True: OTP is still valid, False: OTP has been expired. 
 */
const checkIfOtpValid = (createdAt) => {
    const otpInitialDate = moment(createdAt);
    const difference = moment().diff(otpInitialDate, 'seconds');
    return difference < 30;
};


exports.updateActiveStatusController = async (req, res, next) => {
    try {
        const { statusId } = req.body;

        if (!statusId) {
            const activity = await domain.ActiveStatus.create({
                userId: req.loggedInUser.id,
                onlineAt: new Date(),
            });
            const response = views.JsonView({ message: "successful", activity });
            return res.status(201).json(response);
        }

        const activeStatus = await domain.ActiveStatus.findOne({
            where: {
                id: statusId
            }
        });

        if (!activeStatus) {
            const error = new Error("Activity not found!");
            error.statusCode = 404;
            return next(error);
        }

        const result = await activeStatus.update({
            offlineAt: new Date()
        });

        const response = views.JsonView({ message: "successful", activity: result });
        return res.status(200).json(response);

    } catch (err) {
        next(err);
    }
};


const createUniqueReferralCode = async (name, callback) => {
    try {
        let code = Math.floor(Math.random() * (999 - 100 + 1) + 100);

        code = `${name.substring(0, 3).toLowerCase()}${code}`;

        const deliveryCode = await domain.User.findOne({
            where: {
                referralCode: code
            }
        });

        if (deliveryCode) {
            await createUniqueReferralCode();
        } else {
            return code;
        }
    } catch (error) {
        return callback(error);
    }
};

exports.findAndCountDeliveryBoy = async (req, res, next) => {
    try {
        const { offset, limit, search } = req.query;
        let where = {
            role: "delivery"
        };

        if (search) {
            where = {
                ...where,
                $or: [{
                    name: {
                        $iLike: `%${search}%`
                    },

                }, {
                    phone: {
                        $iLike: `%${search}%`
                    },

                }, {
                    address: {
                        $iLike: `%${search}%`
                    },
                }]
            };
        }

        const data = await domain.User.findAndCountAll({
            where,
            attributes: ["name", "phone", "address", "isLoggedIn", "id"],
            include: [
                {
                    model: domain.DeliveryBoy,
                    as: "deliveryBoy",
                    attributes: ["isApproved", "id"]
                }
            ],
            limit,
            offset,
            order: [
                ["id", "DESC"]]
        });

        const response = views.JsonView(data);
        return res.status(200).json(response);

    } catch (err) {
        next(err);
    }
};

exports.getDeliveryDataController = async (req, res, next) => {
    try {
        const { id } = req.loggedInUser;

        const user = await domain.User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "salt", "password"]
            },
            include: [{
                model: domain.DeliveryBoy,
                as: "deliveryBoy",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }]
        });

        const response = views.JsonView(user);
        return res.status(200).json(response);

    } catch (err) {
        next(err);
    }
};

exports.getDeliveryDataByUserController = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await domain.User.findOne({
            where: {
                id: userId
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "salt", "password"]
            },
            include: [{
                model: domain.DeliveryBoy,
                as: "deliveryBoy",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }]
        });

        if (!user) {
            const error = new Error("User not found!");
            error.statusCode = 404;
            return next(error);
        }

        const response = views.JsonView(user);
        return res.status(200).json(response);

    } catch (err) {
        next(err);
    }
};

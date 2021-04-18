exports.registerController = async (req, res, next) => {
    try {
        const {
            phone,
            email,
            password,
            name,
        } = req.body;

        const user = await domain.User.findByEmail(email);

        if (user) {
            const error = new Error("Email already registered!");
            error.statsuCode = 400;
            return next(error);
        }

        const newUser = await domain.User.create({
            phone, email,
            password, name
        });

        createTokenAndReturn(newUser, res, next);

    } catch (err) {
        next(err);
    }
};


exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error("Invaid arguments!");
            error.statusCode = 401;
            return next(error);
        }

        const user = await domain.User.findByEmail(email);

        if (!user) {
            const error = new Error("User not found!");
            error.statusCode = 404;
            return next(error);
        }

        if (!checkIfPasswordValid(user, password)) {
            const error = new Error("Email or Password does not matched!");
            error.statusCode = 401;
            return next(error);
        }

        createTokenAndReturn(user, res, next);

    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param user      user who is trying to login  
 * @param password  entered password by user
 * 
 * @description     Tries to match the entered password with user existing password, by creating hash of entered password,
 *                  if both password matches, then return true else fale.  
 */
const checkIfPasswordValid = (user, password) => {
    try {
        const hash = configHolder.encryptUtility.createHash(user.salt, password);

        return hash === user.password;
    } catch (err) {
        throw new Error(err);
    }
};


/**
 * 
 * @param user              User which is trying to login  
 * @param { Object } res    Response object, used in order to send response
 * @param callback          next funcion to throw errors in case any
 * 
 * @description     Tries to generate JWT token using global utility createToken function of globally defined jwtUtility 
 *                  and fetch the complete user and send token and user in response.  
 */
const createTokenAndReturn = async (user, res, callback, sendOtpInterval = true) => {
    try {
        const payload = {
            userId: user.id,
            type: "AUTH_TOKEN",
            meta: {
                "APP_NAME": "TASK_LOGGER"
            }
        };
        const token = configHolder.jwtUtility.createToken(payload);

        user = await domain.User.findOne({
            where: {
                id: user.id,
            },
            attributes: {
                exclude: ["salt", "password", "createdAt", "updatedAt"]
            }
        });

        const response = views.JsonView({ user, token });

        return res.status(200).json(response);
    } catch (err) {
        return callback(err);
    }
};

exports.getUserListController = async (req, res, next) => {
    try {
        const users = await domain.User.findAll({
            where: {
                role: {
                    $eq: "user"
                }
            },
            attributes: ["email", "id", "name"]
        });

        const response = views.JsonView({ users });
        return res.status(200).json(response);

    } catch (err) {
        return next(err);
    }
} 

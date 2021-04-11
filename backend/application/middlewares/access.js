module.exports = (function () {
    const canAccess = (access = ['super_admin']) => {
        return async (req, res, next) => {
            try {
                access = [...access, 'super_admin'];

                const isAnonymous = access.includes('anonymous');
                if (isAnonymous) {
                    return next()
                }

                const { role } = req.loggedInUser;

                if (['admin', 'super_admin'].includes(role)) {
                    return next();
                }

                if (!role) {
                    const err = new Error('Forbidden! Permission denied.')
                    err.statusCode = 403
                    return next(err)
                }

                if (!access.includes(role)) {
                    const err = new Error('Permission denied. Forbidden!')
                    err.statusCode = 403
                    return next(err)
                }

                return next();

            } catch (err) {
                next(err)
            }
        }
    }

    return {
        canAccess
    }

})()
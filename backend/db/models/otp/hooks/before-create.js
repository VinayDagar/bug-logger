module.exports = async function (instance) {
    try {
        await domain.Otp.update({
            status: 'expired'
        }, {
            where: {
                phone: instance.phone,
                status: {
                    $ne: 'verified'
                }
            }
        });

        const otp = Math.floor(1000 + Math.random() * 9000);
        instance.otp = otp;

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(err)
    }
};

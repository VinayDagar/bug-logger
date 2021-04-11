module.exports = async function (instance) {

    // if (instance.role === 'delivery') {
    //     await domain.DeliveryBoy.create({
    //         userId: instance.id
    //     });

    //     await domain.Otp.create({
    //         phone: instance.phone,
    //         userId: instance.id
    //     })
    // }

    return Promise.resolve(instance);
};

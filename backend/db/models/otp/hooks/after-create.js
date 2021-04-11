module.exports = async function (instance) {
    try {
        const message = `Your one time mobile verification number is ${instance.otp}`;
        const { data } = await configHolder.smsUtility.sendSms(instance.phone, message);

        const messageId = data.MessageData[0].MessageId;
        
        await instance.update({
            messageId
        });

        return Promise.resolve(instance);
    } catch (err) {
        return Promise.reject(instance);
    }

};

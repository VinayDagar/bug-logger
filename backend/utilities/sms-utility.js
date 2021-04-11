const Axios = require('axios');

module.exports = (function () {
    const sendSms = async (to, message) => {
        try {
            const url = `${process.env.SMS_GATEWAY_URL}?APIKey=${process.env.SMS_GATEWAY_API_KEY}&senderid=${process.env.SMS_GATEWAY_SENDERID}&channel=2&DCS=0&flashsms=0&number=${to}&text=${message}&route=1`

            const response = await Axios(url);

            return response;
        } catch (err) {
            throw new Error(err)
        }
    }

    return {
        sendSms,
    }
})()
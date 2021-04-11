import { message } from "antd";
message.config({
    top: 24,
    duration: 3,
    maxCount: 1,
});

const service = {
    redirectToHttps() {
        const loc = `${window.location.href} `;
        if (loc.indexOf("http://") === 0 && process.env.NODE_ENV === "production") {
            window.location.href = loc.replace("http://", "https://");
        }
    },
    downloadFile(url, fileName = "") {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    redirectToLink(url) {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    showSuccessMessage(msg, duration = 3) {
        if (!message) return;
        message.success(msg, duration);
    },
    showWarningMessage(msg, duration = 3) {
        if (!message) return;
        message.warn(msg, duration);
    },
    showErrorMessage(msg, duration = 3) {
        if (!message) return;
        message.error(msg, duration);
    },
    showInfoMessage(msg, duration = 3) {
        if (!message) return;
        message.info(msg, duration);
    },
};

window.$utility = service;

export default service;

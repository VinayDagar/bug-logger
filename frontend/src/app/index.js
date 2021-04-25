import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Loader from "elements/loader";
import Pusher from "pusher-js";

import { store } from "store";
import { messageRecieved } from "store/auth/action";
import "services/api";
import "services/utilities";
import "services/secureStorage";
import "antd/dist/antd.css";

const loading = () => {
    return <Loader />;
};

const pusher = new Pusher('c14c78aa3b7268ae2a9c', {
    cluster: 'ap4',
    forceTLS: true
});

const messageChannel = pusher.subscribe("logger_message");
window.messageChannel = messageChannel;

messageChannel.bind("message:send", () => {
    messageRecieved()
})

const App = () => {
    return (
        <Router>
            <Provider store={store}>
                <React.Suspense fallback={loading()}>
                    <Routes />
                </React.Suspense>
            </Provider>
        </Router>
    );
};

export default App;

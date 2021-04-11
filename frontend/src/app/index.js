import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Loader from "elements/loader";

import { store } from "store";
import "services/api";
import "services/utilities";
import "services/secureStorage";
import "antd/dist/antd.css";

const loading = () => {
    return <Loader />;
};

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

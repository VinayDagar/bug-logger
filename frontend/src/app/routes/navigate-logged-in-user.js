import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { store } from 'store';

export default ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                ({ location }) => {
                    const currentState = store.getState();
                    if (currentState?.auth?.user?.role) {
                        return <Redirect
                            to={{
                                pathname: `${currentState.auth.user.role}/dashboard`,
                                state: { from: location }
                            }}
                        />;
                    }
                    return children;
                }
            }
        />
    );
};

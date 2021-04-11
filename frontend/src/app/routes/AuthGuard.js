import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { store } from 'store';

const isLoggedInWithValidRole = (role) => {
    let isLoggedInWithValidRole = false;
    const currentState = store.getState();

    if (
        currentState?.auth?.user?.role
        && role?.length
        && role.includes(currentState.auth.user.role)
        && localStorage.getItem('x-access-token')
    ) {
        isLoggedInWithValidRole = true;
    }
    return isLoggedInWithValidRole;
};


export default ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                ({ location }) =>
                    isLoggedInWithValidRole(rest.role) ? (
                        children
                    ) :
                        (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
            }
        />
    );
};

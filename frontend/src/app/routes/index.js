import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import NavigateLoggedInUser from "./navigate-logged-in-user";
import AuthGuard from "./AuthGuard";
import AdminRoutes from "./nav/AdminRoutes";
import UserRoutes from "./nav/UserRoutes";

// Importing Layout pages
const Admin = React.lazy(() => import("pages/admin"));
const User = React.lazy(() => import("pages/user"));
// Common Pages
const Login = React.lazy(() => import("pages/common/login"));
const Register = React.lazy(() => import("pages/common/register"));

const MainRouter = (props) => {

    const adminRedirectPath = ["/admin/", "/super_admin/", "/super_admin/dashboard"];

    return (
        <Switch>
            {/* Public Routes */}
            <NavigateLoggedInUser path="/login">
                <Route path="/login" component={Login} />
            </NavigateLoggedInUser>
            <NavigateLoggedInUser path="/register">
                <Route path="/register" component={Register} />
            </NavigateLoggedInUser>
            {/* <Route path="/register" component={Register} /> */}
            <Route exact path="/">
                <Redirect to="/login" />
            </Route>

            {
                adminRedirectPath.map(a => (
                    <Route exact path={a} key={a}>
                        <Redirect to="/admin/dashboard" />
                    </Route>
                ))
            }

            <AuthGuard role={["admin", "super_admin"]} path="/admin">
                <Route
                    path="/admin"
                    render={(props) => {
                        return (
                            <Admin {...props}>
                                {AdminRoutes.map((el) => (
                                    <Route path={el.url} key={el.url} component={el.component} />
                                ))}
                            </Admin>
                        );
                    }}
                />
            </AuthGuard>
            <AuthGuard role={["user"]} path="/user">
                <Route
                    path="/user"
                    render={(props) => {
                        return (
                            <User {...props}>
                                {UserRoutes.map((el) => (
                                    <Route path={el.url} key={el.url} component={el.component} />
                                ))}
                            </User>
                        );
                    }}
                />
            </AuthGuard>

            {/* Not Found Routes */}
            {/* <Route exact path="/404" component={NotFound} /> */}
            <Route exact path="*">
                <Redirect to="/404" />
            </Route>
            {/* Not Found Routes */}
        </Switch>
    );
};

export default withRouter(MainRouter);

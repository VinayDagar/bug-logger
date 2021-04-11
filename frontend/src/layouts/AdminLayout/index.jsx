import React from 'react';
import HeaderComponent from "./components/Header";
import SidebarComponent from "./components/Sidebar";
import { logout } from "store/auth/action";

import { connect } from "react-redux";
import "./AdminLayout.styles.scss";

const UserLayout = ({ children, user, logout }) => {
    return (
        <div className="admin-layout">
            <HeaderComponent user={user} logout={logout} />
            <div className="d-flex">
                <SidebarComponent />
                <div className="main">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLayout);

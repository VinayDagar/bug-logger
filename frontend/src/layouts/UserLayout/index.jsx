import React from 'react';
import HeaderComponent from "./components/Header";
import SidebarComponent from "./components/Sidebar";
import { logout } from "store/auth/action";

import { connect } from "react-redux";
import "./UserLayout.styles.scss"

const AdminLayout = ({ children, user, logout }) => {
    return (
        <div className="layout">
            <HeaderComponent user={user} logout={logout} />
            <SidebarComponent />
            {
                children
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);

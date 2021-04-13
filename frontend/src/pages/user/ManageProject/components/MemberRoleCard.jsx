import React, { useState } from 'react';
import { Menu, Dropdown } from "antd";

const MemberRoleCard = ({ name, isOwner, role, memberId, handleMemberEvent }) => {

    const getInitials = () => {
        let words = name.split(" ");
        return words.map(w => w.substring(0, 1)).join("");
    };

    const RoleCotainer = () => {
        if (role) return role;
        return <div> Add Role </div>;
    };

    const handleMenuClick = (e) => {
        handleMemberEvent(e.key, memberId);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="add_role">
                <span>
                    Add Role
                </span>
            </Menu.Item>
            <Menu.Item key={isOwner ? "remove_owner" : "set_owner"}>
                <span >
                    {
                        isOwner ? "Remove as Project Owner" : "Set as Project Owner"
                    }
                </span>
            </Menu.Item>
            <Menu.Item key="remove_from_project">
                <span className="text-danger">
                    Remove from Project
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomCenter" arrow trigger="click">
            <div className="baseCard">
                <div className="memberAvatarContainer">
                    <div className="memberAvatar"> {getInitials()} </div>
                </div>
                <div className="memberInfoContainer">
                    <div className="memberInfo">
                        <h6 className="infoHeading"> {name} </h6>
                    </div>
                    <span className="role">{isOwner ? "Project Owner" : RoleCotainer()}</span>
                </div>
            </div>
        </Dropdown>
    );
};

export default MemberRoleCard;

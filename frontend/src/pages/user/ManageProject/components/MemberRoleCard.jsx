import React from 'react';

const MemberRoleCard = ({ name, isOwner, role }) => {

    const getInitials = () => {
        let words = name.split(" ");
        return words.map(w => w.substring(0, 1)).join("");
    };

    const RoleCotainer = () => {
        if (role) return role;
        return <div> Add Role </div>;
    };

    return (
        <div className="baseCard">
            <div className="memberAvatarContainer">
                <div className="memberAvatar"> {getInitials()} </div>
            </div>
            <div className="memberInfoContainer">
                <div className="memberInfo">
                    <h6 className="infoHeading"> {name} </h6>
                </div>
                <span className="role">{isOwner ? "Owner" : RoleCotainer()}</span>
            </div>
        </div>
    );
};

export default MemberRoleCard;

import React, { useState, useEffect } from 'react';
import { Input, Select } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import MemberRoleCard from "./MemberRoleCard";
import MemberTimeline from "./MemberTimeline";
import CustomModal from "elements/CustomModal";
import { debounce } from "lodash";

const OverviewComponent = ({ projectId, projectDetail, getProjectData }) => {

    const [timelineContent, setTimelineContent] = useState([]);
    const [roleModalVisibility, setRoleModalVisibility] = useState(false);
    const [description, setDescription] = useState();
    const [roleInput, setRoleInput] = useState();
    const [selectedMember, setSelectedMember] = useState();
    const [userList, setUserList] = useState([]);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

    useEffect(() => {
        if (projectDetail) {
            setTimelineContent([
                ...projectDetail.ProjectMembers,
                { isCreated: true, name: projectDetail?.User?.name, createdAt: projectDetail.createdAt }
            ]);
            setDescription(projectDetail.description);
        }
    }, [projectDetail]);

    const handleDescriptionChange = (val) => {
        setDescription(val.target.value);

        setTimeout(() => {
            handleUpdateProjectDescription();
        }, 2000);
    };

    const debounceDescription = debounce(() => {
        handleUpdateProjectDescription();
    }, 2000);

    const handleUpdateProjectDescription = async () => {
        try {
            // await window.$http.updateById("project/update-description", projectId, {
            //     description
            // });
            console.log(description);
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handleRoleChange = (val) => {
        setRoleInput(val.target.value);
    };

    const handelAddRole = async () => {
        try {
            await window.$http.updateById("project/update-member-role", selectedMember.id, {
                role: roleInput
            });

            setRoleModalVisibility(false);
            setSelectedMember(null);
            getProjectData();
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handleMemberEvent = (target, memberId) => {
        const member = projectDetail.ProjectMembers.find(a => a.id == memberId);
        setSelectedMember(member);
        if (target === "add_role") {
            if (member.role) {
                setRoleInput(member.role);
            }
            setRoleModalVisibility(true);
        } else if (target === "remove_owner") {
            handleRemoveOwner(member.memberId);
        } else if (target === "set_owner") {
            handleSetOwner(member.memberId);
        } else if (target === "remove_from_project") {
            handleRemoveFromProject(member.memberId);
        }
    };

    const handleRemoveOwner = async (memberId) => {
        try {
            const { message } = await window.$http.updateById(`project/remove-member-ownership/${projectId}`, memberId);

            window.$utility.showSuccessMessage(message);
            getProjectData();
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handleSetOwner = async (memberId) => {
        try {
            const { message } = await window.$http.updateById(`project/set-member-ownership/${projectId}`, memberId);

            if (message) {
                window.$utility.showSuccessMessage(message);
            }
            getProjectData();
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handleRemoveFromProject = async (memberId) => {
        try {
            await window.$http.updateById(`project/remove-member-project/${projectId}`, memberId);

            getProjectData();
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handleShowAddProjectMemberModal = async () => {
        try {
            const { users } = await window.$http.get("common/get-user-list");
            setUserList(users.map(a => ({ label: `${a.email} - ${a.name[0]}`, value: a.id })));

            setShowAddMemberModal(true);

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handelUserSelect = async (userId) => {
        try {
            await window.$http.rawPost(`project/add-project-member/${projectId}`, {
                member: userId
            });

            setShowAddMemberModal(false);
            getProjectData();
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    return (
        <div className="projectPageSection">
            <div className="projectPageOverview">
                <div className="projectOverview-content">
                    <div className="pageOverview-mainContent">
                        <div className="projectOverviewSection-headingContainer">
                            <div className="projectOverviewSection-heading">
                                How we'll collaborate
                                </div>
                            <div className="descriptionContainer">
                                <div className="descriptionContainer-wrapper">
                                    <Input.TextArea
                                        placeholder="Welcome your team and set the tone for how you’ll work together in Asana. Add meeting details, communication channels, and other important information."
                                        onChange={handleDescriptionChange}
                                        value={description}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pageOverview-mainContent">
                        <div className="projectOverviewSection-headingContainer">
                            <div className="projectOverviewSection-heading">
                                Project Roles
                                </div>
                        </div>
                        <div className="memberSection-content">
                            <div className="memberSection-memberGrid" onClick={handleShowAddProjectMemberModal}>
                                <div className="addMemberCard">
                                    <div className="projectMemberAddButtonContainer">
                                        <PlusOutlined />
                                    </div>
                                    <div className="projectMemberAddTextContainer">
                                        <h6>Add Member</h6>
                                    </div>
                                </div>
                                {
                                    projectDetail?.ProjectMembers && projectDetail.ProjectMembers.map(a => (
                                        <React.Fragment key={a.id}>
                                            <MemberRoleCard
                                                key={a.id}
                                                name={a.name}
                                                isOwner={a.memberId === projectDetail.createdBy}
                                                role={a.role}
                                                memberId={a.id}
                                                handleMemberEvent={handleMemberEvent}
                                            />
                                            {
                                                selectedMember && roleModalVisibility &&
                                                <CustomModal
                                                    title={`What is ${selectedMember.name}'s role in this project?`}
                                                    showModal={roleModalVisibility}
                                                    onClose={() => { setRoleModalVisibility(false); setRoleInput(""); }}
                                                    closable={true}
                                                    destroyOnClose={true}
                                                >
                                                    <div className="roleInputCotainer">
                                                        <Input.TextArea
                                                            placeholder="Example: Approver, Contributer"
                                                            onChange={handleRoleChange}
                                                            value={roleInput}
                                                        />
                                                        <div className="btn btn-success" onClick={handelAddRole}> Done </div>
                                                    </div>
                                                </CustomModal>
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="activityFeed">
                    <div className="timelineContainer">
                        <div className="reportSection">
                            <div className="reportSection-heading">
                                <h4 className="heading"> What's the status? </h4>
                            </div>
                            <div className="reportSection-stopLightContainer">
                                <div className="stopLightButtonContainer">
                                    <div className="statusContainer">
                                        <div className="greenbadge statusBox"></div>
                                        <span className="statusText"> On Track </span>
                                    </div>
                                </div>
                                <div className="stopLightButtonContainer">
                                    <div className="statusContainer">
                                        <div className="yellowbadge statusBox"></div>
                                        <span className="statusText"> At Risk </span>
                                    </div>
                                </div>
                                <div className="stopLightButtonContainer">
                                    <div className="statusContainer">
                                        <div className="redbadge statusBox"></div>
                                        <span className="statusText"> Off Track </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            timelineContent.length && timelineContent.map(a => (
                                <MemberTimeline key={a.id} name={a.name} date={a.createdAt} isCreated={a.isCreated} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <CustomModal
                title="Add member to the project"
                showModal={showAddMemberModal}
                onClose={() => setShowAddMemberModal(false)}
                closable={true}
                destroyOnClose={true}
            >
                <div className="roleInputCotainer">
                    <Select
                        style={{ width: "100%" }}
                        placeholder="Select user to add as a team member"
                        showSearch={true}
                        onChange={handelUserSelect}
                    >
                        {userList.map((el) => (
                            <Select.Option
                                key={el.value}
                                value={el.value}
                            >
                                {el.label}
                            </Select.Option>
                        ))}
                    </Select>
                    <div className="btn btn-success" onClick={handelAddRole}> Done </div>
                </div>
            </CustomModal>
        </div>
    );
};

export default OverviewComponent;

import React, { useEffect, useState } from 'react';
import { Input } from "antd";
import MemberRoleCard from "./components/MemberRoleCard";
import MemberTimeline from "./components/MemberTimeline";

const ManageProject = (props) => {

    const [projectDetail, setProjectDetail] = useState();
    const [timelineContent, setTimelineContent] = useState([]);
    const [projectId, setProjectId] = useState(props?.match?.params?.projectId);
    const [description, setDescription] = useState();

    useEffect(() => {
        getProjectData();
    }, [projectId]);


    const getProjectData = async () => {
        try {
            const project = await window.$http.getById("project/details", projectId);

            setProjectDetail(project);
            setTimelineContent([
                ...project.ProjectMembers,
                { isCreated: true, name: project.User.name, createdAt: project.createdAt }
            ]);
            setDescription(project.description);

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handleDescriptionChange = (val) => {
        setDescription(val.target.value);
    };

    return (
        <>
            <div className="projectMain">
                <div className="projectTopBar">
                    <div className="projectTitleContainer">
                        <div className="projectTitle">
                            <h1 className="title"> {projectDetail?.projectName || "Project Name"} </h1>
                        </div>
                    </div>
                </div>
            </div>
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
                                <div className="memberSection-memberGrid">
                                    {
                                        projectDetail?.ProjectMembers && projectDetail.ProjectMembers.map(a => (
                                            <MemberRoleCard key={a.id} name={a.name} isOwner={a.memberId === projectDetail.createdBy} />
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
            </div>
        </>
    );
};

export default ManageProject;

import React, { useState, useEffect } from 'react';
import ProjectViewCard from "./components/ProjectViewCard";

const User = (props) => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        if (!projectList.length) {
            getProjects();
        }
    }, [projectList]);

    const getProjects = async () => {
        try {
            const { projects } = await window.$http.get("project/list");
            
            setProjectList(projects);

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const projectMemberList = (memberList) => {
        return memberList.map(m => {
            let words = m.name.split(" ");
            return words.map(w => w.substring(0, 1)).join("");
        });
    };

    const handleProjectClick = (projectId) => {
        props.history.push(`/user/manage-project/${projectId}`);
    };

    return (
        <div className="container">
            <div className="taskHubSection">
                <div className="taskHubHeader">
                    <div className="taskSectionTitle">
                        <h5 className="taskHubTitle"> Task Due Soon </h5>
                    </div>
                    <div className="taskSectionRight">
                        <div className="taskSectionRightLink"> See all my tasks </div>
                    </div>
                </div>
            </div>

            <div className="taskHubSection">
                <div className="taskHubHeader">
                    <div className="taskSectionTitle">
                        <h5 className="taskHubTitle"> Recent Projects </h5>
                    </div>
                </div>
                <div className="projectHubList">
                    <div className="projectList">
                        {
                            projectList.map(a => (
                                <div key={a.id} className="projectViewcardContainer" onClick={() => handleProjectClick(a.Project.id)}>
                                    <ProjectViewCard
                                        projectName={a?.Project?.projectName}
                                        memberList={projectMemberList(a?.Project.ProjectMembers)}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
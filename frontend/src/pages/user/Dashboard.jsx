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

    return (
        <div className="container">
            <div className="projectList">
                {
                    projectList.map(a => (
                        <ProjectViewCard
                            key={a.id}
                            projectName={a?.Project?.projectName}
                            memberList={projectMemberList(a?.Project.ProjectMembers)}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default User;
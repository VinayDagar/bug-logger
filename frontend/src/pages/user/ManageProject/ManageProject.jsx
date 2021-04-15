import React, { useEffect, useState } from 'react';
import OverviewComponent from "./components/OverviewComponent";
import ListComponent from "./components/ListComponent";

const tabData = [
    {
        title: "Overview",
        component: "OverView"
    },
    {
        title: "List",
        component: "List"
    },
];

const ManageProject = (props) => {
    const [selectedTab, setSelectedTab] = useState(tabData[0].component);
    const [projectId, setProjectId] = useState(props?.match?.params?.projectId);
    const [projectDetail, setProjectDetail] = useState();

    useEffect(() => {
        getProjectData();
    }, [projectId]);

    const handleTabSelecct = (tab) => {
        setSelectedTab(tab);
    };

    const getProjectData = async () => {
        try {
            const project = await window.$http.getById("project/details", projectId);

            setProjectDetail(project);

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    return (
        <>
            {/* <Helmet>
            <title> {projectDetail?.projectName || '-' } - Logger </title>
        </Helmet> */}

            <div className="projectMain">
                <div className="projectTopBar">
                    <div className="projectTitleContainer">
                        <div className="projectTitle">
                            <h1 className="title"> {projectDetail?.projectName || "Project Name"} </h1>
                        </div>
                        <div className="projectNavbar">
                            <ul className="tabbarList">
                                {
                                    tabData.map(a => (
                                        <li
                                            key={a.component}
                                            className={`tab ${selectedTab === a.component ? "tab-selected" : ""}`}
                                            onClick={() => handleTabSelecct(a.component)}
                                        >
                                            <span> {a.title} </span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {
                selectedTab == "OverView" ?
                    <OverviewComponent
                        projectId={projectId}
                        projectDetail={projectDetail}
                        getProjectData={() => getProjectData()}
                    /> : <ListComponent projectId={projectId} />
            }

        </>
    );
};

export default ManageProject;

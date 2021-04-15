import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import AssignMember from "./AssignMember";

const { Panel } = Collapse;

const ListComponent = ({ projectId }) => {

    const [list, setList] = useState();
    const [showMemberDropdown, setShowMemberDropdown] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState();

    useEffect(() => {
        if (!list) {
            getTaskData();
        }
    }, [list]);

    const getTaskData = async () => {
        try {
            const { sections } = await window.$http.getById("project/section-task-list", projectId);
            setList(sections);
        } catch (err) {
            console.log(err);
        }
    };

    const getExtraPanel = (data) => {
        return (
            <div className="panelContainer">
                <div className="statusContainer">
                    Status: <span className={`status ${data.status === "pending" ? "text-warning" : "text-success"}`}> {data.status} </span>
                </div>
                <div className="priorityContainer">
                    Priority: <span className={`priority ${getProrityClass(data.priority)}`}> {data.priority} </span>
                </div>
            </div>
        );
    };

    const getProrityClass = (p) => {
        if (p === "medium") {
            return "text-primary";
        } else if (p === "low") {
            return "text-success";
        } else {
            return "text-danger";
        }
    };

    const handelShowTeamMember = (taskId) => {
        setSelectedTaskId(taskId);
        setShowMemberDropdown(true);
    };

    return (
        <div>
            {
                list?.length && list.map(a => (
                    <Collapse>
                        <Panel header={a.name} key={a.id}>
                            <Collapse defaultActiveKey={list[0].id}>
                                {
                                    a.Tasks.map(t => (
                                        <Panel header={t.title} key={t.id} extra={getExtraPanel(t)}>
                                            <p>{t.description}</p>
                                            <div className="assigneContainer">
                                                <div className="assigneLeft">
                                                    <label className="assigneLabel"> Assignee </label>
                                                </div>
                                                <div className="assigneRight">
                                                    <div className="assigneButton" onClick={() => handelShowTeamMember(t.id)}>
                                                        <div className="assigneIconContainer">
                                                            <UserOutlined />
                                                        </div>
                                                        <div> {!t.assignedTo ? "No Assigne" : t?.ProjectMember?.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Panel>
                                    ))
                                }
                            </Collapse>
                        </Panel>
                    </Collapse>

                ))
            }
            <AssignMember
                projectId={projectId}
                taskId={selectedTaskId}
                title="Assign task to team members"
                visible={showMemberDropdown}
                onModalClose={() => {setShowMemberDropdown(false); getTaskData()}}
            />
        </div>
    );
};

export default ListComponent;

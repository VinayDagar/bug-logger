import React, { useEffect, useState } from 'react';
import { UserOutlined } from "@ant-design/icons";
import { Collapse, Select } from 'antd';

const { Panel } = Collapse;

const statusList = [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
];

const ManageTask = () => {

    const [list, setList] = useState();

    useEffect(() => {
        if (!list) {
            getTaskData();
        }
    }, [list]);

    const getTaskData = async () => {
        try {
            const { taskList } = await window.$http.get("project/my-task");
            setList(taskList);
        } catch (err) {
            console.log(err);
        }
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

    const getExtraPanel = (data) => {
        return (
            <div className="d-flex flex-row justify-content-center align-items-center">
                <div className="taskListProjectName mx-3">
                    {data?.Section?.Project?.projectName}
                </div>
                <div className="panelContainer">
                    <div className="statusContainer">
                        Status: <span className={`status ${data.status === "pending" ? "text-warning" : "text-success"}`}> {data.status} </span>
                    </div>
                    <div className="priorityContainer">
                        Priority: <span className={`priority ${getProrityClass(data.priority)}`}> {data.priority} </span>
                    </div>
                </div>
            </div>
        );
    };

    const handleStatusChange = async (status, taskId) => {
        try {
            await window.$http.updateById("project/update-task-status", taskId, { status });

            getTaskData();
        } catch (err) {

        }
    };

    return (
        <>
            <div className="projectMain">
                <div className="projectTopBar">
                    <div className="projectTitleContainer">
                        <div className="projectTitle">
                            <h1 className="title"> My Tasks </h1>
                        </div>
                        <div className="projectNavbar">
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    {
                        list?.length && list.map(a => (
                            <Collapse key={a.id} >
                                <Panel header={a.title} extra={getExtraPanel(a)}>
                                    <Collapse>
                                        <div className="p-4">
                                            <p>{a.description}</p>
                                            <div className="d-flex justify-content-between">
                                                <div className="assigneContainer">
                                                    <div className="assigneLeft">
                                                        <label className="assigneLabel"> Section </label>
                                                    </div>
                                                    <div className="assigneRight">
                                                        <h6> {a?.Section?.name} </h6>
                                                    </div>
                                                </div>
                                                <div style={{ width: "250px" }} className="taskStatusContainer">
                                                    <Select
                                                        style={{ width: "100%" }}
                                                        placeholder={`Current Status ${a.status}`}
                                                        showSearch={false}
                                                        onChange={(e) => handleStatusChange(e, a.id)}
                                                        defaultValue={a.status}
                                                    >
                                                        {statusList.map((el) => (
                                                            <Select.Option
                                                                key={el.value}
                                                                value={el.value}
                                                            >
                                                                {el.label}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </Panel>
                            </Collapse>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default ManageTask;

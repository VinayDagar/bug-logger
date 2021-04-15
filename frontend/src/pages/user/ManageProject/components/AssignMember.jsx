import React, { useState, useEffect } from 'react';
import CustomModal from "elements/CustomModal";
import { Button, Select } from "antd";

const AssignMember = ({ title, visible, onModalClose, projectId, taskId }) => {

    const [projectMemberList, setProjectMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState();

    useEffect(() => {
        getData();
    }, [projectId]);

    const getData = async () => {
        try {
            const { projectMembers } = await window.$http.getById("project/get-member-list", projectId);

            setProjectMembers(projectMembers.map(a => ({ label: a.name, value: a.id })));

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handelMemberChange = (e) => {
        setSelectedMember(e);
    };

    const handelAssignMember = async () => {
        try {
            await window.$http.updateById(`project/assign-task/${projectId}/${taskId}`, selectedMember);
            onModalClose()
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    return (
        <CustomModal
            title={title}
            centered
            showModal={visible}
            onClose={onModalClose}
            destroyOnClose={true}
        >
            <div>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Select team member"
                    showSearch={true}
                    onChange={handelMemberChange}
                >
                    {projectMemberList.map((el) => (
                        <Select.Option
                            key={el.value}
                            value={el.value}
                        >
                            {el.label}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="my-4">
                <Button onClick={handelAssignMember}> Assign </Button>
            </div>
        </CustomModal>
    );
};

export default AssignMember;

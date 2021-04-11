import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

import CustomModal from 'elements/CustomModal';
import { Button, Select } from "antd";
import { CloseCircleOutlined } from '@ant-design/icons';

const MachineConsumables = (props) => {

    const [showChange, setShowChange] = useState(false);
    const [consumableIds, setConsumableIds] = useState([]);
    const [consumableList, setConsumableList] = useState([]);

    useEffect(() => {
        if (showChange) {
            getConsumablesList();
        }
    }, [showChange]);

    const handleConsumableChange = (e) => {
        setConsumableIds(e);
    };

    const handleUpdateConsumable = () => {
        setShowChange(false);
        props.updateConsumables(consumableIds);
    };

    const ChangeConsumable = () => {
        return (
            <>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Select Consumable"
                    showSearch={true}
                    mode="multiple"
                    onChange={handleConsumableChange}
                >
                    {consumableList.map((el) => (
                        <Select.Option
                            key={el.value}
                            value={el.value}
                        >
                            {el.label}
                        </Select.Option>
                    ))}
                </Select>
                <div className="my-2">
                    <Button onClick={handleUpdateConsumable}> Update </Button>
                </div>
            </>
        );
    };

    const getConsumablesList = async () => {
        try {
            const result = await window.$http.getById("machine/consumable-list", props.productId);
            setConsumableList(result.map(a => ({ value: a.id, label: a.name })));

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    return (
        <CustomModal
            title={props.machineName}
            centered
            showModal={props.visible}
            width={props.width}
            onClose={props.onClose}
            destroyOnClose={true}
        >
            <div className="my-2">
                {
                    props.items?.length ? props.items
                        .map(a => (
                            <>
                                <div key={a.value} className="consumableTag mx-1">
                                    {a.label}
                                    <div className="tag-icon ml-4" onClick={() => props.disableConsumable(a.value)}>
                                        <CloseCircleOutlined />
                                    </div>
                                </div>
                            </>
                        )) : "Consumabels not found!"
                }
            </div>
            <div className="d-flex justify-content-around align-items-center mt-3">
                <Button type="danger" onClick={props.showConsumableChange} title="Change Consumables" >
                    Change Consumable
                </Button>
                <Button type="primary" onClick={props.showConsumableCycleChange} title="Change Consumables" >
                    Change Consumable Cycle
                </Button>
            </div>
            <div className="d-flex justify-content-around align-items-center mt-3">
                <Button onClick={props.showConsumableMessageChange} title="Change Consumables Message" >
                    Change Consumable Message
                </Button>
            </div>
        </CustomModal>
    );
};


MachineConsumables.propTypes = {
    visible: PropTypes.bool,
    items: PropTypes.array,
    machineName: PropTypes.string,
    onClose: PropTypes.func,
    width: PropTypes.number,
};

export default MachineConsumables;

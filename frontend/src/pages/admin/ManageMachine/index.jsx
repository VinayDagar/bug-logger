import React, { useState, useEffect } from 'react';
import DataTable from "elements/DataTable";
import ManageMachine from "./components/ManageMachine";
import ChangeConsumableCycle from "./components/ChangeConsumableCycle";
import ChangeConsumable from "./components/ChangeConsumable";
import MachineConsumables from "./components/MachineConsumables";
import { Button, Tooltip } from 'antd';
import { SlidersOutlined, RetweetOutlined, PartitionOutlined } from '@ant-design/icons';

import "./Machine.styles.scss";

const MachineList = (props) => {
    const [items, setItems] = useState([]);
    const [consumableList, setConsumableList] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState();
    const [mstData, setMstData] = useState();
    const [showConsumables, setShowConsumables] = useState(false);
    const [showConsumableChange, setShowConsumablesChange] = useState(false);
    const [showConsumableMessage, setShowConsumablesMessage] = useState(false);
    const [showConsumableCycleChange, setShowConsumablesCycleChange] = useState(false);
    const [count, setCounts] = useState(0);
    const [selectedMachineName, setSelectedMachineName] = useState();
    const [selectedMachineProductId, setSelectedMachineProductId] = useState();
    const [selectedMachineId, setSelectedMachineId] = useState();
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [modalVisibility, setModalVisibility] = useState(false);
    const [pagination, setPagination] = useState({ current: 0, limit: 10 });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'left',
            width: 200,
            sorter: false,
        },
        {
            title: 'Client',
            dataIndex: 'Client',
            key: 'name',
            align: 'left',
            width: 200,
            sorter: false,
            render: (text) => text?.User?.name || '-'
        },
        {
            title: 'Equipment',
            dataIndex: 'MstEquipmentType',
            key: 'name',
            align: 'left',
            sorter: false,
            render: (text) => text.name || "-"
        },
        {
            title: 'Product',
            dataIndex: 'Product',
            key: 'name',
            align: 'left',
            sorter: false,
            render: (text) => text.name || "-"
        },
        {
            title: 'Model',
            dataIndex: 'ProductModel',
            key: 'name',
            align: 'left',
            sorter: false,
            render: (text) => text.name || "-"
        },
        // {
        //     title: 'Consumables',
        //     dataIndex: 'MachineConsumables',
        //     key: 'name',
        //     align: 'left',
        //     sorter: false,
        //     render: (text) => text?.MachineConsumables?.length ? text?.MachineConsumables.map(a => a.name) : '-'
        // },
    ];

    useEffect(() => {
        setLoading(true);
        getData();
    }, [pagination]);

    useEffect(() => {
        if (!mstData) {
            getMasterData();
        }
    }, [mstData]);

    const getData = async () => {
        try {
            const { data } = await window.$http.get("machine/find-and-count-machines");

            setItems(data.rows);
            setCounts(data.count);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            window.$utility.showErrorMessage(err.message);
        }
    };

    const getMasterData = async () => {
        try {
            let [
                { equipment, product, productModel, mstManufacturer },
                clients
            ] = await Promise.all([
                window.$http.get("machine/equipment-list"),
                window.$http.get("client/list"),
            ]);
            clients = clients.data;

            setMstData({
                equipments: equipment.map(a => ({ label: a.name, value: a.id })),
                manufacturer: mstManufacturer.map(a => ({ label: a.name, value: a.id })),
                product: product.map(a => ({ label: a.name, value: a.id })),
                productModel: productModel.map(a => ({ label: a.name, value: a.id })),
                clients: clients.map(a => ({ label: a.name, value: a.id }))
            });

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const createOrUpdateMachine = async (machine) => {
        try {
            if (machine.id) {
                // for (const equipment of modalData.MachineEquipments) {
                //     await window.$http.delete("machine/delete-machine-equipment", equipment.id);
                // }

                // await window.$http.rawPost("machine/add-machine-equipments", {
                //     equipmentIds: machine.machineEquipments,
                //     machineId: machine.id
                // });

                await window.$http.updateById("machine/update", machine.id, {
                    name: machine.name,
                    clientId: machine.clientId,
                    productId: machine.productId,
                    equipmentId: machine.equipmentId,
                    manufacturerId: machine.manufacturerId,
                    modelId: machine.productModelId,
                    serialNumber: machine.serialNumber,
                });
            } else {
                const { machine: machineData } = await window.$http.rawPost("machine/create-machine", {
                    name: machine.name,
                    clientId: machine.clientId,
                    productId: machine.productId,
                    equipmentId: machine.equipmentId,
                    manufacturerId: machine.manufacturerId,
                    modelId: machine.productModelId,
                    serialNumber: machine.serialNumber,
                });

                // await window.$http.rawPost("machine/add-machine-equipments", {
                //     equipmentIds: machine.machineEquipments,
                //     machineId: machineData.id
                // });
            }

            window.$utility.showSuccessMessage("machine successfully added!");
            getData();
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handlePaginationChange = (pagination, filters, sorter, extra) => {
        setPagination({
            current: pagination.current,
            limit: pagination.pageSize,
            skip: (pagination.current - 1) * pagination.pageSize
        });
    };

    const onClose = (data) => {
        if (data) {
            createOrUpdateMachine(data);
        }
        setModalVisibility(false);
    };

    const handleUpdateConsumables = async (consumableIds) => {
        try {
            await window.$http.rawPost(`machine/update-machine-consumable/${selectedMachineId}`, {
                consumableIds
            });
            setShowConsumables(false);
            setSelectedMachineName(null);
            setSelectedMachineProductId(null);
            setSelectedMachineId(null);

            await getData();
            window.$utility.showSuccessMessage("Consumable successfully updated!");

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const manageModal = (data) => {
        if (data) {
            setModalData({
                ...data,
                clientId: data.Client.id,
                equipmentId: data.MstEquipmentType.id,
                manufacturerId: data.MstManufacturer.id,
                productId: data.Product.id,
                productModelId: data.ProductModel.id,
                serialNumber: data.serialNumber,
                mode: "edit"
            });
        }
        setModalVisibility(true);
    };

    const handleShowConsumable = (data) => {
        if (data) {
            setSelectedMachineName(data.name);
            setSelectedMachineProductId(data.Product?.id);
            setSelectedMachineId(data.id);
            setSelectedMachine(data);
            if (data.MachineConsumables?.length) {
                setConsumableList(data.MachineConsumables.map(c => ({ label: c.Consumable?.name, value: c.id })));
            } else {
                setConsumableList([]);
            }
        }
        setShowConsumables(true);
    };

    const handleConsumableCycleChange = () => {
        setShowConsumables(false);
        setShowConsumablesChange(false);
        setShowConsumablesCycleChange(true);
    };

    const handleConsumableMessageChange = () => {
        setShowConsumables(false);
        setShowConsumablesChange(false);
        setShowConsumablesCycleChange(false);
        props.history.push("/admin/manage-consumable-message");
        // setShowConsumablesMessage(true);
    };

    const handleConsumableChange = () => {
        setShowConsumables(false);
        setShowConsumablesCycleChange(false);
        setShowConsumablesChange(true);
    };

    const handleDisableConsumable = async (machineComsumableId) => {
        try {
            await window.$http.updateById("consumable/disable-machine-consumable", machineComsumableId);

            setShowConsumables(false);
            setShowConsumablesChange(false);
            setShowConsumablesCycleChange(false);

            window.$utility.showSuccessMessage("Consumable successfully disabled!");
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const updateConsumableChange = async (data) => {
        try {
            data.clientId = selectedMachine?.Client?.id;
            await window.$http.rawPost(`machine/${selectedMachine.id}/update-consumable`, data);

            setShowConsumablesChange(false);
            window.$utility.showSuccessMessage("Consumable changed successfully");
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const updateConsumableCycleChange = async (data) => {
        try {
            data.clientId = selectedMachine?.Client?.id;
            await window.$http.put(`machine/${selectedMachine.id}/update-client-consumable`, data);

            setShowConsumablesChange(false);
            window.$utility.showSuccessMessage("Consumable changed successfully");
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const goToConsumableHistory = (data) => {
        props.history.push(`/admin/${data?.Client?.id}/consumable-history/${data.id}`);
    };

    const CustomAction = data => (
        <>
            <Tooltip title="Consumable History">
                <Button type="link" shape="circle" icon={<RetweetOutlined />} onClick={() => goToConsumableHistory(data)} />
            </Tooltip>
            <Tooltip title="View Consumables">
                <Button type="link" shape="circle" icon={<SlidersOutlined />} onClick={() => handleShowConsumable(data)} />
            </Tooltip>
            {/* <Tooltip title="Update Consumable Cycle">
                <Button type="link" shape="circle" icon={<PartitionOutlined />} onClick={() => handleConsumableChange(data)} />
            </Tooltip> */}
        </>
    );

    return (
        <div>
            <DataTable
                data={items}
                totalRecords={count}
                title="Machine List"
                columns={columns}
                loading={loading}
                createOrUpdateAction={manageModal}
                onChange={handlePaginationChange}
                customActions={CustomAction}
            />
            <ManageMachine
                visible={modalVisibility}
                onClose={onClose}
                data={modalData}
                mstData={mstData}
            />
            <MachineConsumables
                visible={showConsumables}
                onClose={() => setShowConsumables(false)}
                items={consumableList}
                machineName={selectedMachineName}
                productId={selectedMachineProductId}
                disableConsumable={handleDisableConsumable}
                updateConsumables={handleUpdateConsumables}
                showConsumableChange={handleConsumableChange}
                showConsumableCycleChange={handleConsumableCycleChange}
                showConsumableMessageChange={handleConsumableMessageChange}
            />
            <ChangeConsumableCycle
                visible={showConsumableCycleChange}
                onClose={() => setShowConsumablesCycleChange(false)}
                machine={selectedMachine}
                changeConsumable={updateConsumableCycleChange}
            />
            <ChangeConsumable
                visible={showConsumableChange}
                onClose={() => setShowConsumablesChange(false)}
                machine={selectedMachine}
                changeConsumable={updateConsumableChange}
            />
        </div>
    );
};

export default MachineList;

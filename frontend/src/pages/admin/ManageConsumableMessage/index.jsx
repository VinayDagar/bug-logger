import React, { useState, useEffect } from 'react';
import DataTable from "elements/DataTable";
import ManageConsumableMessage from "./components/ManageConsumableMessage";

import { capitalize } from "underscore.string";

const ManageConsumableMessageList = () => {
    const [items, setItems] = useState([]);
    const [count, setCounts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [pagination, setPagination] = useState({ current: 0, limit: 10 });

    const columns = [
        {
            title: 'Consumable Name',
            dataIndex: 'MachineConsumable',
            key: 'name',
            align: 'center',
            width: 180,
            sorter: false,
            render: (text) => text.name || "-"
        },
        {
            title: 'Client',
            dataIndex: 'MachineConsumable',
            key: 'Client',
            align: 'left',
            width: 120,
            sorter: false,
            render: (text) => capitalize(text?.Machine?.Client?.name) || "-"
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            align: 'left',
            sorter: false,
            width: 400
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            sorter: false,
            render: (text) => capitalize(text),
        },
        {
            title: 'Show On',
            // dataIndex: 'Client',
            // key: 'address',
            align: 'left',
            sorter: false,
            render: (text) => RenderShowOn(text)
        },
    ];

    useEffect(() => {
        setLoading(true);
        getData();
    }, [pagination]);

    const handlePaginationChange = (pagination, filters, sorter, extra) => {
        setPagination({
            current: pagination.current,
            limit: pagination.pageSize,
            skip: (pagination.current - 1) * pagination.pageSize
        });
    };

    const getData = async () => {
        try {
            const { data } = await window.$http.get("consumable/find-and-count-client-consumable-message");

            setItems(data.rows);
            setCounts(data.count);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            window.$utility.showErrorMessage(err.message);
        }
    };

    const RenderShowOn = (data) => {
        if (data.type === "cycle") {
            return `After ${data.showOn} cycles.`;
        }
        return `After ${data.showOn} months`;
    };

    const handleChangeConsumableMessage = async (data) => {
        try {
            const result = await window.$http.updateById("consumable/update-consumable-message", data.id, {
                message: data.message,
                showOn: data.showOn
            });

            setModalVisibility(false);
            setModalData({});

            window.$utility.showSuccessMessage("Consumable message successfullly updated!");
            getData();

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
        console.log({ data });
    };

    const manageModal = (data) => {
        if (data) {
            setModalData(data);
        }
        setModalVisibility(true);
    };

    return (
        <div>
            <DataTable
                data={items}
                totalRecords={count}
                title="Consumable Message List"
                columns={columns}
                loading={loading}
                createOrUpdateAction={manageModal}
                onChange={handlePaginationChange}
            />
            <ManageConsumableMessage
                visible={modalVisibility}
                data={modalData}
                onClose={handleChangeConsumableMessage}
                onModalClose={() => { setModalData({}); setModalVisibility(false); }}
            />
        </div>
    );
};

export default ManageConsumableMessageList;

import React, { useState, useEffect } from 'react';

import DataTable from "elements/DataTable";
import ManageConsumableMessage from "./components/ManageConsumableMessage";

const ConsumableMessageList = () => {
    const [items, setItems] = useState([]);
    const [count, setCounts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [mstData, setMstData] = useState();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [pagination, setPagination] = useState({ current: 0, limit: 10 });

    const columns = [
        {
            title: 'Consumable Name',
            dataIndex: 'Consumable',
            key: 'name',
            align: 'left',
            width: 200,
            sorter: false,
            render: (text) => text.name || '-',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            align: 'left',
            width: 200,
            sorter: false,
            render: (text) => text || '-',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            width: 200,
            sorter: false,
            render: (text) => `Message of ${text}` || '-',
        },
    ];

    useEffect(() => {
        if (!mstData) {
            getMstData();
        }
    }, [mstData]);

    useEffect(() => {
        setLoading(true);
        getData();
    }, [pagination]);

    const createOrUpdateConsumableMessage = async (consumable) => {
        try {
            let message = "message successfully added!";
            if (consumable.id) {
                await window.$http.updateById("consumable/add-consumable-message", consumable.id, consumable);
                message = "consumable successfully updated!";
            } else {
                await window.$http.rawPost(`consumable/add-consumable-message/${consumable.consumableId}`, {
                    type: consumable.type,
                    message: consumable.message,
                    showOn: consumable.showOn,
                });
            }

            window.$utility.showSuccessMessage(message);
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

    const getData = async () => {
        try {
            const { data } = await window.$http.get("consumable/find-and-count-consumable-message");

            setItems(data.rows);
            setCounts(data.count);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            window.$utility.showErrorMessage(err.message);
        }
    };

    const getMstData = async () => {
        try {
            const { consumables } = await window.$http.get("consumable/list");

            setMstData({
                consumables: consumables.map(a => ({ label: `${a.name} - ( Validity ${a.validity} | Cycle ${a.cycle} )`, value: a.id })),
            });

        } catch (err) {
            setLoading(false);
            window.$utility.showErrorMessage(err.message);
        }
    };

    const onClose = (data) => {
        if (data) {
            createOrUpdateConsumableMessage(data);
        }
        setModalVisibility(false);
    };

    const manageModal = (data = null) => {
        if (data) {
            setModalData({
                message: data.message,
                type: data.type,
                consumableId: data.Consumable.id,
                id: data.id,
                mode: "edit"
            });
        }
        setModalVisibility(true);
    };

    return (
        <div>
            <DataTable
                data={items}
                totalRecords={count}
                title="Escalation List"
                columns={columns}
                loading={loading}
                createOrUpdateAction={manageModal}
                onChange={handlePaginationChange}
            />
            <ManageConsumableMessage
                visible={modalVisibility}
                onClose={onClose}
                mstData={mstData}
                data={modalData}
                onModalClose={() => { setModalVisibility(false); setModalData({}); }}
            />
        </div>
    );
};

export default ConsumableMessageList;

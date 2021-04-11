import React, { useState, useEffect } from 'react';
import DataTable from "elements/DataTable";
import ManaegClient from "./components/ManageClient";
import { capitalize } from "underscore.string";

const ClientList = (props) => {
    const [items, setItems] = useState([]);
    const [count, setCounts] = useState(0);
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
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            align: 'left',
            width: 200,
            sorter: false,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'left',
            sorter: false,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            align: 'left',
            sorter: false,
            render: (text) => capitalize(text),
        },
        {
            title: 'Address',
            dataIndex: 'Client',
            key: 'address',
            align: 'left',
            sorter: false,
            render: (text) => text?.address || '-'
        },
    ];

    useEffect(() => {
        setLoading(true);
        getData();
    }, [pagination]);

    const createOrUpdateClient = async (client) => {
        try {
            let message = "client successfully added!";
            if (client.id) {
                await window.$http.updateById("common/update-user", client.id, client);
                message = "client successfully updated!";
            } else {
                await window.$http.rawPost(`common/register/${client.role}`, client);
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
            const { data } = await window.$http.get("common/find-and-count-users");

            setItems(data.rows);
            setCounts(data.count);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            window.$utility.showErrorMessage(err.message);
        }
    };

    const onClose = (data) => {
        if (data) {
            createOrUpdateClient(data);
        }
        setModalVisibility(false);
    };

    const manageModal = (data = null) => {
        if (data) {
            setModalData({
                name: data.name,
                phone: data.phone,
                email: data.email,
                role: data.role,
                address: data?.Client?.address || "",
                clientId: data?.Client?.id,
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
                title="Client List"
                columns={columns}
                loading={loading}
                createOrUpdateAction={manageModal}
                onChange={handlePaginationChange}
            />
            <ManaegClient
                visible={modalVisibility}
                onClose={onClose}
                data={modalData}
                onModalClose={() => { setModalVisibility(false); setModalData({}); }}
            />
        </div>
    );
};

export default ClientList;

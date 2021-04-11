import React, { useState, useEffect } from 'react';
import DataTable from "elements/DataTable";
import ManageEscalation from "./components/ManageEscalation";

const Escalation = (props) => {
    const [items, setItems] = useState([]);
    const [count, setCounts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [mstData, setMstData] = useState();
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
            render: (text) => text || '-',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            align: 'left',
            width: 200,
            sorter: false,
            render: (text) => text || '-',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'left',
            sorter: false,
            render: (text) => text || '-',
        },
        {
            title: 'Machine',
            dataIndex: 'Machine',
            key: 'name',
            align: 'left',
            sorter: false,
            render: (text) => text.name || '-',
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

    const createOrUpdateEscalation = async (escalation) => {
        try {
            let message = "escalation successfully added!";
            if (escalation.id) {
                await window.$http.updateById("machine/update-escalation", escalation.id, escalation);
                message = "escalation successfully updated!";
            } else {
                await window.$http.rawPost("machine/create-escalation", escalation);
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
            const { data } = await window.$http.get("machine/find-and-count-escalation");

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
            const { machine } = await window.$http.get("machine/list");

            const { mstLabel } = await window.$http.get("machine/mst-labels");

            setMstData({
                machines: machine.map(a => ({ label: a.name, value: a.id })),
                mstLabels: mstLabel.map(a => ({ label: a.level, value: a.id })),
            });

        } catch (err) {
            setLoading(false);
            window.$utility.showErrorMessage(err.message);
        }
    };

    const onClose = (data) => {
        if (data) {
            createOrUpdateEscalation(data);
        }
        setModalVisibility(false);
    };

    const manageModal = (data = null) => {
        if (data) {
            setModalData({
                name: data.name,
                phone: data.phone,
                email: data.email,
                machneId: data.Machine.id,
                labelId: data.MstLabel?.id,
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
            <ManageEscalation
                visible={modalVisibility}
                onClose={onClose}
                mstData={mstData}
                data={modalData}
                onModalClose={() => { setModalVisibility(false); setModalData({}); }}
            />
        </div>
    );
};

export default Escalation;

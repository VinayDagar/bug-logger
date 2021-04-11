import React, { useState, useEffect } from 'react';
import DataTable from "elements/DataTable";
import moment from "moment";

const ConsumableHistory = (props) => {
    const [machineId] = useState(props.match?.params?.machineId);
    const [clientId] = useState(props.match?.params?.clientId);
    const [items, setItems] = useState([]);
    const [count, setCounts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 0, limit: 10 });

    const columns = [
        {
            title: 'Consumable Name',
            dataIndex: 'Consumable',
            key: 'name',
            align: 'center',
            width: 200,
            sorter: false,
            render: (text) => text?.name || '-'
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            align: 'left',
            width: 150,
            sorter: false,
            render: (text) => moment(text).format("MMM DD, YYYY") || '-'
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'left',
            width: 150,
            sorter: false,
            render: (text) => moment(text).format("MMM DD, YYYY") || '-'
            // render: (text) => text?.User?.name || '-'
        },
        {
            title: "Total Worked Day",
            dataIndex: 'totalWorkedDay',
            key: 'totalWorkedDay',
            align: 'center',
            sorter: false,
            // render: (text) => text.name || "-"
        },
        {
            title: 'Validity',
            dataIndex: 'Consumable',
            key: 'validity',
            align: 'left',
            sorter: false,
            render: (text) => text.validity || "-"
        },
        {
            title: 'Total Cycles occured',
            dataIndex: 'totalNumberOfCycle',
            key: 'totalNumberOfCycle',
            align: 'left',
            sorter: false,
            // render: (text) => text.cycle || "-"
        },
        {
            title: 'Expected Cycles',
            dataIndex: 'Consumable',
            key: 'cycle',
            align: 'left',
            sorter: false,
            render: (text) => text.cycle || "-"
        },
    ];

    useEffect(() => {
        setLoading(true);
        getMachineConsumableHistory();
    }, [pagination]);

    const getMachineConsumableHistory = async () => {
        try {
            const { data } = await window.$http.get(`machine/${machineId}/consumable-history/${clientId}`);

            setItems(data.rows);
            setCounts(data.count);
            setLoading(false);
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    return (
        <div>
            <DataTable
                data={items}
                totalRecords={count}
                title="Consumable History"
                columns={columns}
                loading={loading}
                // createOrUpdateAction={manageModal}
                // onChange={handlePaginationChange}
                // customActions={CustomAction}
            />
            {/* <ManageMachine
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
                updateConsumables={handleUpdateConsumables}
            /> */}
        </div>
    );
};

export default ConsumableHistory;

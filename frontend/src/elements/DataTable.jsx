import React from 'react';
import { Table, Button, Tooltip, Input, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
const { Search } = Input;

export default (props) => {
    let columns = [...props.columns];
    // if (props.customAction) {
    //     if (props.customAction === 'null') columns = [...columns];
    //     else columns = [...columns, props.customAction];
    // } else {
    if (props.showBasicActions) {
        if (props.customActions) {
            columns = [...columns, {
                title: 'Action',
                key: 'action',
                align: 'right',
                width: 80,
                render: (text, record) => (
                    <span style={{ whiteSpace: 'nowrap' }}>
                        {
                            props.customActions ? props.customActions(record) : ""
                        }
                    </span>
                ),
            }];
        }
    } else {
        columns = [...columns, {
            title: 'Action',
            key: 'action',
            align: 'center',
            width: 80,
            render: (text, record) => (
                <span style={{ whiteSpace: 'nowrap' }}>
                    <Tooltip title={"Edit " + props.title}>
                        <Button type="link" shape="circle" icon={<EditOutlined />} onClick={() => props.createOrUpdateAction(record)} />
                    </Tooltip>
                    <Tooltip title={"Delete " + props.title}>
                        <Popconfirm title="Are you sure you want to delete?" onConfirm={() => props.deleteAction(record)}>
                            <Button type="link-danger" shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                    {
                        props.customActions ? props.customActions(record) : ""
                    }
                </span>
            ),
        }];
    }
    // }

    const debounceSearch = debounce((value) => {
        props.onSearch(value);
    }, 500);

    return (
        <div>

            <div className="pt-2 pb-2">
                <div className="row">
                    <div className="col-6 text-left">
                        <Search placeholder={"Search " + props.title} onChange={value => debounceSearch(value.currentTarget.value)} onSearch={value => props.onSearch(value)} style={{ width: 200 }} />
                    </div>
                    {
                        props.notShowSearchAndAdd ? '' :
                            (
                                <div className="col-6 text-right">
                                    <Tooltip title={"Add " + props.title}>
                                        <Button
                                            type={props.buttonType ? props.buttonType : 'primary'}
                                            icon={props.icon ? props.icon : <PlusOutlined />}
                                            onClick={() => props.createOrUpdateAction()}
                                            size={props.buttonSize ? props.buttonSize : 'default'}>{props.buttonLabel}</Button>
                                    </Tooltip>
                                </div>
                            )
                    }
                </div>
            </div>
            <div className="pt-2">
                <Table
                    scroll={{ x: 900 }}
                    loading={props.loading}
                    onChange={props.onChange}
                    rowKey="id"
                    pagination={{
                        total: props.totalRecords,
                        defaultPageSize: 10,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    dataSource={props.data}
                    columns={columns}
                />
            </div>
        </div>
    );
};

import React from 'react';
import { HomeOutlined, CheckCircleOutlined, BellOutlined } from '@ant-design/icons';

const items = (role,) => {
    const roleRoute = role === "super_admin" ? "admin" : role;

    return {
        items: [
            {
                title: 'Dashboard',
                url: `/${roleRoute}/dashboard`,
                showTo: ["admin", "super_admin", "user"],
                icon: <HomeOutlined />,
            },
            {
                title: 'My Task',
                url: '/user/my-task',
                icon: <CheckCircleOutlined />,
                showTo: ["user"],
            },
            {
                title: 'Inbox',
                url: '/user/inbox',
                icon: <BellOutlined />,
                showTo: ["user"],
                showNotificationIcon: true
            }
            // {
            //     title: 'System',
            //     icon: <SettingOutlined />,
            //     showTo: ["admin", "super_admin"],
            //     children: [
            //         {
            //             title: 'Escalation',
            //             url: 'manage-escalation',
            //             showTo: ["admin", "super_admin"],
            //         },
            //         {
            //             title: 'Consumable Message',
            //             url: 'consumable-message',
            //             showTo: ["admin", "super_admin"],
            //         },
            //     ]
            // },
            // {
            //     title: 'Manage Client',
            //     url: `/${roleRoute}/manage-client`,
            //     icon: <UsergroupAddOutlined />,
            //     showTo: ["admin", "super_admin"],
            // },
            // // {
            // //     title: 'Manage User',
            // //     url: `/admin/manage-user`,
            // //     icon: <UserOutlined />,
            // //     showTo: ["admin", "super_admin"],
            // // },
            // {
            //     title: 'Manage Machine',
            //     url: `/${roleRoute}/manage-machine`,
            //     icon: <SettingOutlined />,
            //     showTo: ["admin", "super_admin", "client"],
            // },
            // {
            //     title: 'Manage Consumable Message',
            //     url: `/${roleRoute}/manage-consumable-message`,
            //     icon: <SnippetsOutlined />,
            //     showTo: ["admin", "super_admin", "client"],
            // },
        ],
    };
};

export default items;

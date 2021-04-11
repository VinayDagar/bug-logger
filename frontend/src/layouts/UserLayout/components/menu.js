import React from 'react';
import { HomeOutlined, CheckCircleOutlined, BellOutlined } from '@ant-design/icons';

export default {
    items: [
        {
            title: 'Home',
            url: '/user/home',
            icon: <HomeOutlined />,
        },
        {
            title: 'My Task',
            url: '/user/my-task',
            icon: <CheckCircleOutlined />,
        },
        {
            title: 'Inbox',
            url: '/user/notifications',
            icon: <BellOutlined />,
        }
    ],
};

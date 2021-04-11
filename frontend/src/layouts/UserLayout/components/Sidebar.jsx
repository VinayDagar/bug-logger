import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import navigationItems from "./menu";

const { SubMenu } = Menu;

const Sidebar = () => {

    const MenuItems = () => {
        navigationItems.items.map(el => (
            <Menu.Item key={el.title}>
                <Link to={el.url}>
                    {el.icon || ''}
                    <span>{el.title}</span>
                </Link>
            </Menu.Item>
        ));
    };

    return (
        <div>
            <Menu
                defaultSelectedKeys={[navigationItems.items[0].title]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
            >
                {MenuItems()}
            </Menu>
        </div>
    );
};

export default Sidebar;

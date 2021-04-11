import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from "assets/images/logo.png";

const Header = ({ user, logout }) => {
    const name = user?.name;

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to='/login' className="inline-block" onClick={logout}>
                    <LogoutOutlined style={{ color: '#08c' }} />
                    <span className="ml-1">Logout</span>
                </Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="d-flex align-items-center justify-content-between header">
            <div className="logo-container">
                <img src={logo} className="clm_logo" />
            </div>
            <div className="content-container">
                <Dropdown overlay={menu} trigger={['click']} onClick={e => e.preventDefault()}>
                    <a href="/" className="ant-dropdown-link anchor-color fw-500" onClick={e => e.preventDefault()}>
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{name[0]}</Avatar>
                        <span className="ml-2">{name}</span> <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;

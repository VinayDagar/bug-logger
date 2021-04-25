import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import navigationItems from "./menu";
import { connect } from "react-redux";

const { SubMenu } = Menu;

const Sidebar = (props) => {
    const role = props?.user?.role || 'super_admin';

    const MenuItems = (data) => {
        return data.map(el => {
            if (el.showTo.includes(role) && el.children?.length) {
                return (
                    <SubMenu
                        key={el.title}
                        title={
                            <span>
                                {el.icon || ''}
                                <span>
                                    {el.title}
                                </span>
                            </span>
                        }
                    >
                        {MenuItems(el.children)}
                    </SubMenu >
                );
            }
            if (el.showTo.includes(role)) {
                return <Menu.Item key={el.title}>
                    <Link to={el.url}>
                        {el.icon || ''}
                        {
                            el.showNotificationIcon
                            && props.isMessageRecieved &&
                            <div className="notification"> notification</div>
                        }
                        <span>{el.title}</span>
                    </Link>
                </Menu.Item>;

            }
        });
    };

    return (
        <div style={{ width: 256 }}>
            <Menu
                defaultSelectedKeys={[navigationItems(role, props.isMessageRecieved).items[0].title]}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                {MenuItems(navigationItems(role, props.isMessageRecieved).items)}
            </Menu>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user,
        isMessageRecieved: auth.isMessageRecieved
    };
};

export default connect(mapStateToProps, {})(Sidebar);

import React, { useEffect, useState } from 'react';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { UserOutlined, CalendarOutlined, BorderOutlined } from "@ant-design/icons";
import moment from "moment";

import ActivityComponent from "./components/Activity";

const tabData = [
    {
        title: "Activity",
        component: "activity"
    },
    {
        title: "Chat",
        component: "chat"
    },
];
const Notifications = () => {
    const [notificationList, setNotification] = useState();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState("activity");
    const [selectedNotification, setSelectedNotification] = useState(false);

    useEffect(() => {
        if (!notificationList) {
            getUserNotification();
        }
    }, [notificationList]);

    const getUserNotification = async () => {
        try {
            const { notifications } = await window.$http.get("common/notification");
            setNotification(notifications);
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handelNotificationClick = (data) => {
        setSelectedNotification(data);
        setIsPanelOpen(true);
    };

    return (
        <div>
            <div className="projectMain">
                <div className="projectTopBar">
                    <div className="projectTitleContainer">
                        <div className="projectTitle">
                            <h1 className="title"> Inbox </h1>
                        </div>
                        <div className="projectNavbar">
                            <ul className="tabbarList">
                                {
                                    tabData.map(a => (
                                        <li
                                            key={a.component}
                                            className={`tab ${selectedTab === a.component ? "tab-selected" : ""}`}
                                            onClick={() => setSelectedTab(a.component)}
                                        >
                                            <span> {a.title} </span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-4">
                {
                    selectedTab == "activity" ?
                        <div>
                            {
                                notificationList?.length ? notificationList.map(a => (
                                    <ActivityComponent onClick={() => handelNotificationClick(a)} key={a.id} title={a.title} data={a} description={a.message} />
                                )) : "No Notificitation to show!"
                            }
                        </div>
                        : ""
                }
            </div>

            <SlidingPane
                isOpen={isPanelOpen}
                title={selectedNotification.title}
                onRequestClose={() => setIsPanelOpen(false)}
                className="notificationSlidePanel"
                width="800px"
            >
                <div className="taskDetailPanel">
                    <div className="labelRowStructure">
                        <div className="labelRowStructure-left">
                            <div className="lableLeftContainer">
                                <label className="lable"> Assignee: </label>
                            </div>
                        </div>
                        <div className="labelRowStructure-right">
                            <div className="labelRowStructure-content">
                                <div className="assigneRight">
                                    <div className="assigneButton">
                                        <div className="assigneIconContainer">
                                            <UserOutlined />
                                        </div>
                                        <div className="mx-3"> No Assigne </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="labelRowStructure my-3">
                        <div className="labelRowStructure-left">
                            <div className="lableLeftContainer">
                                <label className="lable"> Created Date: </label>
                            </div>
                        </div>
                        <div className="labelRowStructure-right">
                            <div className="labelRowStructure-content">
                                <div className="assigneRight">
                                    <div className="assigneButton">
                                        <div className="assigneIconContainer">
                                            <CalendarOutlined />
                                        </div>
                                        <div className="mx-3"> {moment(selectedNotification.createdAt).format("YYYY MMM DD, HH:mm")} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="labelRowStructure my-3">
                        <div className="labelRowStructure-left">
                            <div className="lableLeftContainer">
                                <label className="lable"> Project: </label>
                            </div>
                        </div>
                        <div className="labelRowStructure-right">
                            <div className="labelRowStructure-content">
                                <div className="assigneRight">
                                    <div className="assigneButton">
                                        <div className="assigneIconContainer">
                                            <BorderOutlined />
                                        </div>
                                        <div className="mx-3"> { selectedNotification?.payload?.projectName || "Current" } </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="notificationFooter">
                        <div className="footerStructure">
                            <div className="structureIcon">
                                <div className="avatar"> { selectedNotification?.payload?.createdBy.slice(0, 2) } </div>
                            </div>
                            <div className="footerContent">
                                <div className="contentHeader">
                                    <div className="contentContainer">
                                        <span className="content">
                                            <a className="actorName"> { selectedNotification?.payload?.createdBy } </a>
                                            created this task
                                        </span>
                                        <span className="metaContainer">
                                            <span> 4 days ago </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SlidingPane>
        </div>
    );
};

export default Notifications;

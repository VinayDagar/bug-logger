import React from 'react';
import { UsergroupAddOutlined, ContainerOutlined } from "@ant-design/icons";
import moment from "moment";

const MemberTimeline = ({ name, date, isCreated }) => {
    return (
        <>
            <div className="timelineContainer-wrapper">
                <div className={`activeFeed-container ${isCreated ? "projectCreated" : ""}`}>
                    <div className="activeFeed-iconContainer">
                        {
                            isCreated ? <ContainerOutlined /> : <UsergroupAddOutlined />
                        }
                    </div>
                    {
                        isCreated ? "" :
                            <div className="activeFeed-line"></div>
                    }
                </div>
                <div className="timelineContainer-content">
                    {
                        isCreated ?
                            <>
                                <h5 className="timeline-title"> Project Created </h5>
                                <div className="d-flex justify-content-center align-items-center">
                                    <h6 style={{ marginBottom: 0 }}> {name} </h6>
                                    <div className="timeline-date-created">  {date ? moment(date).format("MMM DD, YYYY") : "-"} </div>
                                </div>
                            </>
                            :
                            <>
                                <h5 className="timeline-title"> {name} joined </h5>
                                <div className="timeline-date"> {date ? moment(date).format("MMM DD, YYYY") : "-"} </div>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default MemberTimeline;

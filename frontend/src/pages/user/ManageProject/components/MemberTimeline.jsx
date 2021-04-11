import React from 'react';
import { UsergroupAddOutlined, ContainerOutlined } from "@ant-design/icons";

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
                                    <h6> {name} </h6>
                                    <div className="timeline-date">  {date} </div>
                                </div>
                            </>
                            :
                            <>
                                <h5 className="timeline-title"> {name} joined </h5>
                                <div className="timeline-date"> {date} </div>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default MemberTimeline;

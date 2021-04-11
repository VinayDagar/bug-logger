import React from 'react';
import { MenuOutlined } from '@ant-design/icons';

const ProjectViewCard = ({ projectName, memberList }) => {
    return (
        <div className="projectCardContainer">
            <div className="projectCard" title={projectName}>
                <div>
                    <div className="text-center">
                        <MenuOutlined style={{ fontSize: "30px" }} />
                    </div>
                    <div className="memberListContainer">
                        <div className="listWrapper">
                            {
                                memberList.map(a => <div className="facepile" key={a}> {a} </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className="titleName">
                    {projectName}
                </div>
            </div>
        </div>
    );
};

export default ProjectViewCard;

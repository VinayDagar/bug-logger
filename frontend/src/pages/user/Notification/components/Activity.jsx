import React from 'react';
import { Card, Col, Row } from 'antd';

const Activity = ({ title, description, data, onClick }) => {
    return (
        <Card onClick={onClick} title={title} hoverable bordered={false}>
            <div> {description}  </div>
        </Card>
    );
};

export default Activity;

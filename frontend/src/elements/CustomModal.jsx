import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const CustomModal = (props) => {

    const [visible, setVisibility] = useState(false);


    useEffect(() => {
        setVisibility(props.showModal);
    }, [props.showModal]);

    const handleCancel = (e) => {
        setVisibility(false);
        props.onClose();
    };

    return (
        <span>
            <Modal
                title={props.title}
                centered
                visible={visible}
                className={props.className}
                onCancel={handleCancel}
                footer={null}
                width={props.width}
                maskClosable={props.maskClosable}
                closable={props.closable}
                destroyOnClose={props.destroyOnClose}
            >
                {props.children}
            </Modal>
        </span>
    );
};

CustomModal.defaultProps = {
    showModal: 'open Modal',
    title: '',
    className: '',
    width: 520,
    maskClosable: true,
    closable: true
};

CustomModal.propTypes = {
    showModal: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    maskClosable: PropTypes.bool,
    closable: PropTypes.bool
};

export default CustomModal;

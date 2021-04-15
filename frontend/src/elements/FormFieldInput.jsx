import React, { Component, useState, useEffect } from "react";
import {
    Form,
    Input,
    Checkbox,
    Select as AntSelect,
    Radio,
    TimePicker as AntTimePicker,
    DatePicker as AntDatePicker,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Controller, ErrorMessage } from "react-hook-form";

const Error = (props) => {
    return (
        <ErrorMessage errors={props.err} name={props.name}>
            {({ message, messages }) => {
                if (messages) {
                    return (
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <span
                                key={type}
                                className="text-danger warning-msg"
                            >
                                {message}
                            </span>
                        ))
                    );
                }
                return (
                    <span className="text-danger warning-msg">{message}</span>
                );
            }}
        </ErrorMessage>
    );
};

const TextField = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input
                            placeholder={props.placeholder}
                            style={props.style}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={
                                props.allowClear ? props.allowClear : false
                            }
                            prefix={props.prefix}
                            suffix={props.suffix}
                            {...props.rest}
                        />
                    }
                    rules={
                        props.inputType === "email"
                            ? {
                                ...props.rules,
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                                    message: "Invalid Email",
                                },
                            }
                            : props.rules
                    }
                    name={props.attribute}
                    control={props.control}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const TextNumber = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input
                            placeholder={props.placeholder}
                            style={props.style}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={
                                props.allowClear ? props.allowClear : false
                            }
                            prefix={props.prefix}
                            suffix={props.suffix}
                            {...props.rest}
                        />
                    }
                    maxLength={props.maxLength}
                    minLength={props.minLength}
                    rules={
                        {
                            ...props.rules,
                            validate: {
                                value: /^[0-9]*$/,
                                message: "Invalid number!",
                            },
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "Invalid number!",
                            },
                        }
                    }
                    name={props.attribute}
                    control={props.control}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const TextArea = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Input.TextArea
                    placeholder={props.placeholder}
                    style={props.style}
                    disabled={props.disabled ? props.disabled : false}
                    name={props.attribute}
                    allowClear={props.allowClear ? props.allowClear : false}
                    {...props.rest}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
                {/* <Input.TextArea
                    placeholder={props.placeholder}
                    style={props.style}
                    value={props.modalValue}
                    name={props.attribute}
                    disabled={props.disabled}
                    allowClear={props.allowClear}
                /> */}
            </Form.Item>
            {/* <Error err={props.errors} name={props.attribute} /> */}
        </div>
    );
};

const Password = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <Input.Password
                            placeholder={props.placeholder}
                            disabled={props.disabled ? props.disabled : false}
                            allowClear={
                                props.allowClear ? props.allowClear : false
                            }
                            prefix={
                                <LockOutlined
                                    style={{ color: "rgba(0,0,0,0.7)" }}
                                />
                            }
                            {...props.rest}
                        />
                    }
                    rules={props.rules}
                    name={props.attribute}
                    control={props.control}
                    onChange={props.onChange}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const CheckBox = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item
                className={`from-field-input text-left ${props.className}`}
                label={props.label}
            >
                <Controller
                    as={
                        <Checkbox
                            disabled={props.disabled ? props.disabled : false}
                        >
                            {props.children}
                        </Checkbox>
                    }
                    rules={props.rules}
                    name={props.attribute}
                    control={props.control}
                    onChange={([event]) => event.target.checked}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const Select = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item className="from-field-input" label={props.label}>
                <Controller
                    as={
                        <AntSelect
                            style={{ width: "100%" }}
                            {...props.rest}
                            disabled={props.disabled ? props.disabled : false}
                            placeholder={props.placeholder}
                            showSearch={props.showSearch}
                            mode={props.selectMode}
                        >
                            {props.options.map((el) => (
                                <AntSelect.Option
                                    disabled={props.disableOptions}
                                    key={el.value}
                                    value={el.value}
                                >
                                    {el.label}
                                </AntSelect.Option>
                            ))}
                        </AntSelect>
                    }
                    rules={props.rules}
                    name={props.attribute}
                    control={props.control}
                    onChange={([vals]) => {
                        if (props.onChange) {
                            props.onChange(vals);
                        }
                        return vals;
                    }}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const DatePicker = (props) => {
    return (
        <div className="position-relative ant-form-vertical">
            <Form.Item
                className="from-field-input text-left"
                label={props.label}
            >
                <Controller
                    as={
                        <AntDatePicker
                            {...props.rest}
                            style={props.style}
                            allowClear={
                                props.allowClear ? props.allowClear : false
                            }
                            disabled={props.disabled ? props.disabled : false}
                        />
                    }
                    rules={props.rules}
                    name={props.attribute}
                    control={props.control}
                    style={props.style}
                    onChange={([event, value]) => {
                        if (props.onChange) {
                            props.onChange(event, value);
                        }
                        return event;
                    }}
                />
            </Form.Item>
            <Error err={props.errors} name={props.attribute} />
        </div>
    );
};

const FormFieldInput = (props) => {
    switch (props.inputType) {
        case "checkbox":
            return <CheckBox {...props} />;
        case "datepicker":
            return <DatePicker {...props} />;
        case "password":
            return <Password {...props} />;
        case "select":
            return <Select {...props} />;
        case "textarea":
            return <TextArea {...props} />;
        case "textnumber":
            return <TextNumber {...props} />;
        default:
            return <TextField {...props} />;
    }
};

FormFieldInput.defaultProps = {
    inputType: "text",
    inputClass: "form-control",
    required: false,
    disabled: false,
    showLabel: true,
    showErrors: false,
    items: [],
    label: "",
    errors: null,
    rest: {},
    options: [],
    rules: {},
    selectMode: ""
};

FormFieldInput.propTypes = {
    inputType: PropTypes.string,
    handleChange: PropTypes.func,
    inputClass: PropTypes.string,
    attribute: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    showLabel: PropTypes.bool,
    showErrors: PropTypes.bool,
    falseCheckboxText: PropTypes.string,
    trueCheckboxText: PropTypes.string,
    validation: PropTypes.string,
    items: PropTypes.array,
    prefix: PropTypes.object,
    suffix: PropTypes.object,
    maxLength: PropTypes.number,
    style: PropTypes.any,
    errors: PropTypes.object,
    rest: PropTypes.any,
    options: PropTypes.array,
    rules: PropTypes.object,
    control: PropTypes.any,
    disableOptions: PropTypes.bool,
    modalValue: PropTypes.string,
    showSearch: PropTypes.bool,
    selectMode: PropTypes.string,
};

export default FormFieldInput;

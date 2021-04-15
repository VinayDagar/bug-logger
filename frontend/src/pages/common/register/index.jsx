import React, { useState } from 'react';
import FormFieldInput from "elements/FormFieldInput";
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { useForm } from 'react-hook-form';
import "../common.scss";

import { connect } from "react-redux";
import { updateUser, login } from "store/auth/action";
import { Link, useHistory } from "react-router-dom";
import loginLeft from "assets/images/loginLeft.png";

const Register = ({ login }) => {

    const history = useHistory();

    const handleRegister = async (data) => {
        try {

            if (data.password !== data.confirmPassword) {
                window.$utility.showErrorMessage("Password does not match!");
                return
            }

            const result = await window.$http.postWithoutHeaders("common/register/user", {
                email: data.email,
                name: data.name,
                phone: data.phone,
                password: data.password,
            });


            login(result);
            history.push(`/${result?.user?.role}/dashboard`);

        } catch (err) {
            console.log(err);
            window.$utility.showErrorMessage(err.message);
        }
    };

    const defaultValues = {
        name: "",
        email: '',
        phone: '',
        password: '',
        rememberEmail: false,
        confirmPassword: ""
    };

    const { handleSubmit, control, errors } = useForm({
        defaultValues
    });

    return (
        <div className="content">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 image-background">
                        <img src={loginLeft} />
                    </div>
                    <div className="col-md-6 form-background">
                        <div className="row justify-content-center">
                            <div className="col-md-11">
                                <div className="form-block">
                                    <div className="form-header">
                                        <div className="mb-4 text-center">
                                            <h3>Sign Up on <strong>Logger</strong></h3>
                                            <p className="mb-4">Register to manage all your task's </p>
                                        </div>
                                    </div>
                                    <form className="form" onSubmit={handleSubmit(handleRegister)}>
                                        <div className="form-group text-center">
                                            <FormFieldInput
                                                attribute="name"
                                                inputType="text"
                                                errors={errors}
                                                control={control}
                                                placeholder="Enter your Name"
                                                rules={{
                                                    required: 'Name is required'
                                                }}
                                                rest={{ maxLength: 50 }}
                                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.7)' }} />}
                                            />
                                        </div>
                                        <div className="form-group text-center">
                                            <FormFieldInput
                                                attribute="email"
                                                inputType="email"
                                                errors={errors}
                                                control={control}
                                                placeholder="Enter your email"
                                                rules={{
                                                    required: 'Email is required'
                                                }}
                                                rest={{ maxLength: 50 }}
                                                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,0.7)' }} />}
                                            />
                                        </div>
                                        <div className="form-group text-center">
                                            <FormFieldInput
                                                attribute="phone"
                                                inputType="textnumber"
                                                errors={errors}
                                                control={control}
                                                placeholder="Enter your phone number"
                                                maxLength={10}
                                                minLength={10}
                                                rules={{
                                                    required: 'Phone is required'
                                                }}
                                                rest={{ maxLength: 50 }}
                                                prefix={<PhoneOutlined style={{ color: 'rgba(0,0,0,0.7)' }} />}
                                            />
                                        </div>
                                        <div className="form-group text-center">
                                            <FormFieldInput
                                                attribute="password"
                                                inputType="password"
                                                placeholder="Enter your password"
                                                control={control}
                                                errors={errors}
                                                rules={{
                                                    required: 'Password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Invalid Password (Length should be > 6)'
                                                    }
                                                }}
                                                rest={{ maxLength: 30 }}
                                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.7)' }} />}
                                            />
                                        </div>
                                        <div className="form-group text-center">
                                            <FormFieldInput
                                                attribute="confirmPassword"
                                                inputType="password"
                                                placeholder="Confirm your password"
                                                control={control}
                                                errors={errors}
                                                rules={{
                                                    required: 'Confirm Password is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Invalid Password (Length should be > 6)'
                                                    }
                                                }}
                                                rest={{ maxLength: 30 }}
                                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.7)' }} />}
                                            />
                                        </div>
                                        <div className="form-group text-center">
                                            <Button className="signinButton" onClick={handleSubmit(handleRegister)} type="submit"> Register </Button>
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        Already have an account? <Link to="/login" title="SIGN IN"> SIGN IN </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload) => {
            dispatch(login(payload));
        },
        updateUser: (payload) => {
            dispatch(updateUser(payload));
        },
    };
};

export default connect(null, mapDispatchToProps)(Register);

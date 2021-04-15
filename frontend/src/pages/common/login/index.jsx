import React, { useEffect, useState } from 'react';
import FormFieldInput from "elements/FormFieldInput";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { useForm } from 'react-hook-form';
import "../common.scss";

import { connect } from "react-redux";
import { updateUser, login } from "store/auth/action";
import { Link, useHistory } from "react-router-dom";
import loginLeft from "assets/images/loginLeft.png";

const Login = ({ login }) => {

    const history = useHistory();
    const [remeberedUser, _] = useState(localStorage.getItem("rememberedUser"));

    const defaultValues = {
        email: '',
        password: '',
        rememberEmail: false,
    };

    const handleLogin = async (data) => {
        try {

            if (data.rememberEmail) {
                localStorage.setItem("rememberedUser", data.email);
            }

            const result = await window.$http.postWithoutHeaders("common/login", {
                email: data.email,
                password: data.password,
            });

            login(result);
            history.push(`/${result?.user?.role}/dashboard`);

        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    useEffect(() => {
        if (remeberedUser) {
            setValue("email", remeberedUser)
        }
    }, [remeberedUser]);

    const { handleSubmit, control, errors, setValue } = useForm({
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
                            <div className="col-md-12">
                                <div className="form-block">
                                    <div className="form-header">
                                        <div className="mb-2 text-center">
                                            <h3>Sign In to <strong>Logger</strong></h3>
                                            <p className="mb-3">Login to see your task list </p>
                                        </div>
                                    </div>
                                    <form className="form" onSubmit={handleSubmit(handleLogin)}>
                                        <div className="form-group text-center">
                                            <FormFieldInput
                                                attribute="email"
                                                inputType="email"
                                                errors={errors}
                                                control={control}
                                                label="Email"
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
                                                attribute="password"
                                                inputType="password"
                                                placeholder="Enter your password"
                                                control={control}
                                                label="Password"
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
                                                attribute="rememberEmail"
                                                inputType="checkbox"
                                                className="checkbox-css"
                                                // label="Remember me?"
                                                control={control}
                                                errors={errors}
                                            // prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.7)' }} />}
                                            > Remember me? </FormFieldInput>
                                        </div>
                                        <div className="form-group text-center">
                                            <Button className="signinButton" onClick={handleSubmit(handleLogin)} type="submit"> SIGN IN </Button>
                                        </div>
                                    </form>
                                    <div className="text-center">
                                        Don't have an account? <Link to="/register" title="SIGN UP"> SIGN UP </Link>
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

export default connect(null, mapDispatchToProps)(Login);

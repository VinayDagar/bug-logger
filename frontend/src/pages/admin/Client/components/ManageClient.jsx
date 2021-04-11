import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomModal from 'elements/CustomModal';
import FormFieldInput from 'elements/FormFieldInput';
import { Button } from 'antd';

export default (props) => {
    const defaultValues = {
        id: null,
        name: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        role: ""
    };
    const roleList = [{ label: "Client", value: "client" }, { label: "Engineer", value: "engineer" }];

    const { handleSubmit, setValue, errors, reset, control } = useForm({
        defaultValues
    });
    const [title, setModalTitle] = useState('Add Class');
    const [mode, setMode] = useState("add");

    useEffect(() => {
        setModalTitle('Add Client');
        reset(defaultValues);

        if (props.data && props.data.id) {
            setMode("edit");
            setModalTitle('Edit Client');
            setTimeout(() => {
                setValue('id', props.data.id);
                setValue('name', props.data.name);
                setValue('phone', props.data.phone);
                setValue('email', props.data.email);
                setValue('address', props.data.address);
                setValue('role', props.data.role);
            });
        }
    }, [props.visible, props.data]);

    const onSubmit = (data) => {
        if (props.data.id) {
            data.id = props.data.id;
            data.clientId = props.data?.clientId;
        }
        props.onClose(data);
    };

    return (
        <CustomModal
            title={title}
            centered
            showModal={props.visible}
            width={props.width}
            onClose={props.onModalClose}
            destroyOnClose={true}
        >
            <div className="container">
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="text"
                            placeholder="Enter CLient Name"
                            attribute="name"
                            control={control}
                            errors={errors}
                            label="Name"
                            rules={{
                                required: 'Client Name is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="textnumber"
                            placeholder="Enter Phone"
                            attribute="phone"
                            control={control}
                            errors={errors}
                            label="Phone"
                            maxLength={10}
                            minLength={10}
                            rules={{
                                required: 'Phone is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="email"
                            placeholder="Enter Email"
                            attribute="email"
                            control={control}
                            errors={errors}
                            label="Email"
                            rules={{
                                required: 'Email is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Role"
                            attribute="role"
                            control={control}
                            errors={errors}
                            options={roleList}
                            label="Role"
                            rules={{
                                required: 'Role is required',
                            }}
                        />
                    </div>
                    {
                        mode === 'add' ?
                            <div className="requred-feild">
                                <FormFieldInput
                                    inputType="password"
                                    placeholder="Enter Password"
                                    attribute="password"
                                    control={control}
                                    errors={errors}
                                    label="Password"
                                    rules={{
                                        required: 'Password is required',
                                    }}
                                />
                            </div>
                            : ""

                    }
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="textarea"
                            placeholder="Enter Address"
                            attribute="address"
                            control={control}
                            rules={{
                                required: 'Address is required',
                            }}
                            errors={errors}
                            label="Address"
                        />
                    </div>
                    <div className="text-right">
                        <Button key="submit" type="primary" htmlType="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </CustomModal>

    );
};

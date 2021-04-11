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
        machineId: "",
        labelId: "",
    };

    const { handleSubmit, setValue, errors, reset, control } = useForm({
        defaultValues
    });
    const [title, setModalTitle] = useState('Add Escalation');
    const [mode, setMode] = useState("add");

    useEffect(() => {
        setModalTitle('Add Escalation');
        reset(defaultValues);

        if (props.data && props.data.id) {
            setMode("edit");
            setModalTitle('Edit Escalation');
            setTimeout(() => {
                setValue('id', props.data.id);
                setValue('name', props.data.name);
                setValue('phone', props.data.phone);
                setValue('email', props.data.email);
                setValue('machineId', props.data.machneId);
                setValue('labelId', props.data.labelId);
            });
        }
    }, [props.visible, props.data]);

    const onSubmit = (data) => {
        if (props.data.id) {
            data.id = props.data.id;
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
                            placeholder="Enter Name"
                            attribute="name"
                            control={control}
                            errors={errors}
                            label="Name"
                            rules={{
                                required: 'Name is required',
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
                            placeholder="Select Machine"
                            attribute="machineId"
                            control={control}
                            errors={errors}
                            showSearch={true}
                            options={props.mstData?.machines ? props.mstData.machines : []}
                            label="Machine"
                            rules={{
                                required: 'Machine is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Label"
                            attribute="labelId"
                            control={control}
                            errors={errors}
                            showSearch={true}
                            options={props.mstData?.mstLabels ? props.mstData.mstLabels : []}
                            label="Label"
                            rules={{
                                required: 'Label is required',
                            }}
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

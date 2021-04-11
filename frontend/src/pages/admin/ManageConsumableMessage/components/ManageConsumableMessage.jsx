import React, { useState, useEffect } from 'react';
import CustomModal from "elements/CustomModal";
import FormFieldInput from "elements/FormFieldInput";
import { Button } from 'antd';
import { useForm } from 'react-hook-form';

const ManageConsumableMessage = (props) => {

    const defaultValues = {
        id: null,
        message: "",
        type: "",
        showOn: "",
        consumableId: ""
    };

    const typeOptions = [
        { label: "Message of cycle", value: "cycle" },
        { label: "Message of validity", value: "validity" },
    ];

    const { handleSubmit, setValue, errors, reset, control } = useForm({
        defaultValues
    });
    const [title, setModalTitle] = useState('Edit Consumable Message');
    const [mode, setMode] = useState("add");

    useEffect(() => {
        // setModalTitle('Add Consumable Message');
        reset(defaultValues);

        if (props.data && props.data.id) {
            setMode("edit");
            // setModalTitle('Edit Consumable Message');
            setTimeout(() => {
                setValue('id', props.data.id);
                setValue('message', props.data.message);
                setValue('showOn', props.data.showOn);
                setValue('type', props.data.type);
                setValue('consumableId', props.data.consumableId);
            });
        } else {
            setMode("add");
        }
    }, [props.visible, props.data]);

    const onSubmit = (data) => {
        props.onClose({ ...props.data, ...data });
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
                    {/* <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Consumable"
                            attribute="consumableId"
                            control={control}
                            disabled={mode === 'edit'}
                            errors={errors}
                            showSearch={true}
                            options={props.mstData?.consumables ? props.mstData.consumables : []}
                            label="Consumable"
                            rules={{
                                required: 'Consumable is required',
                            }}
                        />
                    </div> */}
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Type"
                            attribute="type"
                            control={control}
                            errors={errors}
                            showSearch={false}
                            options={typeOptions}
                            disabled={mode === 'edit'}
                            label="Type"
                            rules={{
                                required: 'Type is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="text"
                            placeholder="Enter Consumable Message"
                            attribute="message"
                            control={control}
                            errors={errors}
                            label="Consumable Message"
                            rules={{
                                required: 'message is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="text"
                            placeholder="On how many cycle/validity does it show!"
                            attribute="showOn"
                            control={control}
                            errors={errors}
                            label="Show"
                            rules={{
                                required: 'Show is required',
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

export default ManageConsumableMessage;

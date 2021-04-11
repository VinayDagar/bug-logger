import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomModal from 'elements/CustomModal';
import FormFieldInput from 'elements/FormFieldInput';
import { Button } from "antd";

const ChangeConsumable = (props) => {

    const defaultValues = {
        consumableId: "",
        noOfCycle: "",
        validity: "",
        personName: "",
    };

    const { handleSubmit, setValue, errors, reset, control } = useForm({
        defaultValues
    });

    const [consumableList, setConsumableList] = useState([]);
    const [changeDate, setChangeDate] = useState();

    useEffect(() => {
        getConsumablesList();
    }, [props.visible]);

    const getConsumablesList = async () => {
        try {
            const result = await window.$http.getById("machine/consumable-list", props.machine?.Product?.id);
            setConsumableList(result.map(a => ({ value: a.id, label: `${a.name} - (cycles ${a.cycle} | validity ${a.validity})` })));
        } catch (err) {
            window.$utility.showErrorMessage(err.message);
        }
    };

    const handleDateChange = (d) => {
        setChangeDate(new Date(d._d));
    };

    const onSubmit = (data) => {
        data.changeDate = changeDate;
        props.changeConsumable(data);
    };

    return (
        <CustomModal
            title={props?.machine?.name}
            centered
            showModal={props.visible}
            width={props.width}
            onClose={props.onClose}
            destroyOnClose={true}
        >
            <div className="container">
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Consumable"
                            attribute="consumableId"
                            control={control}
                            errors={errors}
                            showSearch={true}
                            options={consumableList}
                            label="Consumable"
                            rules={{
                                required: 'Consumable is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="text"
                            placeholder="Name of Person"
                            attribute="personName"
                            control={control}
                            errors={errors}
                            label="Name of the person"
                            rules={{
                                required: 'Person name is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="datepicker"
                            placeholder="Select date of change"
                            attribute="changeDate"
                            control={control}
                            onChange={handleDateChange}
                            errors={errors}
                            label="Change Date"
                            rules={{
                                required: 'Change date is required',
                            }}
                        />
                    </div>
                    {/* <div className="requred-feild">
                        <FormFieldInput
                            inputType="textnumber"
                            placeholder="Enter Validity (in months)"
                            attribute="validity"
                            control={control}
                            errors={errors}
                            label="Validity"
                            rules={{
                                required: 'Validity is required',
                            }}
                        />
                    </div> */}
                    <div className="text-right">
                        <Button key="submit" type="primary" htmlType="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </CustomModal>
    );
};

export default ChangeConsumable;

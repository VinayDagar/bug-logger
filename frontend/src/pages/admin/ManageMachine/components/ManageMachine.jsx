import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomModal from 'elements/CustomModal';
import FormFieldInput from 'elements/FormFieldInput';
import { Button } from 'antd';

export default (props) => {
    const defaultValues = {
        id: null,
        name: "",
        clientId: "",
        equipmentId: [],
        productId: [],
        manufacturerId: [],
        productModelId: [],
        serialNumber: ""
    };

    const { handleSubmit, setValue, errors, reset, control } = useForm({
        defaultValues
    });
    const [title, setModalTitle] = useState('Add Machine');
    const [mode, setMode] = useState("add");

    useEffect(() => {
        setModalTitle('Add Machine');
        reset(defaultValues);
        if (props.data && props.data.id) {
            setMode("edit");
            setModalTitle('Edit Machine');
            setTimeout(() => {
                setValue('id', props.data.id);
                setValue('name', props.data.name);
                setValue('clientId', props.data.clientId);
                setValue('equipmentId', props.data.equipmentId);
                setValue('productId', props.data.productId);
                setValue('productModelId', props.data.productModelId);
                setValue('serialNumber', props.data.serialNumber);
                setValue('manufacturerId', props.data.manufacturerId);
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
            onClose={props.onClose}
            destroyOnClose={true}
        >
            <div className="container">
                <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select CLient"
                            attribute="clientId"
                            control={control}
                            errors={errors}
                            showSearch={true}
                            options={props.mstData?.clients ? props.mstData.clients : []}
                            label="Client"
                            rules={{
                                required: 'Client is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Equipment"
                            attribute="equipmentId"
                            control={control}
                            errors={errors}
                            showSearch={true}
                            options={props.mstData?.equipments ? props.mstData.equipments : []}
                            label="Equipment"
                            rules={{
                                required: 'Equipment is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Manufacturer"
                            attribute="manufacturerId"
                            control={control}
                            errors={errors}
                            showSearch={true}
                            options={props.mstData?.manufacturer ? props.mstData.manufacturer : []}
                            label="Manufacturer"
                            rules={{
                                required: 'Manufacturer is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Product"
                            attribute="productId"
                            control={control}
                            errors={errors}
                            showSearch={true}
                            options={props.mstData?.product ? props.mstData.product : []}
                            label="Product"
                            rules={{
                                required: 'Product is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Product Model"
                            attribute="productModelId"
                            control={control}
                            errors={errors}
                            showSearch={true}
                            options={props.mstData?.productModel ? props.mstData.productModel : []}
                            label="Product Model"
                            rules={{
                                required: 'Product Model is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="text"
                            placeholder="Enter Machine Name"
                            attribute="name"
                            control={control}
                            errors={errors}
                            label="Name"
                            rules={{
                                required: 'Machine Name is required',
                            }}
                        />
                    </div>
                    <div className="requred-feild">
                        <FormFieldInput
                            inputType="text"
                            placeholder="Enter Serial Number"
                            attribute="serialNumber"
                            control={control}
                            errors={errors}
                            label="Serial Number"
                            rules={{
                                required: 'Serial Number is required',
                            }}
                        />
                    </div>
                    {/* <div className="requred-feild">
                        <FormFieldInput
                            inputType="select"
                            placeholder="Select Equipments"
                            attribute="machineEquipments"
                            showSearch={true}
                            selectMode="multiple"
                            control={control}
                            errors={errors}
                            options={props.mstData?.equipments ? props.mstData?.equipments : []}
                            label="Machine Equipments"
                            rules={{
                                required: 'Machine Equipments are required',
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

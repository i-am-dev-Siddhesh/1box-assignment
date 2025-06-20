import React from 'react';
import CustomDatePicker from './CustomDatepicker';
import CustomDropdown from './CustomDropdown';
import CustomInput from './CustomTextInput';

type FormField = {
    label: string;
    name: string;
    type: string;
    required: boolean;
    options?: string[];
    note?: string
};

type FormControllerProps = {
    field: FormField;
    value: any;
    onChange: (value: any) => void;
    error?: { message?: string };
};

const FormController: React.FC<FormControllerProps> = ({ field, value, onChange, error }) => {
    const renderField = (
        field: FormField,
        onChange: (value: any) => void,
        value: any,
        error?: { message?: string }
    ) => {
        switch (field.type) {
            case 'select':
                return (
                    <CustomDropdown
                        label={field.label}
                        options={field.options || []}
                        required={field.required}
                        value={value}
                        onChange={onChange}
                        errorMessage={error?.message}
                    />
                );
            case 'date':
                return (
                    <CustomDatePicker
                        label={field.label}
                        required={field.required}
                        value={value}
                        onChange={onChange}
                        errorMessage={error?.message}
                    />
                );
            default:
                return (
                    <CustomInput
                        type={field.type}
                        label={field.label}
                        required={field.required}
                        value={value}
                        onChange={onChange}
                        errorMessage={error?.message}
                    />
                );
        }
    };

    return <>{renderField(field, onChange, value, error)}</>;
};

export default FormController;

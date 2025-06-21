import React from 'react';
import CustomDatePicker from './CustomDatepicker';
import CustomDropdown from './CustomDropdown';
import CustomInput from './CustomTextInput';
import CustomCheckbox from './CustomCheckbox';
import CustomUpload from './CustomUpload';

type FormField = {
  label: string;
  name: string;
  type: string;
  required: boolean;
  options?: string[] | number[];
  note?: string;
  rightIcon?: any;
  leftIcon?: any;
  accept?: string; // For file uploads
  multiple?: boolean; // For file uploads
};

type FormControllerProps = {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: { message?: string };
};

const FormController: React.FC<FormControllerProps> = ({
  field,
  value,
  onChange,
  error,
}) => {
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
          // leftIcon={field.leftIcon}
          // rightIcon={field.rightIcon}
          />
        );
      case 'checkbox':
        return (
          <CustomCheckbox
            label={field.label}
            required={field.required}
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
            leftIcon={field.leftIcon}
            rightIcon={field.rightIcon}
          />
        );
      case 'file':
        return (
          <CustomUpload
            label={field.label}
            required={field.required}
            value={value}
            onChange={onChange}
            errorMessage={error?.message}
            leftIcon={field.leftIcon}
            rightIcon={field.rightIcon}
            accept={field.accept}
            multiple={field.multiple}
          />
        );
      default:
        return (
          <CustomInput
            type={field.type}
            label={field.label}
            leftIcon={field.leftIcon}
            rightIcon={field.rightIcon}
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

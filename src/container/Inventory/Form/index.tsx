import { Controller, useForm } from 'react-hook-form';
import formFieldData from './form.json';
import FormController from '@/components/Formcontrols';

const InventoryForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log('Form Data:', data);
    };
    return (
        <div>
            {/* {formFieldData.map((item) => {
                return <div key={item.label}>

                </div>
            })} */}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {formFieldData.map((field) => (
                    <Controller
                        key={field.name}
                        name={field.name}
                        control={control}
                        rules={{
                            required: field.required ? `${field.label} is required` : false,
                        }}
                        render={({ field: controllerField, fieldState }) => (
                            <FormController
                                field={field}
                                value={controllerField.value}
                                onChange={controllerField.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                ))}

                <button
                    type="submit"
                    className="px-4 py-2 mt-4 bg-blue-600 text-white rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default InventoryForm
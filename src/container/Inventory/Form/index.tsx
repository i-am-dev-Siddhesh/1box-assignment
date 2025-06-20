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
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-5">
                {formFieldData.map((field) => (
                    <Controller
                        key={field.name}
                        name={field.name}
                        control={control}
                        rules={{
                            required: field.required ? `${field.label} is required` : false,
                        }}
                        render={({ field: controllerField, fieldState }) => (
                            <div className='min-w-[18%]'>
                                <FormController
                                    field={field}
                                    value={controllerField.value}
                                    onChange={controllerField.onChange}
                                    error={fieldState.error}
                                />
                            </div>
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
import { Controller, useForm } from 'react-hook-form';
import formFieldData from './form.data';
import FormController from '@/components/Formcontrols';

const InventoryForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log('Form Data:', data);
        // API Integration
    };
    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {formFieldData.map((field) => (
                        <Controller
                            key={field.name}
                            name={field.name}
                            control={control}
                            rules={{
                                required: field.required ? `${field.label} is required` : false,
                            }}
                            render={({ field: controllerField, fieldState }) => (
                                <div className=''>
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
                </div>
                <div className="mt-8 col-span-full">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default InventoryForm
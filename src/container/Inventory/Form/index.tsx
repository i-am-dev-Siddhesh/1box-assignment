import { Controller, useForm } from 'react-hook-form';
import formFieldData from './form.data';
import FormController from '@/components/Formcontrols';
import { IoMdAdd } from 'react-icons/io';

const InventoryForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log('Form Data:', data);
        // API Integration
    };
    return (
        <div className="">

            <div className='mx-5'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                        {formFieldData.map((field) => (
                            <Controller
                                key={field.name}
                                name={field.name}
                                control={control}
                                rules={{
                                    required: field.required ? `${field.label} is required` : false,
                                }}
                                render={({ field: controllerField, fieldState }) => (
                                    <div>
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
                </form>
                <hr className="text-[#f1f1f6] border-[1.9px] my-10" />
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className={`flex cursor-pointer items-center gap-1 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        <IoMdAdd />
                        {isSubmitting ? 'Submitting...' : 'Add Listing'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InventoryForm
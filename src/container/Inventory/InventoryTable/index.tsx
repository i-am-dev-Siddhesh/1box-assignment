// import { CustomTable } from '@/components/CustomTable';
// import React, { useMemo } from 'react';
// import { type ColumnDef } from '@tanstack/react-table';
// import inventoryData from '../Form/form.data';
// import { FaRegHandPaper } from 'react-icons/fa';
// import { PiCurrencyGbp } from 'react-icons/pi';

// const InventoryTable = () => {
//     const data = useMemo(() => inventoryData, []);

//     // Helper function to format header names
//     const formatHeaderName = (key: string) => {
//         return key
//             .replace(/([A-Z])/g, ' $1')
//             .replace(/^./, str => str.toUpperCase())
//             .replace(/Of|In|To/g, str => str.toLowerCase());
//     };

//     // Helper function to detect date strings
//     const isDateString = (value: string) => {
//         return !isNaN(Date.parse(value)) && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value);
//     };
//     const columns = useMemo(() => {
//         if (data.length === 0) return [];

//         const sampleItem: any = data[0];
//         const excludedKeys = ['leftIcon', 'uploadIcon', 'handIcon']; // Keys to exclude from columns

//         return Object.keys(sampleItem)
//             .filter(key => !excludedKeys.includes(key))
//             .map((key: any) => {
//                 const firstValue = sampleItem[key];
//                 const column: ColumnDef<typeof sampleItem> = {
//                     accessorKey: key,
//                     header: formatHeaderName(key),
//                 };

//                 // Auto-detect type and format accordingly
//                 switch (typeof firstValue) {
//                     case 'number':
//                         if (key.toLowerCase().includes('price') || key.toLowerCase().includes('value')) {
//                             column.cell = ({ row }: any) => (
//                                 <div className="flex items-center">
//                                     <PiCurrencyGbp className="mr-1" />
//                                     {(row.getValue(key) / 100).toFixed(2)}
//                                 </div>
//                             );
//                             column.sortingFn = 'basic';
//                         } else {
//                             column.sortingFn = 'basic';
//                         }
//                         break;

//                     case 'boolean':
//                         column.cell = ({ row }) => (
//                             <div className="flex items-center">
//                                 {row.getValue(key) ? (
//                                     <>
//                                         <FaRegHandPaper className="mr-1 text-green-500" />
//                                         <span>Yes</span>
//                                     </>
//                                 ) : (
//                                     <span className="text-red-500">No</span>
//                                 )}
//                             </div>
//                         );
//                         break;

//                     case 'string':
//                         if (isDateString(firstValue)) {
//                             column.cell = ({ row }) => new Date(row.getValue(key)).toLocaleDateString();
//                             column.sortingFn = 'datetime';
//                         } else {
//                             column.sortingFn = 'text';
//                         }
//                         break;

//                     default:
//                         column.cell = ({ row }) => JSON.stringify(row.getValue(key));
//                         break;
//                 }

//                 return column;
//             });
//     }, [data]);

//     return (
//         <div className="p-4">
//             <CustomTable
//                 data={data}
//                 columns={columns}
//                 defaultSorting={columns.length > 0 ? [{ id: columns[0].accessorKey as string, desc: false }] : []}
//                 className="shadow overflow-hidden border-b border-gray-200 rounded-lg"
//             />
//         </div>
//     );
// };

// export default InventoryTable;

'use client';

import { CustomTable } from '@/components/CustomTable';
import FormController from '@/components/Formcontrols';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import inventoryData from '../Form/form.data';
import inventoryFormFields from '../Form/form.fields';
import Header from './Header';

interface InventoryItem {
    id: string;
    [key: string]: any;
}

const InventoryTable = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            inventory: inventoryData,
        },
    });



    const handleRowSubmit = (rowData: InventoryItem) => {
        console.log('Submitting row:', rowData);
        // API call or other submission logic here
        alert(`Submitted: ${rowData.ticketType || rowData.id}`);
    };



    const columns = useMemo(() => {
        const baseColumns = inventoryFormFields.map((field) => {
            const column: ColumnDef<InventoryItem> = {
                accessorKey: field.name,
                header: field.label,
            };

            column.cell = ({ row }) => (
                <Controller
                    name={`inventory.${row.index}.${field.name}` as any}
                    control={control}
                    rules={{
                        required: field.required ? `${field.label} is required` : false,
                    }}
                    render={({ field: controllerField, fieldState }) => (
                        <div className="p-1 w-[200px]">
                            <FormController
                                field={field}
                                value={controllerField.value}
                                onChange={controllerField.onChange}
                                error={fieldState.error}
                            />
                        </div>
                    )}
                />
            );

            // Set sorting function based on type
            if (field.type === 'number' || field.type === 'currency') {
                column.sortingFn = 'basic';
            } else if (field.type === 'date') {
                column.sortingFn = 'datetime';
            } else {
                column.sortingFn = 'text';
            }

            return column;
        });

        // Add action column
        const actionColumn: ColumnDef<InventoryItem> = {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => handleRowSubmit(row.original)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
                    >
                        Submit Row
                    </button>
                    {row.original.uploadTickets && (
                        <button
                            type="button"
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded"
                        >
                            <FiUpload className="mr-1" />
                            Upload
                        </button>
                    )}
                </div>
            ),
        };

        return [...baseColumns, actionColumn];
    }, [control]);

    return (
        <div className="p-4">
            <CustomTable
                header={<Header />}
                data={control._formValues.inventory}
                columns={columns}
                className="shadow overflow-hidden border-b border-gray-200 rounded-lg"
            />
        </div>
    );
};

export default InventoryTable;

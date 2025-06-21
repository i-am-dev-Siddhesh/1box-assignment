'use client';
import { CustomTable } from '@/components/CustomTable';
import FormController from '@/components/Formcontrols';
import { InventoryService } from '@/services/inventory.service';
import { type ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiUpload } from 'react-icons/fi';
import inventoryFormFields from '../../../constants/form.fields';
import Header from './Header';

const InventoryTable = () => {
    const [items, setItems] = useState<any>([]);
    const { control, reset } = useForm({
        defaultValues: {
            inventory: items,
        },
    });

    useEffect(() => {
        InventoryService.getAll().then((resp) => {
            setItems(resp)
            reset({ inventory: resp });
        }).catch((error) => {
            console.error('Failed to fetch inventory:', error);
        })
    }, []);


    const handleRowSubmit = async (rowData: InventoryItem) => {
        try {
            await InventoryService.create(rowData)
            alert(`Submitted: ${rowData.ticketType || rowData.id}`);
        } catch (err) {
            alert(`Error`);
        }
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

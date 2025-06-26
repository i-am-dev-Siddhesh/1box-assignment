'use client';
import { CustomTable } from '@/components/CustomTable';
import FormController from '@/components/Formcontrols';
import { InventoryService } from '@/services/inventory.service';
import { type ColumnDef } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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



        return [...baseColumns];
    }, [control]);

    return (
        <div className="p-4 relative ">
            <CustomTable
                header={<Header />}
                data={control._formValues.inventory}
                columns={columns}
                enableRowSelection={true}
                onRowSelect={(selected) => console.log('Selected rows:', selected)}
                className="shadow overflow-hidden border-b border-gray-200 rounded-lg"
            />
        </div>
    );
};

export default InventoryTable;

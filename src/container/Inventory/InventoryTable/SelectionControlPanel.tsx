'use client';

import { InventoryService } from "@/services/inventory.service";
import { useLoader } from "src/context/LoaderContext";

interface SelectionControlPanelProps {
    toggleSelectAll: any;
    selectAll: any;
    data: any;
    selectedRowIds: any;
    fetchData: () => void
}

const SelectionControlPanel = ({
    toggleSelectAll,
    selectAll,
    data,
    selectedRowIds,
    fetchData
}: SelectionControlPanelProps) => {
    const { showLoader, hideLoader } = useLoader();

    const getSelectedData = () => {
        return data.filter((_: any, idx: any) => selectedRowIds.has(idx.toString()));
    };

    const handleClone = async () => {
        const selectedData: any = getSelectedData();
        if (!selectedData || selectedData.length === 0) {
            console.warn("No items selected to clone.");
            return;
        }

        const clonedItems = selectedData.map(({ id, createdAt, updatedAt, ...rest }: any) => ({
            ...rest,
            name: rest.name + " - Copy",
        }));

        showLoader();
        try {
            const created = await InventoryService.bulkCreate(clonedItems);
            console.log("Cloned items:", created);
            fetchData()
        } catch (error) {
            console.error("Failed to clone items:", error);
        } finally {
            hideLoader();
        }
    };

    const handleEdit = async () => {
        const selectedData = getSelectedData();

        if (!selectedData || selectedData.length === 0) {
            console.warn("No items selected to update.");
            return;
        }

        showLoader();
        try {
            const updatedItems = await Promise.all(
                selectedData.map((item: any) =>
                    InventoryService.update(item.id, {
                        ...item,
                        name: item.name + " (Edited)",
                    })
                )
            );
            fetchData()
            console.log("Updated items:", updatedItems);
        } catch (error) {
            console.error("Failed to update items:", error);
        } finally {
            hideLoader();
        }
    };

    const handleDelete = async () => {
        const selectedData = getSelectedData();

        if (!selectedData || selectedData.length === 0) {
            console.warn("No items selected to delete.");
            return;
        }

        const idsToDelete = selectedData.map((item: any) => item.id);

        showLoader();
        try {
            const result = await InventoryService.bulkDelete(idsToDelete);
            fetchData()
            console.log(`Deleted items count: ${result.deletedCount}`);
        } catch (error) {
            console.error("Failed to delete items:", error);
        } finally {
            hideLoader();
        }
    };



    return (
        <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm">
            <div className="flex flex-wrap items-center gap-4 mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <label
                        className={`flex items-center space-x-2 cursor-pointer ${selectAll ? "opacity-50" : ""
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={selectAll.size}
                            onChange={() => toggleSelectAll(true)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                            Select all
                        </span>
                    </label>

                    <label
                        className={`flex items-center space-x-2 cursor-pointer ${!selectAll ? "opacity-50" : ""
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={selectAll.size <= 0}
                            onChange={() => toggleSelectAll(false)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                            Deselect all
                        </span>
                    </label>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleClone}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Clone
                    </button>

                    <button
                        onClick={handleEdit}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Edit
                    </button>

                    <button
                        onClick={handleDelete}
                        className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                        Delete
                    </button>


                </div>
            </div>
        </div>
    );
};

export default SelectionControlPanel;

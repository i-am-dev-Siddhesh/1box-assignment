
interface Item {
    id: number;
    name: string;
}

interface SelectionControlPanelProps {
    items?: Item[];
    onClone: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onCancel: () => void;
    toggleSelectAll: any
    selectAll: any
}

const SelectionControlPanel = ({
    onClone,
    onEdit,
    onDelete,
    onCancel,
    toggleSelectAll,
    selectAll
}: SelectionControlPanelProps) => {
    return (
        <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm">
            {/* Control buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    {/* Select All Checkbox */}
                    <label className={`flex items-center space-x-2 cursor-pointer ${selectAll ? 'opacity-50' : ''}`}>
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

                    {/* Deselect All Checkbox */}
                    <label className={`flex items-center space-x-2 cursor-pointer ${!selectAll ? 'opacity-50' : ''}`}>
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
                        onClick={() => onClone()}
                        className={`text-sm font-medium transition-colors  'text-blue-600 hover:text-blue-800'
                            `}
                    >
                        Clone
                    </button>

                    <button
                        onClick={() => onEdit()}
                        className={`text-sm font-medium transition-colors'text-blue-600 hover:text-blue-800'
                            `}
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete()}
                        className={`text-sm font-medium transition-colors  'text-red-600 hover:text-red-800'
                            `}
                    >
                        Delete
                    </button>

                    <button
                        onClick={onCancel}
                        className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SelectionControlPanel;
'use client';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type Cell,
  type ColumnDef,
  type ColumnSort,
  type Header,
  type SortingState,
} from '@tanstack/react-table';
import {
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';

interface ICustomTableProps<TData> {
  header?: ReactNode;
  data: TData[];
  columns: ColumnDef<TData>[];
  defaultSorting?: ColumnSort[];
  className?: string;
  onRowSelect?: (selectedRows: TData[]) => void;
  enableRowSelection?: boolean;
}

export function CustomTable<TData>({
  header,
  data,
  columns,
  defaultSorting = [],
  className = '',
  onRowSelect,
  enableRowSelection = false,
}: ICustomTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());

  const selectAllRef = useRef<HTMLInputElement>(null);

  // Set indeterminate state on select all checkbox
  useEffect(() => {
    if (selectAllRef.current) {
      const total = data.length;
      const selected = selectedRowIds.size;
      selectAllRef.current.indeterminate = selected > 0 && selected < total;
    }
  }, [selectedRowIds, data.length]);

  const toggleAll = (checked: boolean) => {
    const allIds = data.map((_, idx) => idx.toString());
    const newSelection: any = checked ? new Set(allIds) : new Set();
    setSelectedRowIds(newSelection);
    if (onRowSelect) {
      onRowSelect(checked ? data : []);
    }
  };

  const toggleSingle = (
    rowId: string,
    checked: boolean,
    rowData: TData
  ) => {
    const updated = new Set(selectedRowIds);
    if (checked) {
      updated.add(rowId);
    } else {
      updated.delete(rowId);
    }
    setSelectedRowIds(updated);
    if (onRowSelect) {
      const selectedData = data.filter((_, idx) =>
        updated.has(idx.toString())
      );
      onRowSelect(selectedData);
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const renderHeaderContent = (header: Header<TData, unknown>) => {
    const headerContent = header.column.columnDef.header;
    return typeof headerContent === 'function'
      ? headerContent(header.getContext())
      : headerContent;
  };

  const renderCellContent = (cell: Cell<TData, unknown>) => {
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <div className={`overflow-x-hidden ${className} relative`}>
      <table className="divide-y divide-gray-200 overflow-x-hidden">
        <thead className="bg-gray-50 text-white">
          {header}
          {/* {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {enableRowSelection && (
                <th className="px-4 py-2 border-r  border-gray-200 text-center">
                  <input
                    type="checkbox"
                    ref={selectAllRef}
                    onChange={(e) => toggleAll(e.target.checked)}
                    checked={
                      selectedRowIds.size === data.length && data.length > 0
                    }
                  />
                </th>
              )}
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-r border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                    {!header.isPlaceholder && renderHeaderContent(header)}
                    {{
                      asc: '^',
                      desc: '🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))} */}
        </thead>
        <tbody className="bg-white max-w-[100vw] block overflow-x-scroll divide-y divide-gray-200 relative">
          {table.getRowModel().rows.map((row) => {
            const rowIndex = row.index.toString();
            return (
              <tr key={row.id}>
                {enableRowSelection && (
                  <td className="px-4 py-2  border-r  border-gray-200 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRowIds.has(rowIndex)}
                      onChange={(e) =>
                        toggleSingle(rowIndex, e.target.checked, row.original)
                      }
                    />
                  </td>
                )}
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap border-r border-gray-200"
                  >
                    {renderCellContent(cell)}
                  </td>
                ))}
                <td className="sticky right-0  z-10 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.1)] hover:bg-gray-50">
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

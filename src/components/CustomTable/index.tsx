'use client';

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnSort,
  type Header,
  type Cell,
  flexRender,
} from '@tanstack/react-table';
import { ReactNode, useState } from 'react';

interface ICustomTableProps<TData> {
  header: ReactNode,
  data: TData[];
  columns: ColumnDef<TData>[];
  defaultSorting?: ColumnSort[];
  className?: string;
}

export function CustomTable<TData>({
  header,
  data,
  columns,
  defaultSorting = [],
  className = '',
}: ICustomTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);

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
    // Use flexRender for proper cell rendering
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-white">
          {header}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className='border-r border-gray-200'>
                <div className='flex items-center justify-center'>
                  <input type='checkbox' />
                </div>
              </th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-r border-gray-200 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                    {header.isPlaceholder
                      ? null
                      : renderHeaderContent(header)}
                    {{
                      asc: '^',
                      desc: '🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              <td className='border-r border-gray-200'>
                <div className='flex items-center justify-center'>
                  <input type='checkbox' />
                </div>
              </td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                  {renderCellContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
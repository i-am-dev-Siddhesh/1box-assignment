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
import { useState } from 'react';

interface ICustomTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  defaultSorting?: ColumnSort[];
  className?: string;
}

export function CustomTable<TData>({
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
          <tr className='bg-[#130061]'>
            <th className='flex items-center justify-center py-4 w-[50]  border-r border-gray-500' colSpan={1 / 2}>
              <div className=''>
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full  bg-white "></div>
                </div>
              </div>
            </th>
            <th colSpan={2} className='border-r border-gray-500'>
              <div className="text-xl  font-bold">
                Chelsea vs Arsenal - Premier League
              </div>
            </th>
            <th className=' border-r border-gray-500'>
              <div className="">
                <span className="mr-1">©</span>
                <span>Sun, 10 Nov 2024</span>
              </div>
            </th>
            <th className=' border-r border-gray-500'>
              <div className="">
                <span className="mr-1">©</span>
                <span>16:30</span>
              </div>
            </th>
            {/* @ts-ignore */}
            <th colSpan='100%' className=''>
              <div className="flex items-center">
                <span className="ml-5 mr-2">©</span>
                <span>Stamford Bridge, London, United Kingdom</span>
              </div>
            </th>
          </tr>
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
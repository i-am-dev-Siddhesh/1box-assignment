'use client';

import SelectionControlPanel from '@/container/Inventory/InventoryTable/SelectionControlPanel';
import { InventoryService } from '@/services/inventory.service';
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
import { BsUpload } from 'react-icons/bs';
import { FaCaretLeft, FaCaretRight, FaHandPaper } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

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
  const [show, setShow] = useState(true)
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

  const getSelectedData = () => {
    return data.filter((_, idx) => selectedRowIds.has(idx.toString()));
  };

  const handleClone = async () => {
    const selectedData: any = getSelectedData(); // Assuming this returns InventoryItem[]

    if (!selectedData || selectedData.length === 0) {
      console.warn('No items selected to clone.');
      return;
    }

    // Remove `id` and adjust name for each item
    const clonedItems = selectedData.map(({ id, createdAt, updatedAt, ...rest }: any) => ({
      ...rest,
      name: rest.name + ' - Copy',
    }));

    try {
      const created = await InventoryService.bulkCreate(clonedItems);
      console.log('Cloned items:', created);
    } catch (error) {
      console.error('Failed to clone items:', error);
    }
  };

  const handleEdit = async () => {
    const selectedData = getSelectedData();

    if (!selectedData || selectedData.length === 0) {
      console.warn('No items selected to update.');
      return;
    }

    try {
      const updatedItems = await Promise.all(
        selectedData.map((item: any) =>
          InventoryService.update(item.id, {
            ...item,
            name: item.name + ' (Edited)', // Example change
          })
        )
      );

      console.log('Updated items:', updatedItems);
    } catch (error) {
      console.error('Failed to update items:', error);
    }
  };
  const handleDelete = async () => {
    const selectedData = getSelectedData();

    if (!selectedData || selectedData.length === 0) {
      console.warn('No items selected to delete.');
      return;
    }

    const idsToDelete = selectedData.map((item: any) => item.id);

    try {
      const result = await InventoryService.bulkDelete(idsToDelete);

    } catch (error) {
      console.error('Failed to delete items:', error);
    }
  };

  const handleCancel = () => {
    console.log('Operation canceled');
    const selectedData = getSelectedData();
    console.log('Cloning selected data:', selectedData);
  };

  return (
    <div className={`${className} relative`}>
      <table className="divide-y divide-gray-200 border-separate">
        <thead className="bg-gray-50 text-white">
          <tr className='sticky flex gap-5 left-0 top-0 w-[100%]  bg-[#130061] z-20'>
            <th className='flex inherit bg-[#130061] items-center justify-center py-4 w-[50]  border-r border-gray-500'>
              <div className=''>
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full  bg-white "></div>
                </div>
              </div>
            </th>
            <th className='flex items-center pr-2 w-[30%] justify-center bg-[#130061] border-r border-gray-500'>
              <div className="text-xl  font-bold">
                Chelsea vs Arsenal - Premier League
              </div>
            </th>
            <th className='flex items-center pr-5 justify-center bg-[#130061] border-r border-gray-500'>
              <div className="">
                <span className="mr-1">©</span>
                <span>Sun, 10 Nov 2024</span>
              </div>
            </th>
            <th className='flex items-center pr-5 justify-center bg-[#130061] border-r border-gray-500'>
              <div className="">
                <span className="mr-1">©</span>
                <span>16:30</span>
              </div>
            </th>
            {/* @ts-ignore */}
            <th colSpan={2} className='flex w-[44%]  items-center  bg-[#130061]  border-r border-gray-500'>
              <div className="flex items-center">
                <span className="mr-2">©</span>
                <span>Stamford Bridge, London, United Kingdom</span>
              </div>
            </th>

            <th className='flex bg-[#130061] items-center justify-center py-4 w-[50] '>
              {show ? <MdOutlineKeyboardArrowUp size={30} onClick={() => {
                console.log('s');
                setShow(false)
              }} /> :
                <MdOutlineKeyboardArrowDown size={30} onClick={() => setShow(true)} />}
            </th>
          </tr>

        </thead>
        <tbody className="bg-white max-w-[100vw] block overflow-x-scroll divide-y divide-gray-200 relative">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className=''>
              {enableRowSelection && (
                <td className="px-4 py-2 border-r border-gray-200 text-center">
                  <input
                    type="checkbox"
                    ref={selectAllRef}
                    onChange={(e) => toggleAll(e.target.checked)}
                    checked={
                      selectedRowIds.size === data.length && data.length > 0
                    }
                  />
                </td>
              )}
              {headerGroup.headers.map((header) => (
                <td
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
                </td>
              ))}
              <td className={`${show ? 'sticky right-28 z-10 bg-white ' : 'none'} h-full  border-l  border-gray-200  `}>
                <div className='w-18 flex justify-center '>
                  {/* <FaHandPaper size={24} color='#34c7a0' /> */}
                </div>
              </td>

              <td className={`${show ? 'sticky right-10 z-10 bg-white ' : 'none'} h-full  border-gray-200  `}>
                <div className='w-18 flex justify-center'>
                  <FaCaretLeft size={22} style={{
                    position: "relative",
                    right: 25
                  }} color='#b4b7cb' />
                  <FaCaretRight size={22} style={{
                    position: "relative",
                    right: 20
                  }} color='#322275' />
                </div>
              </td>

            </tr>
          ))}
          {table.getRowModel().rows.map((row) => {
            const rowIndex = row.index.toString();
            return (
              <tr key={row.id}>
                {enableRowSelection && (
                  <td className="px-4 py-2 border-t border-r  border-gray-200 text-center">
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
                    className="px-6 py-4 whitespace-nowrap border-t  border-r border-gray-200"
                  >
                    {renderCellContent(cell)}
                  </td>
                ))}

                <td className={`${show ? 'sticky right-28 z-10 bg-white ' : 'none'} h-full border-t border-l  border-gray-200  `}>
                  <div className='w-18 flex justify-center bg-red'>
                    <FaHandPaper size={24} color='#34c7a0' />
                  </div>
                </td>

                <td className={`${show ? 'sticky right-10 z-10 bg-white ' : 'none'} h-full border-t border-l  border-gray-200  `}>
                  <div className='w-18 flex justify-center'>
                    <BsUpload size={24} color="#9d96bd" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <SelectionControlPanel
        onClone={handleClone}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCancel={handleCancel}
        toggleSelectAll={toggleAll}
        selectAll={selectedRowIds}
      />
    </div>
  );
}

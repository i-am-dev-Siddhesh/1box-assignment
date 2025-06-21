'use client';
import DateDisplay from '@/components/DateDisplay';
import CustomDropdown from '@/components/Formcontrols/CustomDropdown';
import TimeDisplay from '@/components/TimeDisplay';
import { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { LuMessageSquareText } from 'react-icons/lu';
import InventoryForm from './Form';
import InventoryTable from './InventoryTable';

const Inventory = () => {
  const [eventVal, setEventVal] = useState('');
  return (
    <div className="flex flex-col gap-10 mt-5">
      {/* Top Section */}
      <div className="flex justify-between gap-2 mx-5 items-center">
        <h3 className="inline text-3xl font-bold text-[#42497B]">
          Add Inventory
        </h3>
        <div className="flex gap-4 items-center ">
          <button
            type="button"
            className="py-2 px-3 text-md focus:outline-none rounded-lg border-2 border-[#0137D5] font-bold focus:z-10 focus:ring-4 focus:ring-gray-100  text-[#0137D5]"
          >
            Request Event
          </button>
          <div className="bg-[#4EBFF2] h-13 w-13 rounded-full  flex items-center justify-center shadow">
            <LuMessageSquareText size={22} color="white" />
          </div>
        </div>
      </div>
      <hr className="text-[#f1f1f6] border-[1.9px]" />

      {/* Event Section */}
      <div className="mx-5  flex w-full items-center">
        <div className="flex gap-5 items-center w-full">
          <div className="w-[40%]">
            <CustomDropdown
              value={eventVal}
              onChange={setEventVal}
              options={['Option 1', 'Option 2', 'Option 3']}
              required={true}
              label="Choose Match Event"
              errorMessage="Please select an option"
            />
          </div>
          <DateDisplay />
          <TimeDisplay />
          <div className="flex  h-full relative gap-2 items-center justify-center bg-white">
            <CiLocationOn
              color="#13aaee"
              size={20}
              style={{ width: 30, height: 30 }}
            />
            <div className="text-md font-light text-gray-700 tracking-wide">
              Stamford Bridge, London, United Kingdom
            </div>
          </div>
          <div className="">
            <p className="font-bold text-[#00A3ED]">View Map</p>
          </div>
        </div>
      </div>
      <hr className="text-[#f1f1f6] border-[1.9px]" />
      <InventoryForm />
      <InventoryTable />
    </div>
  );
};

export default Inventory;

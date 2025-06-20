'use client'

import { LuMessageSquareText } from "react-icons/lu"


const Inventory = () => {
  return (
    <>
      {/* Top Section */}
      <div className="mt-4 mb-4 flex justify-between gap-2">
        <h3 className='inline text-3xl font-bold text-[#42497B]'>Add Inventory</h3>
        <div className="flex gap-4 items-center ">

          <button type="button" className="py-2 px-3 text-md focus:outline-none rounded-lg border-2 border-[#0137D5] font-bold focus:z-10 focus:ring-4 focus:ring-gray-100  text-[#0137D5]">Request Event</button>

          <div className="bg-[#4EBFF2] h-13 w-13 rounded-full  flex items-center justify-center">
            <LuMessageSquareText size={22} color="white" />
          </div>
        </div>
      </div>
      <hr className="text-[#f1f1f6] border-[1.9px]" />
      <div>

      </div>
    </>
  )
}

export default Inventory
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"

const Header = () => {
    return (
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
                <MdOutlineKeyboardArrowUp size={30} />
                {/* <MdOutlineKeyboardArrowDown /> */}

            </th>
        </tr>
    )
}

export default Header
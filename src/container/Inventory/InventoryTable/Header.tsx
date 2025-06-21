import React from 'react'

const Header = () => {
    return (
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
    )
}

export default Header
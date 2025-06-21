'use client'
import { MdAccessTime } from 'react-icons/md';

const TimeDisplay = ({ time = new Date() }) => {
    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div className="flex  h-full relative gap-2 items-center justify-center bg-white ">
            <MdAccessTime color='#13aaee' size={20} />
            <div className="text-md font-light text-gray-700 tracking-wide">
                {formattedTime}
            </div>
        </div>
    );
};

export default TimeDisplay;

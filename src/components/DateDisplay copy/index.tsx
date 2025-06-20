import React from 'react';
import { MdDateRange } from 'react-icons/md';

const DateDisplay = ({ date = new Date('2024-11-10') }) => {
  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="flex h-full relative gap-2 items-center justify-center min-w-[200px] bg-white">
      <MdDateRange color='#13aaee' size={20} />
      <div className="text-md font-light text-gray-700 tracking-wide">
        {formattedDate}
      </div>
    </div>
  );
};

export default DateDisplay;
import React from 'react';

const MatchHeader = () => {
  return (
    <div className="bg-blue-900 text-white rounded-t-lg">
      <div className="container flex flex-wrap items-center">
       
        {/* Match title */}
        <div className="text-xl font-bold mb-2 sm:mb-0">
          Chelsea vs Arsenal - Premier League
        </div>

        {/* Match details */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <span className="mr-1">©</span>
            <span>Sun, 10 Nov 2024</span>
          </div>

          <div className="flex items-center">
            <span className="mr-1">©</span>
            <span>16:30</span>
          </div>

          <div className="flex items-center">
            <span className="mr-1">©</span>
            <span>Stamford Bridge, London, United Kingdom</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
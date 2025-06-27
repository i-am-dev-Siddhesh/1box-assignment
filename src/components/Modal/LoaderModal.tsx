'use client';
import React from 'react';

interface LoaderModalProps {
  isLoading: boolean
  message?: string;
}

export const LoaderModal: React.FC<LoaderModalProps> = ({ isLoading, message = 'Loading...' }) => {
  if (!isLoading) {
    return <></>
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white px-6 py-4 rounded-xl flex flex-col items-center space-y-4 shadow-lg">
        <div className="loader w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 text-sm">{message}</p>
      </div>
    </div>
  );
};

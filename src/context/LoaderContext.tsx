'use client';
import { LoaderModal } from '@/components/Modal/LoaderModal';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoaderContextProps {
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      <LoaderModal isLoading={isLoading} />

    </LoaderContext.Provider>
  );
};

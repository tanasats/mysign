'use client'
import { createContext, useContext, useState } from 'react';

 interface dataObject {
   id: string;
   fullname: string;
 }

interface TestContextType {
  data: dataObject|null;
  setData:any;
}
// Create the context with default values
const TestContext = createContext<TestContextType|undefined>({
  data:null,
  setData:()=>{},
});

// Custom hook to use the UserContext
export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTestContext must be used within a TestProvider');
  }
  return context;
};

// Provider component
export const TestProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<dataObject|null>(null);
  return (
    <TestContext.Provider value={{ data, setData }}>
      {children}
    </TestContext.Provider>
  );
};
import React, { createContext, useContext, useState } from 'react';

// Create Sidebar Context
const SidebarContext = createContext();

// Custom hook to use Sidebar context
export const useSidebar = () => useContext(SidebarContext);

// Sidebar Provider component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

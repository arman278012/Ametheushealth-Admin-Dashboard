import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [editAllCattegoriesForm, setEditAllCategoriesForm] = useState(false);

  return (
    <AppContext.Provider
      value={{ editAllCattegoriesForm, setEditAllCategoriesForm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

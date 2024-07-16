import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [editAllCattegoriesForm, setEditAllCategoriesForm] = useState(false);
  const [editGenericForm, setEditGenericForm] = useState(false);

  return (
    <AppContext.Provider
      value={{
        editAllCattegoriesForm,
        setEditAllCategoriesForm,
        editGenericForm,
        setEditGenericForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

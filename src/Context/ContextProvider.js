import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [editAllCattegoriesForm, setEditAllCategoriesForm] = useState(false);
  const [editGenericForm, setEditGenericForm] = useState(false);
  const [editManufacturerForm, setEditManufacturerForm] = useState(false);
  const [editCouponForm, setEditCouponForm] = useState(false);

  return (
    <AppContext.Provider
      value={{
        editAllCattegoriesForm,
        setEditAllCategoriesForm,
        editGenericForm,
        setEditGenericForm,
        editManufacturerForm,
        setEditManufacturerForm,
        editCouponForm,
        setEditCouponForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

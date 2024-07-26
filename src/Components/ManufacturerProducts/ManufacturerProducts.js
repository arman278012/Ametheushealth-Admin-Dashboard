import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectManufacturerId } from "../../redux/slice/ManufacturerIdSlice";
import axios from "axios";

const ManufacturerProducts = () => {
  const [manufacturersProducts, setManufacturersProducts] = useState([]);

  const manufacturerId = useSelector(selectManufacturerId);

  const getManufacturersProducts = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/manufacturer/${manufacturerId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setManufacturersProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getManufacturersProducts();
  }, []);

  return (
    <div>
      <p>{manufacturerId}</p>
      <p>ManufacturerProducts</p>
    </div>
  );
};

export default ManufacturerProducts;

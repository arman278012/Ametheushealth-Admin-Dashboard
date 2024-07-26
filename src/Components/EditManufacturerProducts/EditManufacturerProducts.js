import React from "react";
import { useParams } from "react-router-dom";

const EditManufacturerProducts = () => {
  const { id } = useParams();

  console.log(id)

  return (
    <div>
      <p>EditManufacturerProducts</p>
    </div>
  );
};

export default EditManufacturerProducts;

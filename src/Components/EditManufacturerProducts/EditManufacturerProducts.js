import React from "react";
import { useParams } from "react-router-dom";

const EditManufacturerProducts = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <div className="flex flex-col gap-3 px-5 py-2 ">
      <div className="overflow-x-auto p-5 bg-gray-300">
        <div className="flex flex-col gap-3">
          <p className="font-bold">Edit Manufacturer Products</p>
        </div>
      </div>
    </div>
  );
};

export default EditManufacturerProducts;

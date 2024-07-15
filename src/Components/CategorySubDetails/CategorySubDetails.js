import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategorySubDetails = () => {
  const { sid } = useParams();

  const [subCategoryData, setSubCategoryData] = useState([]);

  const categorySubDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/category/${sid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setSubCategoryData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categorySubDetails();
  }, []);

  return (
    <div>
      <p>category Sub details</p>
    </div>
  );
};

export default CategorySubDetails;

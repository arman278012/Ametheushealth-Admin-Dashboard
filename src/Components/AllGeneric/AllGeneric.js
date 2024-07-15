import axios from "axios";
import React, { useEffect, useState } from "react";

const AllGeneric = () => {
  const [genericData, setGenericData] = useState([]);

  const allGenericData = async () => {
    try {
      const response = await axios.get(
        "https://api.assetorix.com:4100/ah/api/v1/generic",
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericData(response.data);
      console.log(genericData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allGenericData();
  }, []);

  return (
    <div>
      <p>All Generic </p>
    </div>
  );
};

export default AllGeneric;

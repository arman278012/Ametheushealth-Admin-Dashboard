import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/ContextProvider";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectGenericId } from "../../redux/slice/GetGenericIdSlice";
import axios from "axios";

const EditGenericForm = () => {
  const { editGenericForm, setEditGenericForm } = useContext(AppContext);
  const genericId = useSelector(selectGenericId);
  console.log("Generic Id", genericId);

  const [genericData, setGenericData] = useState([]);

  //getting details for editing

  const editGenericData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/generic/${genericId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log("data", genericData);
      setGenericData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    editGenericData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 z-50 w-[80%] relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          onClick={() => setEditGenericForm(false)}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl mb-4 font-bold">Edit Generic Form</h2>
      </div>
    </div>
  );
};

export default EditGenericForm;

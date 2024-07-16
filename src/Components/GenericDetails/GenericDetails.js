import React, { useEffect, useState } from "react";
import { selectGenericId } from "../../redux/slice/GetGenericIdSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import parse from "html-react-parser";

const GenericDetails = () => {
  const genericId = useSelector(selectGenericId);
  console.log(genericId);

  const [genericData, setGenericData] = useState([]);

  const getGenericDetails = async () => {
    try {
      const response = await axios(
        `https://api.assetorix.com:4100/ah/api/v1/generic/${genericId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setGenericData(response.data.data);
      console.log("Data", genericData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenericDetails();
  }, []);

  return (
    <>
      <div className="bg-gray-100 p-5">
        <div className="parent flex flex-col gap-10 px-10 py-5 bg-white">
          <div>
            <p className="font-bold uppercase">{genericData.name}</p>
            
          </div>

          <div className="main-content w-[100%] flex flex-col gap-10">
            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="  uppercase">{genericData.name} Uses</p>
              <div className="bg-gray-300 h-[1px] w-[270px] mt-1"></div>

              <div className="text-justify">
                {parse(`<p>${genericData?.uses}</p>`)}
              </div>
            </div>

            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="uppercase">Side Effects of {genericData.name}</p>
              <div className="bg-gray-300 h-[1px] w-[270px] mt-1"></div>
              <div className="text-justify">
                {parse(`<p>${genericData?.sideEffects}</p>`)}
              </div>
            </div>

            <div className="information w-[100%] bg-gray-100 shadow-md p-5">
              <p className="uppercase">
                Expert Advice for {genericData.name}
              </p>
              <div className="bg-gray-300 h-[1px] w-[270px] mt-1"></div>

              <div className="text-justify">
                {parse(`<p>${genericData?.expertAdvice}</p>`)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenericDetails;

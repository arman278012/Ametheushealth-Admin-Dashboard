import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const CategoryDataDetails = () => {
  const [individualData, setIndividualData] = useState({});

  const { id } = useParams();
  console.log(id);

  const getIndividualData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      console.log(individualData);
      setIndividualData(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIndividualData();
  }, []);

  const placeholderImage = "https://via.placeholder.com/150";

  return (
    <div className="bg-gray-100 p-5 ">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div>
            <p className="font-bold text-2xl text-[#13a3bc] uppercase">
              {individualData?.name}
            </p>
            <div className="h-[1px] w-full bg-[#13a3bc] mt-1"></div>
          </div>

          <div className="h-[200px] w-[200px] mt-10">
            <img src={individualData?.image} className="h-[200px] w-[200px]" />
          </div>

          {/* <div>{parse(`<p>${individualData?.description}</p>`)}</div> */}
          <div>{individualData?.metaTags?.split(",")}</div>
        </div>

        {/* children section cards is here */}
        <div>
          <p className="text-center font-bold text-2xl mb-5 mt-5">Children</p>
          <div className="grid grid-cols-3 gap-5">
            {individualData?.children?.map((child) => (
              <div className="flex flex-col gap-2 bg-white px-5 py-3 shadow-md rounded-xl">
                 <div className="flex justify-center">
                  <img
                    src={child.image ? child.image : placeholderImage}
                    alt="Image"
                    className=""
                  />
                </div>
                <p className="text-center font-bold text-xl text-[#13a3bc]">
                  {child.name}
                </p>
                {/* <p className="text-center font-semibold">{child.metaTitle}</p> */}
               

                {/* <p className=" text-justify">
                  {" "}
                  {parse(`<p>${child.description?.slice(0, 100)}...</p>`)}
                </p> */}
                {/* <p className="text-center font-noraml">
                   {child.createdAt.split("T")[0]}
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDataDetails;

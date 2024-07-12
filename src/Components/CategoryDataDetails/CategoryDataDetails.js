import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DocViewer from "react-doc-viewer";

const CategoryDataDetails = () => {
  const [individualData, setIndividualData] = useState(null);
  const { id } = useParams();

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
      setIndividualData(response.data.category);
      console.log(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIndividualData();
  }, [id]);

  const placeholderImage = "https://via.placeholder.com/150";
  const thumbnail = "https://placehold.co/600x400";

  // Function to handle click on document thumbnail to open in new tab
  const handleDocumentThumbnailClick = () => {
    if (individualData?.docFileURL) {
      window.open(individualData.docFileURL, "_blank");
    }
  };

  if (!individualData) {
    return (
      <div className="bg-gray-100 p-5">
        <div className="parent flex px-10 py-5 bg-white">
          <div className="left flex flex-col gap-5 w-[60%]">
            <Skeleton height={40} width={200} />
            <Skeleton height={20} width={150} />
            <Skeleton count={3} />
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
          </div>
          <div className="right w-[40%] flex justify-end">
            <Skeleton height={300} width={300} />
          </div>
        </div>
        <div className="children-section mt-5">
          <p className="text-center font-bold text-2xl mb-5">Children</p>
          <div className="grid grid-cols-3 gap-5">
            <Skeleton height={200} count={3} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-5">
      <div className="parent flex px-10 py-5 bg-white">
        <div className="left flex flex-col gap-5 w-[60%]">
          <div className="Name">
            <p className="font-bold text-2xl text-[#13a3bc] uppercase">
              {individualData?.name}
            </p>
          </div>

          <div className="Slug">
            <p className="font-bold text-md text-[#13a3bc]">
              {individualData?.slug}
            </p>
          </div>

          <div className="description">
            <p className="text-justify font-semibold">
              {parse(`<p>${individualData?.description}</p>`)}
            </p>
          </div>

          <div>
            <div className="parent-id">
              <p className="font-bold text-md">
                ParentId:{" "}
                <span className="font-semibold">{individualData?._id}</span>
              </p>
            </div>

            <div className="created-At">
              <p className="font-bold text-md ">
                Create At:{" "}
                <span className="font-semibold">
                  {individualData?.createdAt?.split("T")[0]}
                </span>
              </p>
            </div>

            <div className="created-At">
              <p className="font-bold text-md">
                Modified At:{" "}
                <span className="font-semibold">
                  {individualData?.lastModified?.split("T")[0]}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="right w-[40%] flex justify-end">
          <div className="image">
            <img
              src={individualData?.image || placeholderImage}
              className="h-[300px] w-[300px] "
              alt="Category"
            />
            {individualData?.docFileURL ? (
              <>
                <div className="relative w-full h-[200px] mt-4">
                  <DocViewer documents={individualData?.docFileURL} />
                  {/* <img
                    src={thumbnail}
                    alt="Document Thumbnail"
                    className="w-full h-full cursor-pointer"
                    onClick={handleDocumentThumbnailClick}
                  /> */}
                </div>
                <a
                  href={individualData.docFileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="mt-2 inline-block bg-[#13a3bc] hover:bg-[#13b6d5] text-white py-2 px-4 rounded w-full text-center"
                >
                  Download Document
                </a>
              </>
            ) : (
              <p>No document available</p>
            )}
          </div>
        </div>
      </div>

      <div className="children-section mt-5">
        <p className="text-center font-bold text-2xl mb-5">Children</p>
        <div className="grid grid-cols-3 gap-5">
          {individualData?.children?.map((child) => (
            <div
              key={child.id}
              className="flex flex-col gap-2 bg-white px-5 py-3 shadow-md rounded-xl"
            >
              <div className="flex justify-center">
                <img
                  src={child.image ? child.image : placeholderImage}
                  alt="Child"
                  className=""
                />
              </div>
              <p className="text-center font-bold text-xl text-[#13a3bc]">
                {child.name}
              </p>
              {/* Uncomment the following lines if needed */}
              {/* <p className="text-center font-semibold">{child.metaTitle}</p> */}
              {/* <p className="text-justify">{parse(`<p>${child.description?.slice(0, 100)}...</p>`)}</p> */}
              {/* <p className="text-center font-normal">{child.createdAt.split("T")[0]}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDataDetails;

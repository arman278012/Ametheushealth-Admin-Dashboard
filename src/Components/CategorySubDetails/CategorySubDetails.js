import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import Viewer from "react-viewer";
import parse from "html-react-parser";

const CategorySubDetails = () => {
  const { sid } = useParams();

  const [subCategoryData, setSubCategoryData] = useState([]);
  const [showViewer, setShowViewer] = useState(false);

  const navigate = useNavigate();

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
      console.log(subCategoryData);
      setSubCategoryData(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categorySubDetails();
  }, []);

  const handleCloseViewer = () => {
    setShowViewer(false);
  };

  const handleDocumentThumbnailClick = () => {
    setShowViewer(true);
  };

  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const placeholderImage = "https://placehold.co/600x400?text=No+Image";

  if (!categorySubDetails) {
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
      <div className="parent flex gap-10 px-10 py-5 bg-white">
        <div className="left flex flex-col gap-5 w-[60%]">
          <div className="Name">
            <p className="font-bold text-2xl text-[#13a3bc] uppercase">
              {subCategoryData?.name}
            </p>
            <div className="Slug">
              <p className="font-bold text-md text-[#ce3131]">
                {subCategoryData?.slug}
              </p>
            </div>
          </div>

          <div className="description">
            <p className="text-justify font-semibold">
              {parse(`<p>${subCategoryData?.description}</p>`)}
            </p>
          </div>

          <div>
            <div className="parent-id">
              {subCategoryData.parent && (
                <p className="font-bold text-md">
                  ParentID:{" "}
                  <span className="font-normal">{subCategoryData?.parent}</span>
                </p>
              )}
            </div>

            <div className="parent-id">
              {subCategoryData.parent && (
                <p className="font-bold text-md">
                  Parent Name:{" "}
                  <span className="font-normal">
                    {subCategoryData?.parentName}
                  </span>
                </p>
              )}
            </div>

            <div className="parent-id">
              {subCategoryData.parent && (
                <p className="font-bold text-md">
                  Parent Slug:{" "}
                  <span className="font-normal">
                    {subCategoryData?.parentSlug}
                  </span>
                </p>
              )}
            </div>

            <div className="created-At">
              <p className="font-bold text-md">
                Created At:{" "}
                <span className="font-normal">
                  {subCategoryData?.createdAt
                    ? formatDate(subCategoryData.createdAt.split("T")[0])
                    : "N/A"}
                </span>
              </p>
            </div>

            <div className="modified-At">
              <p className="font-bold text-md">
                Modified At:{" "}
                <span className="font-normal">
                  {subCategoryData?.lastModified
                    ? formatDate(subCategoryData.lastModified.split("T")[0])
                    : "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="right w-[40%] flex justify-end">
          <div className="image">
            <img
              src={subCategoryData?.image || placeholderImage}
              className="w-[300px] "
              alt="Category"
            />
            {subCategoryData?.docFileURL ? (
              <div className="mt-4">
                <img
                  src={subCategoryData?.docFileURL}
                  alt="Document Thumbnail"
                  onClick={handleDocumentThumbnailClick}
                  style={{
                    cursor: "pointer",
                    maxWidth: "20%",
                    height: "auto",
                  }}
                />
                <Viewer
                  className="w-[200px]"
                  visible={showViewer}
                  onClose={handleCloseViewer}
                  images={[
                    { src: subCategoryData?.docFileURL, alt: "Document" },
                  ]}
                />
                <a
                  href={subCategoryData.docFileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="mt-2 inline-block bg-[#13a3bc] hover:bg-[#13b6d5] text-white py-2 px-4 rounded w-full text-center"
                >
                  Download Document
                </a>
              </div>
            ) : (
              <p className="mt-4">No document available</p>
            )}
          </div>
        </div>
      </div>

      <div className="children-section mt-5">
        <p className="text-center font-bold text-2xl mb-5">Children</p>
        <div className="grid grid-cols-3 gap-5">
          {subCategoryData?.children?.map((child) => (
            <div
              onClick={() => navigate(`${child._id}`)}
              key={child._id}
              className="flex flex-col gap-2 bg-white px-5 py-3 shadow-md rounded-xl cursor-pointer"
            >
              <div className="flex justify-center">
                <img
                  src={child.image || placeholderImage}
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

export default CategorySubDetails;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { selectGenericId } from "../../redux/slice/GetGenericIdSlice";
import TabSection from "../TabSection/TabSection";

const SingleProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generic, setGenericData] = useState([]);
  const [storeGenericID, setStoreGenericID] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    // Fetch product data when the component mounts or the id changes
    const getSingleProductData = async () => {
      try {
        const response = await axios.get(
          `https://api.assetorix.com:4100/ah/api/v1/product/admin/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authorization")}`,
              id: localStorage.getItem("id"),
            },
          }
        );
        const productData = response?.data?.data;
        const genericID = productData.genericID;
        setStoreGenericID(genericID);
        setProduct(productData);
        console.log(product);
        console.log(product?.variants[0]?.currency);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleProductData();
  }, [id]); // Dependency array ensures the effect runs when id changes

  const fetchGenericData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com:4100/ah/api/v1/generic/${storeGenericID}`
      );
      setGenericData(response.data);
      console.log(generic);
    } catch (error) {
      console.error("Error fetching generic data:", error);
    }
  };

  useEffect(() => {
    fetchGenericData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex gap-5 w-full h-full lg:h-max p-4 mt-10">
        <div className="flex items-center h-max p-2 lg:items-start lg:flex-col flex-col-reverse border">
          <div className="upper">
            {loading ? (
              <div className="flex justify-center items-center min-h-screen">
                <div className="loader"></div>
              </div>
            ) : (
              <img
                loading="lazy"
                className="h-64 w-max lg:h-[350px] lg:w-[400px] bg-cover border-collapse"
                src={product.images?.[0]?.url || "default-image-url"} // Provide a fallback image URL
                alt={product.images?.[0]?.alt || "default alt text"} // Provide a fallback alt text
              />
            )}
          </div>
          <div className="flex justify-between w-[-webkit-fill-available] sm:mt-10 lg:mt-0 lg:ml-10 sm:mx-0 mx-5 mt-2">
            <div>
              {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                  <div className="loader"></div>
                </div>
              ) : (
                <p className="border-2 text-center rounded-md border-[#00768a] leading-none w-max px-2 py-2 text-[#00768a]">
                  <span></span>
                  {/* {product?.variants[0]?.currency}{" "} */}
                  {product?.selectedVariant?.price ||
                    product?.variants?.[0]?.price}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className=" sm:p-10 p-4 lg:p-4 w-full h-max lg:w-1/2">
          <h2 className="sm:text-3xl text:xl font-semibold mb-5">
            {product?.title}
          </h2>
          <p className="text-base font-medium my-2">
            <b> SKU: </b>
            <span className="font-normal text-base">
              {product?.selectedVariant?.sku || product?.variants?.[0]?.sku}
            </span>
          </p>
          <p className="text-base font-medium my-2">
            <b>Generic: </b>

            <span className="font-normal text-base">{product?.generic}</span>
          </p>
          <p className="text-base my-2 text-[#4F7942] font-bold">
            <b>Treatment: </b>

            <span className="font-normal text-base">{product?.treatment}</span>
          </p>
          <p className="text-base font-medium my-2">
            <b>Pack size: </b>

            <span className="font-normal text-base">
              {product.selectedVariant?.packSize ||
                product.variants?.[0]?.packSize}
            </span>
          </p>
          <p className="text-base font-medium my-2">
            <b>Country Origin: </b>

            <span className="font-normal text-base">
              {product?.originCountry}
            </span>
          </p>
          <p className="text-base font-medium my-2">
            <b> Manufacturer: </b>

            <Link to={`/manufacturer/${product.manufacturerID}`}>
              <span className="font-normal text-base underline underline-offset-2">
                {product?.manufacturer}
              </span>
            </Link>
          </p>
          <div>
            {product.variants?.length > 0 && (
              <div className="flex flex-wrap my-5 items-center ">
                {product.variants.map((variant) => (
                  <button
                    key={variant._id}
                    className={`border shadow-sm h-min border-gray-200 pb-1 rounded-md py-1 text-sm px-4 mr-5 ${
                      product.selectedVariant?._id === variant._id
                        ? "bg-gray-200"
                        : ""
                    }`}
                    // onClick={() => handleVariantSelect(variant)}
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                      textDecoration: !variant.isStockAvailable
                        ? "line-through"
                        : "none",
                      pointerEvents: variant.isStockAvailable ? "auto" : "none",
                      opacity: variant.isStockAvailable ? 1 : 0.5,
                    }}
                    disabled={!variant.isStockAvailable}
                  >
                    <div className="flex flex-col">
                      <span className="text-gray-500 font-semibold">
                        Price: {variant.price}
                      </span>
                      {variant.packSize}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <hr />
        </div>
        {product.genericID && (
          <div className="sm:w-[20vw] w-[100%] sm:ml-10 sm:mt-0 mt-10 sm:h-[80vh] sm:overflow-hidden  cursor-pointer">
            <h3 className="text-lg font-semibold mb-2  ">Similar Products</h3>
            <Slider {...settings}>
              {generic?.data?.products?.map((similarProduct) => (
                <div
                  className="border p-2 hover:shadow-md"
                  key={similarProduct._id}
                  // onClick={() =>
                  //   handleCardClick(similarProduct._id, similarProduct.slug)
                  // }
                >
                  <img
                    loading="lazy"
                    src={similarProduct.images?.[0]?.url || "default-image-url"}
                    alt={similarProduct.images?.[0]?.url || "Ametheus text"}
                    className="sm:h-[6.8rem] h-[20vh] mx-auto sm:w-20 w-auto bg-cover"
                  />
                  <p className="text-center text-sm mt-2">
                    {similarProduct.title}
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
      <div className="container mx-auto mt-10">
        <TabSection
          description={product?.description}
          sideEffects={product?.sideEffects}
          additionalInformation={product?.additionalInformation}
          moreInformation={product?.moreInformation}
          faq={product?.faq}
        />
      </div>
    </>
  );
};

export default SingleProductDetails;

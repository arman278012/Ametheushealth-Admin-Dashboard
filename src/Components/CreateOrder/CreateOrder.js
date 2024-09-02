import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdDeleteOutline,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import {
  fetchGetProductsData,
  setPage,
  setSearchQuery,
  setPageLimit,
} from "../../redux/slice/GetProductsSlice";

const countryOptions = [
  { value: "AFGHANISTAN", label: "Afghanistan" },
  { value: "ALBANIA", label: "Albania" },
  { value: "ALGERIA", label: "Algeria" },
  { value: "ANDORRA", label: "Andorra" },
  { value: "ANGOLA", label: "Angola" },
  { value: "ANTIGUA AND BARBUDA", label: "Antigua and Barbuda" },
  { value: "ARGENTINA", label: "Argentina" },
  { value: "ARMENIA", label: "Armenia" },
  { value: "AUSTRALIA", label: "Australia" },
  { value: "AUSTRIA", label: "Austria" },
  { value: "AZERBAIJAN", label: "Azerbaijan" },
  { value: "BAHAMAS", label: "Bahamas" },
  { value: "BAHRAIN", label: "Bahrain" },
  { value: "BANGLADESH", label: "Bangladesh" },
  { value: "BARBADOS", label: "Barbados" },
  { value: "BELARUS", label: "Belarus" },
  { value: "BELGIUM", label: "Belgium" },
  { value: "BELIZE", label: "Belize" },
  { value: "BENIN", label: "Benin" },
  { value: "BHUTAN", label: "Bhutan" },
  { value: "BOLIVIA", label: "Bolivia" },
  { value: "BOSNIA AND HERZEGOVINA", label: "Bosnia and Herzegovina" },
  { value: "BOTSWANA", label: "Botswana" },
  { value: "BRAZIL", label: "Brazil" },
  { value: "BRUNEI", label: "Brunei" },
  { value: "BULGARIA", label: "Bulgaria" },
  { value: "BURKINA FASO", label: "Burkina Faso" },
  { value: "BURUNDI", label: "Burundi" },
  { value: "CABO VERDE", label: "Cabo Verde" },
  { value: "CAMBODIA", label: "Cambodia" },
  { value: "CAMEROON", label: "Cameroon" },
  { value: "CANADA", label: "Canada" },
  { value: "CENTRAL AFRICAN REPUBLIC", label: "Central African Republic" },
  { value: "CHAD", label: "Chad" },
  { value: "CHILE", label: "Chile" },
  { value: "CHINA", label: "China" },
  { value: "COLOMBIA", label: "Colombia" },
  { value: "COMOROS", label: "Comoros" },
  {
    value: "CONGO, DEMOCRATIC REPUBLIC OF THE",
    label: "Congo, Democratic Republic of the",
  },
  { value: "CONGO, REPUBLIC OF THE", label: "Congo, Republic of the" },
  { value: "COSTA RICA", label: "Costa Rica" },
  { value: "CÔTE D'IVOIRE", label: "Côte d'Ivoire" },
  { value: "CROATIA", label: "Croatia" },
  { value: "CUBA", label: "Cuba" },
  { value: "CYPRUS", label: "Cyprus" },
  { value: "CZECH REPUBLIC", label: "Czech Republic" },
  { value: "DENMARK", label: "Denmark" },
  { value: "DJIBOUTI", label: "Djibouti" },
  { value: "DOMINICA", label: "Dominica" },
  { value: "DOMINICAN REPUBLIC", label: "Dominican Republic" },
  { value: "ECUADOR", label: "Ecuador" },
  { value: "EGYPT", label: "Egypt" },
  { value: "EL SALVADOR", label: "El Salvador" },
  { value: "EQUATORIAL GUINEA", label: "Equatorial Guinea" },
  { value: "ERITREA", label: "Eritrea" },
  { value: "ESTONIA", label: "Estonia" },
  { value: "ESWATINI", label: "Eswatini" },
  { value: "ETHIOPIA", label: "Ethiopia" },
  { value: "FIJI", label: "Fiji" },
  { value: "FINLAND", label: "Finland" },
  { value: "FRANCE", label: "France" },
  { value: "GABON", label: "Gabon" },
  { value: "GAMBIA", label: "Gambia" },
  { value: "GEORGIA", label: "Georgia" },
  { value: "GERMANY", label: "Germany" },
  { value: "GHANA", label: "Ghana" },
  { value: "GREECE", label: "Greece" },
  { value: "GRENADA", label: "Grenada" },
  { value: "GUATEMALA", label: "Guatemala" },
  { value: "GUINEA", label: "Guinea" },
  { value: "GUINEA-BISSAU", label: "Guinea-Bissau" },
  { value: "GUYANA", label: "Guyana" },
  { value: "HAITI", label: "Haiti" },
  { value: "HONDURAS", label: "Honduras" },
  { value: "HUNGARY", label: "Hungary" },
  { value: "ICELAND", label: "Iceland" },
  { value: "INDIA", label: "India" },
  { value: "INDONESIA", label: "Indonesia" },
  { value: "IRAN", label: "Iran" },
  { value: "IRAQ", label: "Iraq" },
  { value: "IRELAND", label: "Ireland" },
  { value: "ISRAEL", label: "Israel" },
  { value: "ITALY", label: "Italy" },
  { value: "JAMAICA", label: "Jamaica" },
  { value: "JAPAN", label: "Japan" },
  { value: "JORDAN", label: "Jordan" },
  { value: "KAZAKHSTAN", label: "Kazakhstan" },
  { value: "KENYA", label: "Kenya" },
  { value: "KIRIBATI", label: "Kiribati" },
  { value: "KOREA, NORTH", label: "Korea, North" },
  { value: "KOREA, SOUTH", label: "Korea, South" },
  { value: "KOSOVO", label: "Kosovo" },
  { value: "KUWAIT", label: "Kuwait" },
  { value: "KYRGYZSTAN", label: "Kyrgyzstan" },
  { value: "LAOS", label: "Laos" },
  { value: "LATVIA", label: "Latvia" },
  { value: "LEBANON", label: "Lebanon" },
  { value: "LESOTHO", label: "Lesotho" },
  { value: "LIBERIA", label: "Liberia" },
  { value: "LIBYA", label: "Libya" },
  { value: "LIECHTENSTEIN", label: "Liechtenstein" },
  { value: "LITHUANIA", label: "Lithuania" },
  { value: "LUXEMBOURG", label: "Luxembourg" },
  { value: "MADAGASCAR", label: "Madagascar" },
  { value: "MALAWI", label: "Malawi" },
  { value: "MALAYSIA", label: "Malaysia" },
  { value: "MALDIVES", label: "Maldives" },
  { value: "MALI", label: "Mali" },
  { value: "MALTA", label: "Malta" },
  { value: "MARSHALL ISLANDS", label: "Marshall Islands" },
  { value: "MAURITANIA", label: "Mauritania" },
  { value: "MAURITIUS", label: "Mauritius" },
  { value: "MEXICO", label: "Mexico" },
  { value: "MICRONESIA", label: "Micronesia" },
  { value: "MOLDOVA", label: "Moldova" },
  { value: "MONACO", label: "Monaco" },
  { value: "MONGOLIA", label: "Mongolia" },
  { value: "MONTENEGRO", label: "Montenegro" },
  { value: "MOROCCO", label: "Morocco" },
  { value: "MOZAMBIQUE", label: "Mozambique" },
  { value: "MYANMAR", label: "Myanmar" },
  { value: "NAMIBIA", label: "Namibia" },
  { value: "NAURU", label: "Nauru" },
  { value: "NEPAL", label: "Nepal" },
  { value: "NETHERLANDS", label: "Netherlands" },
  { value: "NEW ZEALAND", label: "New Zealand" },
  { value: "NICARAGUA", label: "Nicaragua" },
  { value: "NIGER", label: "Niger" },
  { value: "NIGERIA", label: "Nigeria" },
  { value: "NORTH MACEDONIA", label: "North Macedonia" },
  { value: "NORWAY", label: "Norway" },
  { value: "OMAN", label: "Oman" },
  { value: "PAKISTAN", label: "Pakistan" },
  { value: "PALAU", label: "Palau" },
  { value: "PALESTINE", label: "Palestine" },
  { value: "PANAMA", label: "Panama" },
  { value: "PAPUA NEW GUINEA", label: "Papua New Guinea" },
  { value: "PARAGUAY", label: "Paraguay" },
  { value: "PERU", label: "Peru" },
  { value: "PHILIPPINES", label: "Philippines" },
  { value: "POLAND", label: "Poland" },
  { value: "PORTUGAL", label: "Portugal" },
  { value: "QATAR", label: "Qatar" },
  { value: "ROMANIA", label: "Romania" },
  { value: "RUSSIA", label: "Russia" },
  { value: "RWANDA", label: "Rwanda" },
  { value: "SAINT KITTS AND NEVIS", label: "Saint Kitts and Nevis" },
  { value: "SAINT LUCIA", label: "Saint Lucia" },
  {
    value: "SAINT VINCENT AND THE GRENADINES",
    label: "Saint Vincent and the Grenadines",
  },
  { value: "SAMOA", label: "Samoa" },
  { value: "SAN MARINO", label: "San Marino" },
  { value: "SAO TOME AND PRINCIPE", label: "Sao Tome and Principe" },
  { value: "SAUDI ARABIA", label: "Saudi Arabia" },
  { value: "SENEGAL", label: "Senegal" },
  { value: "SERBIA", label: "Serbia" },
  { value: "SEYCHELLES", label: "Seychelles" },
  { value: "SIERRA LEONE", label: "Sierra Leone" },
  { value: "SINGAPORE", label: "Singapore" },
  { value: "SLOVAKIA", label: "Slovakia" },
  { value: "SLOVENIA", label: "Slovenia" },
  { value: "SOLOMON ISLANDS", label: "Solomon Islands" },
  { value: "SOMALIA", label: "Somalia" },
  { value: "SOUTH AFRICA", label: "South Africa" },
  { value: "SOUTH SUDAN", label: "South Sudan" },
  { value: "SPAIN", label: "Spain" },
  { value: "SRI LANKA", label: "Sri Lanka" },
  { value: "SUDAN", label: "Sudan" },
  { value: "SURINAME", label: "Suriname" },
  { value: "SWEDEN", label: "Sweden" },
  { value: "SWITZERLAND", label: "Switzerland" },
  { value: "SYRIA", label: "Syria" },
  { value: "TAIWAN", label: "Taiwan" },
  { value: "TAJIKISTAN", label: "Tajikistan" },
  { value: "TANZANIA", label: "Tanzania" },
  { value: "THAILAND", label: "Thailand" },
  { value: "TIMOR-LESTE", label: "Timor-Leste" },
  { value: "TOGO", label: "Togo" },
  { value: "TONGA", label: "Tonga" },
  { value: "TRINIDAD AND TOBAGO", label: "Trinidad and Tobago" },
  { value: "TUNISIA", label: "Tunisia" },
  { value: "TURKEY", label: "Turkey" },
  { value: "TURKMENISTAN", label: "Turkmenistan" },
  { value: "TUVALU", label: "Tuvalu" },
  { value: "UGANDA", label: "Uganda" },
  { value: "UKRAINE", label: "Ukraine" },
  { value: "UNITED ARAB EMIRATES", label: "United Arab Emirates" },
  { value: "UNITED KINGDOM", label: "United Kingdom" },
  { value: "UNITED STATES", label: "United States" },
  { value: "URUGUAY", label: "Uruguay" },
  { value: "UZBEKISTAN", label: "Uzbekistan" },
  { value: "VANUATU", label: "Vanuatu" },
  { value: "VATICAN CITY", label: "Vatican City" },
  { value: "VENEZUELA", label: "Venezuela" },
  { value: "VIETNAM", label: "Vietnam" },
  { value: "YEMEN", label: "Yemen" },
  { value: "ZAMBIA", label: "Zambia" },
  { value: "ZIMBABWE", label: "Zimbabwe" },
];

const CreateOrder = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [selectedProductIDs, setSelectedProductIDs] = useState([]);

  const dispatch = useDispatch();
  const { allProductsData, currentPage, pageLimit, searchQuery } = useSelector(
    (state) => state.getproductsSlice
  );

  console.log(allProductsData);

  const [orderForm, setOrderForm] = useState({
    name: "",
    companyName: "",
    country: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
    email: "",
    age: "",
    bloodPressure: "",
    weight: "",
    weightUnit: "",
    orderNotes: "",
    passportImage: "",
    prescriptionImage: "",
    itemss: [{ productID: "", variantID: "", quantity: "" }],
  });

  const toggleTopBar = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  const handleSelectAllChange = () => {
    if (isSelectAllChecked) {
      setSelectedProductIDs([]);
    } else {
      const allProductIDs =
        allProductsData?.data?.map((product) => product._id) || [];
      setSelectedProductIDs(allProductIDs);
    }
    setIsSelectAllChecked(!isSelectAllChecked);
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleVariantClick = (productID, variantID, productName) => {
    setSelectedProductDetails((prevDetails) => {
      // Check if the product with the same variantID already exists
      const variantExists = prevDetails.some(
        (item) => item.variantID === variantID
      );

      if (!variantExists) {
        return [...prevDetails, { productID, variantID, productName }];
      }

      return prevDetails;
    });
  };

  const handleDeleteProduct = (variantID) => {
    setSelectedProductDetails((prevDetails) =>
      prevDetails.filter((item) => item.variantID !== variantID)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(orderForm);
    console.log("Data Submitted");
  };

  useEffect(() => {
    dispatch(
      fetchGetProductsData({ page: currentPage, pageLimit, searchQuery })
    );
  }, [dispatch, currentPage, pageLimit, searchQuery]);

  return (
    <div className="p-5 bg-gray-300">
      <p className="font-bold">Create Order</p>
      <div className="  ">
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-5 mt-5 max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="block mb-1"> Name *</label>
                <input
                  type="text"
                  name="name"
                  value={orderForm.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">Company Name (optional)</label>
                <input
                  value={orderForm.companyName}
                  name="companyName"
                  onChange={handleChange}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="block mb-1"> Street Address *</label>
                <input
                  type="text"
                  value={orderForm.streetAddress}
                  name="streetAddress"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">Town / City *</label>
                <input
                  type="text"
                  value={orderForm.city}
                  name="city"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="block mb-1"> State *</label>
                <input
                  type="text"
                  name="state"
                  value={orderForm.state}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <div className=" w-[420px]">
                  <label className="block mb-1">Country *</label>
                  <Select
                    className="w-full focus:outline-none"
                    value={orderForm.country}
                    options={countryOptions}
                    onChange={handleCountryChange}
                    placeholder={
                      selectedCountry ? selectedCountry : "Select your country"
                    }
                    classNamePrefix="react-select"
                    // className={`${
                    //   errors.country
                    //     ? "border-red-500"
                    //     : "border-gray-300 w-[200px]  border  rounded"
                    // }`}
                  />
                  {/* {errors.country && (
                <span className="text-red-500">Country is required</span>
              )} */}
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="block mb-1"> Postcode / ZIP *</label>
                <input
                  type="text"
                  value={orderForm.pincode}
                  name="pincode"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">Phone Number *</label>
                <input
                  type="text"
                  value={orderForm.mobile}
                  name="mobile"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="block mb-1"> Email Address *</label>
                <input
                  type="text"
                  name="email"
                  value={orderForm.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">Age *</label>
                <input
                  type="text"
                  value={orderForm.age}
                  name="age"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">
                  {" "}
                  Any Valid Photo ID(optional)
                </label>
                <input
                  type="text"
                  value={orderForm.passportImage}
                  name="passportImage"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block mb-1">
                  Upload the Prescription (optional)
                </label>
                <input
                  type="text"
                  value={orderForm.prescriptionImage}
                  name="prescriptionImage"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="block mb-1"> Blood Pressure (optional)</label>
                <input
                  type="text"
                  value={orderForm.bloodPressure}
                  name="bloodPressure"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col w-[300px]">
                  <label className="block mb-1">Weight (optional)</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={orderForm.weight}
                    name="weight"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <select
                    className="border p-2 mt-7"
                    value={orderForm.weightUnit}
                    name="weightUnit"
                    onChange={handleChange}
                    // {...register("weightUnit")}
                    id=""
                    defaultValue="KG"
                  >
                    <option value="KG">KG</option>
                    <option value="LB">LB</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1">Order notes (optional)</label>
              <textarea
                // {...register("orderNotes")}
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
          </div>

          {/* Attachment of products */}

          <div className="bg-white p-5 mt-5 max-w-4xl mx-auto">
            <p className="font-bold text-xl mb-5">Attach Products</p>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isTopBarOpen ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="flex gap-3">
                <div className="flex gap-2">
                  <p>Number of items per page:</p>
                  <input
                    type="text"
                    onClick={() =>
                      dispatch(
                        fetchGetProductsData({
                          pageLimit,
                        })
                      )
                    }
                    onChange={(e) =>
                      dispatch(setPageLimit(Number(e.target.value)))
                    }
                    value={pageLimit}
                    className="border-2 rounded-md w-[50px] h-[30px] px-3 text-sm py-2"
                  />
                </div>

                {/* <div className="flex justify-center items-center">
              <button
                onClick={() =>
                  dispatch(
                    fetchGetProductsData({
                      page: currentPage,
                      pageLimit,
                      searchQuery,
                    })
                  )
                }
                className="bg-[#13a3bc] hover:bg-[#13b6d5] w-[50px] h-[30px] text-white rounded-md text-[13px]"
              >
                Apply
              </button>
            </div> */}
              </div>
            </div>
            <div className="flex justify-end mr-5">
              <div className="bg-white h-[30px] px-3 py-1">
                <p
                  className={`cursor-pointer text-sm flex items-center`}
                  onClick={toggleTopBar}
                >
                  OPTIONS
                  <span
                    className={`ml-1 transition-transform duration-300 ${
                      isTopBarOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </p>
              </div>
            </div>

            <div className="flex px-5 py-2 gap-3 ">
              <div className="flex gap-4">
                <input
                  type="text"
                  name="name"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products here..."
                  className="p-3 border rounded-xl h-[45px] w-[300px]"
                />
                {/* <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 flex justify-center items-center p-3 border rounded-xl h-[45px] text-white font-bold"
            >
              Search
            </button> */}
              </div>
              <div>
                <p>{allProductsData?.totalProducts || 0} results</p>
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() => handlePageChange(1)}
              >
                <MdOutlineKeyboardDoubleArrowLeft />
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              >
                <MdOutlineKeyboardArrowLeft />
              </div>
              <div className="h-[25px] w-[35px] border-gray-400 border flex justify-center items-center">
                <p>{currentPage}</p>
              </div>
              <div>
                <p>of {allProductsData?.totalPages}</p>
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() =>
                  handlePageChange(
                    Math.min(currentPage + 1, allProductsData?.totalPages || 1)
                  )
                }
              >
                <MdKeyboardArrowRight />
              </div>
              <div
                className="h-[25px] w-[25px] border-gray-400 border flex justify-center items-center cursor-pointer"
                onClick={() =>
                  handlePageChange(allProductsData?.totalPages || 1)
                }
              >
                <MdKeyboardDoubleArrowRight />
              </div>
            </div>
            <div className="flex gap-10 p-5">
              {/* Left Section: List of Products and Variants */}
              <div className="w-[50%]">
                <Table className="min-w-full bg-white border border-gray-300">
                  <Thead>
                    <Tr className="bg-gray-200 w-[100%]">
                      <Th className="py-2 px-4 border-b w-[40%] text-start border-r">
                        Name
                      </Th>
                      <Th className="py-2 px-4 border-b w-[50%] text-start border-r">
                        Variants
                      </Th>
                    </Tr>
                  </Thead>
                  {allProductsData?.data?.map((product) => (
                    <Tbody key={product._id}>
                      <Tr>
                        <Td className="py-2 px-4 border-b text-start text-[14px]">
                          {product.title}
                        </Td>
                        <Td className="py-2 px-4 border-b text-start text-[14px]">
                          <div className="flex flex-col gap-2">
                            {product?.variants.map((variant) => (
                              <div
                                key={variant._id}
                                onClick={() =>
                                  handleVariantClick(
                                    product._id,
                                    variant._id,
                                    product.title
                                  )
                                }
                                className="cursor-pointer border p-3"
                              >
                                <p className="font-semibold">{variant._id}</p>
                                <div className="flex justify-around">
                                  <p>PackSize: {variant.packSize || "N/A"}</p>
                                  <p>Price: {variant.price || "N/A"}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>
                <div className="flex px-5 py-2 gap-3 ">
                  {/* Pagination and other controls */}
                </div>
              </div>

              {/* Right Section: Selected Variants */}
              <div className="w-[50%]">
                <Table className="min-w-full bg-white border border-gray-300">
                  <Thead>
                    <Tr className="bg-gray-200 w-[100%]">
                      <Th className="py-2 px-4 border-r text-start w-[45%]">
                        Variant ID
                      </Th>
                      <Th className="py-2 px-4 border-r text-start w-[45%]">
                        Product Name
                      </Th>
                      <Th className="py-2 px-4 border-r text-start w-[10%]">
                        Delete
                      </Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {selectedProductDetails.map((item) => (
                      <Tr key={item.variantID}>
                        <Td className="p-3 border text-start text-[14px]">
                          {item.variantID}
                        </Td>
                        <Td className="p-3 border text-start text-[14px]">
                          {item.productName}
                        </Td>
                        <Td className="p-3 border text-center text-red-700 text-xl text-[14px]">
                          <MdDeleteOutline
                            className="cursor-pointer"
                            onClick={() => handleDeleteProduct(item.variantID)}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <div className="flex justify-center mt-10">
                  {selectedProductDetails.length > 0 && (
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Attach Category
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;

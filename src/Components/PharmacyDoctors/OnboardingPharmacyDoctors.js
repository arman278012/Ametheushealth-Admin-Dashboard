import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function OnboardingPharmacyDoctors() {

    const [geoError, setGeoError] = useState("");
    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        pharmacyName: "",
        userID: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "INDIA",
        timeZone: "",
        operatingHours: [
            { day: "Monday", openingTime: "", closingTime: "", isClosed: false },
        ],
        licenseNumber: "",
        licenseExpiryDate: "2026-06-30T00:00:00.000Z", // Example ISO string
        servicesOffered: [],
        deliveryCoverageAreas: [],
        averageDeliveryTime: "",
        gpsCoordinates: { latitude: "", longitude: "" },
        status: false,
        statusDetails: "",
        languagesSupported: [],
        pharmacyImageURL: ""
    });

    const { id } = useParams()

    const getOnBoardingDoctorDetails = async () => {
        try {
            const response = await axios.get(
                `https://ah-backend-djja.onrender.com/pharmacy/admin/pharmacies/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
                        id: localStorage.getItem("id"),
                    },
                }
            );

            const data = response.data.data;
            console.log("Fetched Country:", data.country);

            setFormData({
                pharmacyName: data.pharmacyName || "",
                userID: data.userID || "",
                address: data.address || "",
                city: data.city || "",
                state: data.state || "",
                pincode: data.pincode || "",
                country: data.country?.trim() || "", // Trim spaces for consistency
                timeZone: data.timeZone || "",
                operatingHours: data.operatingHours || [
                    { day: "Monday", openingTime: "", closingTime: "", isClosed: false },
                ],
                licenseNumber: data.licenseNumber || "",
                licenseExpiryDate: data.licenseExpiryDate || "",
                servicesOffered: data.servicesOffered || [],
                deliveryCoverageAreas: data.deliveryCoverageAreas || [],
                averageDeliveryTime: data.averageDeliveryTime || "",
                gpsCoordinates: data.gpsCoordinates || { latitude: "", longitude: "" },
                status: data.status || false,
                statusDetails: data.statusDetails || "",
                languagesSupported: data.languagesSupported || [],
                pharmacyImageURL: data.pharmacyImageURL || "",
            });
        } catch (error) {
            console.error("Error fetching doctor details:", error);
        }
    };

    console.log("country", formData.country)

    const updatePharmacyDetails = async (e) => {
        setLoader(true)
        try {
            e.preventDefault()
            const response = await axios.patch(`https://ah-backend-djja.onrender.com/pharmacy/admin/edit/${id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authorization")}`,
                        id: localStorage.getItem("id"),
                    },
                }
            )
            setLoader(false)
            toast.success(response.data.message)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOnBoardingDoctorDetails()
    }, [])

    console.log(id)

    useEffect(() => {
        // Check if the geolocation is available in the browser
        if (navigator.geolocation) {
            // Get current location on component mount
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Update the gpsCoordinates state with latitude and longitude
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        gpsCoordinates: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                    }));
                },
                (error) => {
                    // Handle geolocation error (e.g., user denied access)
                    setGeoError("Unable to retrieve your location.");
                }
            );
        } else {
            setGeoError("Geolocation is not supported by this browser.");
        }
    }, []);

    const countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo (Congo-Brazzaville)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czechia (Czech Republic)",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Holy See",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar (formerly Burma)",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "North Macedonia",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine State",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Sweden",
        "Switzerland",
        "Syria",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "USA",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const times = [
        "12:00 AM",
        "1:00 AM",
        "2:00 AM",
        "3:00 AM",
        "4:00 AM",
        "5:00 AM",
        "6:00 AM",
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
    ];

    const languages = [
        "Arabic",
        "Bengali",
        "Chinese (Simplified)",
        "Chinese (Traditional)",
        "Danish",
        "Dutch",
        "English",
        "French",
        "German",
        "Greek",
        "Gujarati",
        "Hebrew",
        "Hindi",
        "Italian",
        "Japanese",
        "Kannada",
        "Korean",
        "Malayalam",
        "Marathi",
        "Nepali",
        "Persian (Farsi)",
        "Polish",
        "Portuguese (Brazilian)",
        "Punjabi",
        "Russian",
        "Spanish",
        "Tamil",
        "Telugu",
        "Thai",
        "Turkish",
        "Urdu",
        "Vietnamese",
    ];

    const handleChange = (e) => {
        const { name, value, options } = e.target;

        if (name === "languagesSupported") {
            // For multi-select dropdowns (languagesSupported), collect all selected values
            const selectedLanguages = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => option.value);

            // Update state with selected languages
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: selectedLanguages,
            }));

            console.log(`Updated ${name}:`, selectedLanguages);
        } else {
            // For all other fields, including single-select dropdowns like "country"
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value.trim(), // Trim spaces for consistency
            }));

            console.log(`Updated ${name}:`, value.trim());
        }
    };

    // Function to handle changes in the operating hours fields
    const handleOperatingHoursChange = (index, field, value) => {
        const updatedHours = [...formData.operatingHours];
        updatedHours[index][field] = value;
        setFormData({ ...formData, operatingHours: updatedHours });
    };

    // Function to add a new operating hour set
    const addOperatingHour = () => {
        const newOperatingHour = { day: "Monday", openingTime: "", closingTime: "", isClosed: false };
        setFormData((prevData) => ({
            ...prevData,
            operatingHours: [...prevData.operatingHours, newOperatingHour]
        }));
    };

    // Function to delete an operating hour set
    const deleteOperatingHour = (index) => {
        const updatedHours = formData.operatingHours.filter((_, i) => i !== index);
        setFormData({ ...formData, operatingHours: updatedHours });
    };

    const formatDateForInput = (isoDate) => {
        // Convert ISO date string to YYYY-MM-DD
        return isoDate ? isoDate.split("T")[0] : "";
    };

    const handleLanguageSelect = (e) => {
        const { value } = e.target;

        setFormData((prevFormData) => {
            // Check if the language is already selected
            if (prevFormData.languagesSupported.includes(value)) {
                return prevFormData; // No change if already selected
            }

            // Add the language if it's not already selected
            const updatedLanguages = [...prevFormData.languagesSupported, value];

            return {
                ...prevFormData,
                languagesSupported: updatedLanguages, // Update the field
            };
        });
    };

    const handleRemoveLanguage = (lang) => {
        setFormData((prevFormData) => {
            // Remove the language from the array
            const updatedLanguages = prevFormData.languagesSupported.filter(
                (language) => language !== lang
            );

            return {
                ...prevFormData,
                languagesSupported: updatedLanguages, // Update the field
            };
        });
    };

    // Handle changes to the formData
    const handleCountryChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="w-full m-5 p-8 bg-gray-100 bg-opacity-50 shadow-xl rounded-xl">
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                Pharmacy Registration
            </h1>
            <form onSubmit={updatePharmacyDetails} className="space-y-6">
                {/* Pharmacy Name */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Pharmacy Name
                        </label>
                        <input
                            type="text"
                            name="pharmacyName"
                            value={formData.pharmacyName}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            User ID
                        </label>
                        <input
                            type="text"
                            name="userID"
                            value={formData.userID}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        />
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Address
                    </label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // required
                    />
                </div>

                {/* City, State, Pincode */}
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Pincode
                        </label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // required
                        />
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Country
                    </label>
                    <select
                        name="country"
                        value={formData.country} // The value will be set to the country from the backend
                        onChange={handleChange} // Handle changes when a user selects a different country
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Country</option>
                        {countries.map((ele, index) => (
                            <option key={index} value={ele.trim()}>
                                {ele}
                            </option>
                        ))}
                    </select>
                </div>

                {/* delivery Coverage Areas */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Delivery Coverage Areas
                    </label>
                    <input
                        type="text"
                        name="deliveryCoverageAreas"
                        placeholder="Comma-separated values"
                        value={formData.deliveryCoverageAreas.join(", ")}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                deliveryCoverageAreas: e.target.value
                                    .split(",")
                                    .map((service) => service.trim()),
                            })
                        }
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Time Zone */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Time Zone
                    </label>
                    <select
                        name="timeZone"
                        value={formData.timeZone}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // required
                    >
                        {Intl.supportedValuesOf("timeZone").map((zone) => (
                            <option key={zone} value={zone}>
                                {zone}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Operating Hours */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-4">Operating Hours</label>
                    <div className="space-y-4">
                        {formData.operatingHours.map((hour, index) => (
                            <div key={index} className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 items-center sm:items-start">
                                {/* Day Select */}
                                <select
                                    name="day"
                                    value={hour.day}
                                    onChange={(e) => handleOperatingHoursChange(index, "day", e.target.value)}
                                    className="w-full sm:w-[200px] p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {daysOfWeek.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>

                                {/* Opening Time Select */}
                                <select
                                    name="openingTime"
                                    value={hour.openingTime}
                                    onChange={(e) => handleOperatingHoursChange(index, "openingTime", e.target.value)}
                                    className="w-full sm:w-[200px] p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {times.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>

                                {/* Closing Time Select */}
                                <select
                                    name="closingTime"
                                    value={hour.closingTime}
                                    onChange={(e) => handleOperatingHoursChange(index, "closingTime", e.target.value)}
                                    className="w-full sm:w-[200px] p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {times.map((ele, index) => (
                                        <option key={index} value={ele}>{ele}</option>
                                    ))}
                                </select>

                                {/* Checkbox for Closed */}
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={hour.isClosed}
                                        onChange={(e) => handleOperatingHoursChange(index, "isClosed", e.target.checked)}
                                        className="ml-2"
                                    />
                                    <span className="text-lg">Closed</span>
                                </div>

                                {/* Delete Button */}
                                <div className="bg-red-500 h-[25px] w-[25px] flex justify-center rounded-full  items-center cursor-pointer hover:bg-red-600 transition">
                                    <MdDelete
                                        className=" text-white text-[15px]"
                                        onClick={() => deleteOperatingHour(index)}
                                    />
                                </div>

                            </div>
                        ))}

                        {/* Add Operating Hours Button */}
                        <button
                            type="button"
                            onClick={addOperatingHour}
                            className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Add Operating Hours
                        </button>
                    </div>
                </div>

                {/* License Details */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        License Number
                    </label>
                    <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // required
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        License Expiry Date
                    </label>
                    <input
                        type="date"
                        name="licenseExpiryDate"
                        value={formatDateForInput(formData.licenseExpiryDate)} // Format date for input
                        onChange={handleChange} // Allow editing
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Services Offered */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Services Offered
                    </label>
                    <input
                        type="text"
                        name="servicesOffered"
                        placeholder="Comma-separated values"
                        value={formData.servicesOffered.join(", ")}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                servicesOffered: e.target.value
                                    .split(",")
                                    .map((service) => service.trim()),
                            })
                        }
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Language */}

                <div className="space-y-4">
                    <label className="block text-lg font-semibold text-gray-700">
                        Languages Supported
                    </label>

                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 shadow-sm flex gap-3">
                        {formData.languagesSupported.length > 0 ? (
                            formData.languagesSupported.map((lang, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <p className="text-gray-700 text-sm font-medium bg-gray-100 px-3 py-1 rounded-full inline-block mr-2">
                                        {lang}
                                    </p>
                                    <MdDelete
                                        onClick={() => handleRemoveLanguage(lang)} // Remove language on click
                                        className="text-gray-500 cursor-pointer"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm italic">
                                No languages selected
                            </p>
                        )}
                    </div>

                    <div>
                        <select
                            onChange={handleLanguageSelect}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition duration-300"
                            name="languagesSupported"
                            value={formData.languagesSupported}
                        >
                            <option value="" disabled className="text-gray-400">
                                Select a language
                            </option>
                            {languages.map((lang, index) => (
                                <option key={index} value={lang} className="text-gray-800">
                                    {lang}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* GPS Coordinates */}
                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        GPS Coordinates
                    </label>
                    <input
                        type="text"
                        name="latitude"
                        value={`Latitude: ${formData.gpsCoordinates.latitude}`}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                    />
                    <input
                        type="text"
                        name="longitude"
                        value={`Longitude: ${formData.gpsCoordinates.longitude}`}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        {loader ? "Updating..." : "Update"}

                    </button>
                </div>
            </form>
        </div>
    );
}

export default OnboardingPharmacyDoctors;
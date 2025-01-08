import React, { useEffect, useState } from "react";

function OnboardingPharmacyDoctors() {
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
        licenseExpiryDate: "",
        servicesOffered: [],
        deliveryCoverageAreas: [],
        averageDeliveryTime: "",
        gpsCoordinates: { latitude: "", longitude: "" },
        status: false,
        statusDetails: "",
        languagesSupported: [],
        pharmacyImageURL: ""
    });

    const [geoError, setGeoError] = useState("");

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
        "United States of America",
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

    const handleLanguageSelect = (e) => {
        // Extract selected values from the selected options
        const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);

        setFormData({
            ...formData,
            languagesSupported: selectedLanguages, // Update languagesSupported with the selected languages
        });
    };


    const handleChange = (e) => {
        const { name, options } = e.target;

        // If multiple values are selected in a dropdown
        if (name === "languagesSupported") {
            const selectedLanguages = Array.from(options)
                .filter((option) => option.selected)
                .map((option) => option.value);

            setFormData({
                ...formData,
                [name]: selectedLanguages, // Update languagesSupported with the selected array
            });
        } else {
            // Handle other form fields
            setFormData({
                ...formData,
                [name]: e.target.value,
            });
        }
    };

    const handleOperatingHoursChange = (index, field, value) => {
        const updatedHours = [...formData.operatingHours];
        updatedHours[index][field] = value;
        setFormData({ ...formData, operatingHours: updatedHours });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="w-full m-5 p-8 bg-gray-100 bg-opacity-50 shadow-xl rounded-xl">
            <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
                Pharmacy Registration
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                            required
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
                            required
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
                        required
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
                            required
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
                            required
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
                            required
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
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option>Select Country</option>
                        {countries.map((ele, index) => (
                            <option key={index} value={ele}>
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
                        required
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
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Operating Hours
                    </label>
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            {/* Day Select */}
                            <select
                                name="day"
                                value={formData.operatingHours[0]?.day}
                                onChange={(e) =>
                                    handleOperatingHoursChange(0, "day", e.target.value)
                                }
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {daysOfWeek.map((ele, index) => (
                                    <option key={index} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>

                            {/* Opening Time Select */}
                            <select
                                name="openingTime"
                                value={formData.operatingHours[0]?.openingTime}
                                onChange={(e) =>
                                    handleOperatingHoursChange(0, "openingTime", e.target.value)
                                }
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {times.map((ele, index) => (
                                    <option key={index} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>

                            {/* Closing Time Select */}
                            <select
                                name="closingTime"
                                value={formData.operatingHours[0]?.closingTime}
                                onChange={(e) =>
                                    handleOperatingHoursChange(0, "closingTime", e.target.value)
                                }
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {times.map((ele, index) => (
                                    <option key={index} value={ele}>
                                        {ele}
                                    </option>
                                ))}
                            </select>

                            {/* Checkbox for Closed */}
                            <input
                                type="checkbox"
                                checked={formData.operatingHours[0]?.isClosed}
                                onChange={(e) =>
                                    handleOperatingHoursChange(0, "isClosed", e.target.checked)
                                }
                                className="ml-2"
                            />
                            <span className="ml-2 text-lg">Closed</span>
                        </div>
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
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        License Expiry Date
                    </label>
                    <input
                        type="date"
                        name="licenseExpiryDate"
                        value={formData.licenseExpiryDate}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
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

                <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Language
                    </label>
                    <select
                        name="languagesSupported"

                        value={formData.languagesSupported} // Bind selected languages to the state
                        onChange={handleLanguageSelect}
                        className="w-full p-3 border rounded-md"
                    >
                        {languages.map((lang, index) => (
                            <option key={index} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
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
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default OnboardingPharmacyDoctors;
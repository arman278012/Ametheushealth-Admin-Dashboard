import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { FaLanguage } from "react-icons/fa6";
import {
  FaArrowLeft,
  FaArrowRight,
  FaMinus,
  FaPlus,
  FaRegStar,
  FaRegStarHalf,
  FaStar,
  FaStethoscope,
} from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext, MdOutlineAvTimer } from "react-icons/md";
import { FcRating } from "react-icons/fc";

const DoctorDetails = () => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slotsPerView = 3;
  const totalSlots = selectedDate?.offlineSlots?.length;
  const [currentOnlineIndex, setCurrentOnlineIndex] = useState(0);
  const [currentDateIndex, setCurrentDateIndex] = useState(0); // Track the current slide index
  const [showAllRatings, setShowAllRatings] = useState(false);
  const datesToShow = 3;
  const onlineSlotsPerView = 3; // Number of slots to show in one view
  const totalOnlineSlots = selectedDate?.onlineSlots?.length;

  const { id } = useParams();

  const rating = doctorsData?.averageRating || 0;
  const maxStars = 5; // Assuming the maximum rating is 5
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  const handleFaqToggle = (index) => {
    setExpandedFaqIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Calculate the total number of online slides
  const totalOnlineSlides = Math.ceil(totalOnlineSlots / onlineSlotsPerView);
  const totalSlides = Math.ceil(totalSlots / slotsPerView);

  const goToNextOnline = () => {
    setCurrentOnlineIndex((prevIndex) => (prevIndex + 1) % totalOnlineSlides);
  };

  const goToPrevOnline = () => {
    setCurrentOnlineIndex(
      (prevIndex) => (prevIndex - 1 + totalOnlineSlides) % totalOnlineSlides
    );
  };

  // Determine which slots to display for the current index
  const startIndex = currentOnlineIndex * onlineSlotsPerView;
  const displayedSlots = selectedDate?.onlineSlots.slice(
    startIndex,
    startIndex + onlineSlotsPerView
  );

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const getDoctorsDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/admin/getdoctors/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setDoctorsData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleNextDate = () => {
    if (currentDateIndex < doctorsData?.avialableSlots?.length - datesToShow) {
      setCurrentDateIndex(currentDateIndex + 1);
    }
  };

  const handlePrevDate = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(currentDateIndex - 1);
    }
  };

  // Function to toggle showing all ratings
  const handleToggleRatings = () => {
    setShowAllRatings((prevState) => !prevState);
  };

  // Limit to 5 ratings if showAllRatings is false
  const displayedRatings = showAllRatings
    ? doctorsData?.ratings
    : doctorsData?.ratings?.slice(0, 5);

  return (
    <div className="p-10">
      <div className="flex gap-10">
        <div className="doctor-profile w-[60%] border border-gray-300 rounded-xl p-5">
          <div className="flex gap-10">
            <div className="image">
              <img
                src={doctorsData?.userData?.avatar}
                alt={doctorsData?.userData?.name}
                className="w-[150px] rounded-full"
              />
            </div>

            <div className="space-y-2">
              <p className="font-bold text-2xl">
                {doctorsData?.userData?.name}
              </p>
              <p className="font-light -translate-y-2">
                {doctorsData?.userData?.email}
              </p>
              <p className="font-semibold">
                {doctorsData?.experience}+ years experience
              </p>
              <div className="flex items-center gap-2">
                <GiGraduateCap />
                {doctorsData?.qualifications?.map((qualification, index) =>
                  qualification?.skills.map((skill, index) => (
                    <span key={index} className="text-sm">
                      {skill}
                    </span>
                  ))
                )}
              </div>
              <div className="flex items-center gap-2">
                <FaLanguage />
                {doctorsData?.language?.map((lang, index) => (
                  <span key={index} className="text-sm">
                    {lang}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {/* Show the stars only if the rating exists */}
                {doctorsData?.averageRating && (
                  <div className="flex gap-1 items-center">
                    {/* Render filled stars for the full rating */}
                    {Array.from({ length: Math.floor(rating) }).map(
                      (_, index) => (
                        <FaStar key={index} className="text-yellow-500" />
                      )
                    )}

                    {/* If there’s a decimal, show a half-filled or regular star */}
                    {rating % 1 !== 0 && (
                      <FaRegStarHalf className="text-yellow-500" />
                    )}

                    {/* Render the rest as outline stars if the rating is less than the maximum */}
                    {Array.from({ length: maxStars - Math.ceil(rating) }).map(
                      (_, index) => (
                        <FaRegStar key={index} className="text-yellow-500" /> // Outline star
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Addresses */}
              <div className="directions border border-gray-300 w-full p-2 rounded-xl">
                <p className="font-bold text-sm capitalize">
                  {doctorsData?.hospitalName}
                </p>
                <p className="text-sm">
                  {doctorsData?.clinic_hospital_address?.permanentAddress}
                </p>
                <p className="text-sm">
                  {doctorsData?.clinic_hospital_address?.state},{" "}
                  {doctorsData?.clinic_hospital_address?.city},{" "}
                  {doctorsData?.clinic_hospital_address?.PinCode}
                </p>
              </div>
            </div>
          </div>

          {/* About doctor */}
          <div className="mt-5 flex flex-col gap-2">
            <p className="font-bold text-2xl">
              About {doctorsData?.userData?.name}
            </p>
            <p className="font-semibold text-gray-500">
              {doctorsData?.aboutDoctor}
            </p>
          </div>

          {/* Registration */}
          <div className="education and workexperience mt-5 flex flex-col gap-2">
            <div className="flex justify-start items-center gap-2">
              <FaStethoscope className="text-2xl" />
              <p className="font-bold text-2xl">Registration</p>
            </div>
            <p className="font-semibold text-gray-500">
              {doctorsData?.RegistrationNumber}
            </p>
            <div className="h-[1px] w-full bg-gray-300 mt-2"></div>
          </div>
        </div>

        {/* Render the available dates */}

        <div className="dates-container">
          <h2 className="text-xl font-semibold mb-2">Select a Date:</h2>
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
            {" "}
            {/* Set overflow-hidden */}
            {/* Previous Date Button */}
            <button
              onClick={handlePrevDate}
              className={`absolute w-[20px] h-[20px] flex justify-center items-center -left-[3px] top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full z-10 ${
                // Add z-10 to ensure it stays on top
                currentDateIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`} // Adjust button size
              disabled={currentDateIndex === 0}
            >
              <FaArrowLeft className="text-[10px]" />
            </button>
            {/* Date Slider */}
            <ul
              className="grid grid-cols-3 gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentDateIndex * (100 / datesToShow)
                }%)`,
                width: "100%", // Ensure the slider fits within the container width
              }}
            >
              {doctorsData?.avialableSlots
                ?.slice(currentDateIndex, currentDateIndex + datesToShow)
                ?.map((dateSlot) => (
                  <li
                    key={dateSlot._id}
                    onClick={() => handleDateSelect(dateSlot)}
                    className="date-item border border-gray-300 rounded-lg px-3 py-2 text-center cursor-pointer transition-transform transform hover:scale-105"
                    style={{
                      backgroundColor:
                        selectedDate?._id === dateSlot._id ? "#3B82F6" : "#fff", // Highlight selected date
                      color:
                        selectedDate?._id === dateSlot._id ? "#fff" : "#000",
                    }}
                  >
                    {new Date(dateSlot.selectDate).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </li>
                ))}
            </ul>
            {/* Next Date Button */}
            <button
              onClick={handleNextDate}
              className={`absolute h-[20px] w-[20px] flex justify-center items-center -right-[3px] top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full z-10 ${
                // Add z-10 to ensure it stays on top
                currentDateIndex >=
                doctorsData?.avialableSlots?.length - datesToShow
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`} // Adjust button size
              disabled={
                currentDateIndex >=
                doctorsData?.avialableSlots?.length - datesToShow
              }
            >
              <FaArrowRight className="text-[10px]" />
            </button>
          </div>

          {/* Display the slots for the selected date */}
          {selectedDate && (
            <div className="slots-container mt-5 border border-gray-300 rounded-lg p-5">
              <h3 className="text-lg font-semibold">
                Available Slots for{" "}
                {new Date(selectedDate?.selectDate).toDateString()}:
              </h3>

              <div className="offline-slots mt-3">
                <div className="border border-gray-300 p-2">
                  <h4 className="font-bold mb-2">Offline Slots</h4>
                  <div className="relative">
                    <div className="grid grid-cols-3 gap-2 transition-transform duration-800 ease-in-out transform">
                      {selectedDate?.offlineSlots
                        .slice(
                          currentIndex * slotsPerView,
                          (currentIndex + 1) * slotsPerView
                        )
                        .map((slot) => (
                          <div
                            key={slot._id}
                            className="slot-item py-2 border border-gray-300 flex flex-col justify-center items-center"
                          >
                            <p>
                              Time: {slot.startTime} - {slot.endTime}
                            </p>
                            <p>Charge: ₹{slot.doctorCharge}</p>
                            <p className="mt-2">
                              {slot.isBooked ? (
                                <span className="bg-red-800 px-2 py-1 text-white">
                                  Booked
                                </span>
                              ) : (
                                <span className="bg-green-800 px-2 py-1 text-white">
                                  Available
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
                    </div>
                    {totalSlots > slotsPerView && (
                      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
                        <button
                          onClick={handlePrev}
                          className="bg-gray-200 transition-all duration-500 ease-in-out rounded-full flex justify-center items-center -translate-x-[9px] h-[20px] w-[20px]"
                        >
                          <GrFormPrevious />
                        </button>
                        <button
                          onClick={handleNext}
                          className="bg-gray-200 rounded-full translate-x-[10px] h-[20px] w-[20px] flex justify-center items-center"
                        >
                          <MdNavigateNext />
                        </button>
                      </div>
                    )}
                  </div>
                  {totalSlots === 0 && <p>No offline slots available</p>}
                </div>
              </div>

              <div className="online-slots mt-3">
                <div className="border border-gray-300 p-2">
                  <h4 className="font-bold mb-2">Online Slots</h4>
                  <div className="relative">
                    <div className="grid grid-cols-3 gap-2">
                      {displayedSlots.map((slot) => (
                        <div
                          key={slot._id}
                          className="slot-item border border-gray-200 py-2 flex flex-col justify-center items-center"
                        >
                          <p>
                            Time: {slot.startTime} - {slot.endTime}
                          </p>
                          <p>Charge: ₹{slot.doctorCharge}</p>
                          <p className="mt-2">
                            {slot.isBooked ? (
                              <span className="bg-red-800 px-2 py-1 text-white">
                                Booked
                              </span>
                            ) : (
                              <span className="bg-green-800 px-2 py-1 text-white">
                                Available
                              </span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                    {totalOnlineSlots > onlineSlotsPerView && (
                      <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
                        <button
                          onClick={goToPrevOnline}
                          className="bg-gray-200 flex justify-center items-center rounded-full -translate-x-[9px] h-[20px] w-[20px]"
                        >
                          <GrFormPrevious />
                        </button>
                        <button
                          onClick={goToNextOnline}
                          className="bg-gray-200 rounded-full translate-x-[10px] flex justify-center items-center h-[20px] w-[20px]"
                        >
                          <MdNavigateNext />
                        </button>
                      </div>
                    )}
                  </div>
                  {totalOnlineSlots === 0 && <p>No online slots available</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="education and workexperience mt-5 flex flex-col gap-2">
        <div className="flex justify-start items-center gap-2">
          <GiGraduateCap className="text-2xl" />
          <p className="font-bold text-2xl">Education</p>
        </div>
        {doctorsData?.qualifications?.map((qualification, index) => (
          <div key={index}>
            <p className="font-semibold text-xl">{qualification?.degree}</p>
            <p className="text-sm font-semibold">
              {qualification?.instituteName}
            </p>
            <div className="flex gap-5">
              <p className="text-sm font-semibold">
                {qualification?.startDate.month} {qualification?.startDate.year}
              </p>
              -
              <p className="text-sm font-semibold">
                {qualification?.endDate.month} {qualification?.endDate.year}
              </p>
            </div>
          </div>
        ))}
        <div className="h-[1px] w-full bg-gray-300 mt-2"></div>
      </div>

      {/* years of experience */}
      <div className="years-of-experience and workexperience mt-5 flex flex-col gap-2">
        <div className="flex justify-start items-center gap-2">
          <MdOutlineAvTimer className="text-2xl" />
          <p className="font-bold text-2xl">Experience</p>
        </div>
        {doctorsData?.years_of_experience?.map((experience, index) => (
          <div key={index} className="">
            <div>
              <p className="font-semibold text-xl">
                {experience?.organizationName},<span> </span>
                {experience?.organizationLocation}
              </p>
            </div>
            <div className="flex gap-5">
              <p className="text-sm font-semibold">{experience?.jobTitle}</p>
              <p>-</p>
              <p className="text-sm font-semibold">
                {experience?.employmentType}
              </p>
            </div>

            <div className="start-end">
              <div className="flex gap-5">
                <p className="text-sm font-semibold">
                  {experience?.startDate?.month} {experience?.startDate?.year}
                </p>
                <p>-</p>
                {experience?.isPresent ? (
                  <p className="text-sm font-semibold">Present</p>
                ) : (
                  <p className="text-sm font-semibold">
                    {experience?.endDate?.month} {experience?.endDate?.year}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
          </div>
        ))}
      </div>

      {/* FAQ's */}
      <div className="faq-section mt-5 flex flex-col gap-2">
        <p className="font-bold text-2xl">FAQs</p>
        {doctorsData?.FAQ?.map((faq, index) => (
          <div key={index} className="faq-item border-b border-gray-300 py-2">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleFaqToggle(index)}
            >
              <p className="font-medium">{faq.title}</p>
              {expandedFaqIndex === index ? (
                <FaMinus className="text-gray-500" />
              ) : (
                <FaPlus className="text-gray-500" />
              )}
            </div>
            {/* Transition for answer visibility */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedFaqIndex === index
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="mt-2 text-gray-700">{faq.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ratings */}
      <div className="years-of-experience-and-workexperience mt-5 flex flex-col gap-2">
        <div className="flex justify-start items-center gap-2">
          <FcRating className="text-2xl" />
          <p className="font-bold text-2xl">Ratings</p>
        </div>

        {displayedRatings?.map((rating, index) => (
          <div key={index} className="flex gap-5">
            <div className="bg-green-500 px-2 py-1">
              <FaStar className="text-white" />
            </div>
            <div>
              <p className="font-light">{rating?.feedback}</p>
            </div>
          </div>
        ))}

        {/* Show the toggle button only if there are more than 5 ratings */}
        {doctorsData?.ratings?.length > 5 && (
          <button
            onClick={handleToggleRatings}
            className="text-blue-500 mt-3 self-start"
          >
            {showAllRatings ? "Show Less" : "Show All Ratings"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;

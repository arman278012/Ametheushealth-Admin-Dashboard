import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdMore } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import { LiaQuestionSolid } from "react-icons/lia";
import { MdAssignmentAdd } from "react-icons/md";
import toast from "react-hot-toast";

const OnBoardingDoctorsDetails = () => {
  const [onBoardingData, setOnBoardingData] = useState([]);
  const [activeSection, setActiveSection] = useState("doctor-details");
  const [status, setStatus] = useState('');
  const [statusDetails, setStatusDetails] = useState('');
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState({
    RegistrationNumber: "",
    aboutDoctor: "",
    clinic_hospital_address: {
      city: "",
      PinCode: "",
      state: "",
      permanentAddress: "",
    },
    councilName: "",
    doctorType: "",
    hospitalName: "",
    language: [],
    status: "",
    statusDetail: "",
    qualifications: [
      {
        sequenceNumber: 0,
        instituteName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: {
          month: "",
          year: "",
        },
        endDate: {
          month: "",
          year: "",
        },
        description: "",
        skills: [],
      },
    ],
    years_of_experience: [
      {
        sequenceNumber: 0,
        jobTitle: "",
        employmentType: "",
        organizationName: "",
        organizationLocation: "",
        startDate: {
          month: "",
          year: "",
        },
        endDate: {
          month: "",
          year: "",
        },
        isPresent: false,
        description: "",
        skills: [],
      },
    ],
  })

  const navigate = useNavigate()

  // Handle status change
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusDetails(''); // Reset status details when status changes
  };

  const onboardingDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/admin/doctor/processing/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      const myData = response.data.data;
      console.log(response.data)
      console.log(myData)
      // Safely update doctorData with fallback values
      setDoctorData((prevData) => ({
        ...prevData,
        RegistrationNumber: myData?.RegistrationNumber || "",
        hospitalName: myData?.hospitalName || "",
        councilName: myData?.councilName || "",
        aboutDoctor: myData?.aboutDoctor || "",
        doctorType: myData?.doctorType || "",
        clinic_hospital_address: {
          PinCode: myData?.clinic_hospital_address?.PinCode || "N/A",
          city: myData?.clinic_hospital_address?.city || "N/A",
          permanentAddress: myData?.clinic_hospital_address?.permanentAddress || "N/A",
          state: myData?.clinic_hospital_address?.state || "N/A",
        },
        language: myData?.language || [],
        status: myData?.status || "",
        statusDetail: myData?.statusDetail || "",
        qualifications:
          myData?.qualifications?.map((qualification) => ({
            sequenceNumber: qualification?.sequenceNumber || 0,
            instituteName: qualification?.instituteName || "",
            degree: qualification?.degree || "",
            fieldOfStudy: qualification?.fieldOfStudy || "",
            startDate: {
              month: qualification?.startDate?.month || "",
              year: qualification?.startDate?.year || "",
            },
            endDate: {
              month: qualification?.endDate?.month || "",
              year: qualification?.endDate?.year || "",
            },
            description: qualification?.description || "",
            skills: qualification?.skills || [],
          })) || [],
        years_of_experience:
          myData?.years_of_experience?.map((experience) => ({
            sequenceNumber: experience?.sequenceNumber || 0,
            jobTitle: experience?.jobTitle || "",
            employmentType: experience?.employmentType || "",
            organizationName: experience?.organizationName || "",
            organizationLocation: experience?.organizationLocation || "",
            startDate: {
              month: experience?.startDate?.month || "",
              year: experience?.startDate?.year || "",
            },
            endDate: {
              month: experience?.endDate?.month || "",
              year: experience?.endDate?.year || "",
            },
            isPresent: experience?.isPresent || false,
            description: experience?.description || "",
            skills: experience?.skills || [],
          })) || [],
      }));
      setOnBoardingData(response.data); // Storing additional onboarding data if needed
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };

  useEffect(() => {
    onboardingDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setDoctorData({
      ...doctorData,
      [name]: value
    })
  }

  const handleQualificationChange = (e, index, parentField, childField) => {
    const { value } = e.target;

    setDoctorData((prevState) => {
      const updatedQualifications = [...prevState.qualifications];

      if (parentField && childField === "month") {
        // Convert numeric month to the full month name
        const monthName = months[parseInt(value, 10) - 1]; // Convert numeric value to month name
        updatedQualifications[index][parentField] = {
          ...updatedQualifications[index][parentField],
          [childField]: monthName,
        };
      } else if (parentField && childField) {
        // For fields like year, directly update the value
        updatedQualifications[index][parentField] = {
          ...updatedQualifications[index][parentField],
          [childField]: value,
        };
      } else if (name === "skills") {
        updatedQualifications[index][name] = value
          .split(",")
          .map((skill) => skill.trim());
      } else {
        updatedQualifications[index][name] = value;
      }

      return {
        ...prevState,
        qualifications: updatedQualifications,
      };
    });
  };

  // Add a new experience section
  const handleAddExperience = () => {
    setDoctorData((prev) => ({
      ...prev,
      years_of_experience: [
        ...prev.years_of_experience,
        {
          sequenceNumber: prev.years_of_experience.length + 1,
          jobTitle: "",
          employmentType: "",
          organizationName: "",
          organizationLocation: "",
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "" },
          isPresent: false,
          description: "",
          skills: [],
        },
      ],
    }));
  };

  // Handle input changes for an experience field
  const handleExperienceChange = (index, field, value) => {
    setDoctorData((prev) => {
      const updatedExperience = [...prev.years_of_experience];
      if (field.includes(".")) {
        const [key, subKey] = field.split(".");
        updatedExperience[index][key][subKey] = value;
      } else {
        updatedExperience[index][field] = value;
      }
      return { ...prev, years_of_experience: updatedExperience };
    });
  };

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

  const years = Array.from(
    { length: 51 },
    (_, i) => new Date().getFullYear() - 50 + i
  ); // 50 years range

  const handleAddQualification = () => {
    const newQualification = {
      degree: "",
      fieldOfStudy: "",
      description: "",
      instituteName: "",
      skills: [],
      startDate: { month: 1, year: 2023 },
      endDate: { month: 12, year: 2023 },
    };
    setDoctorData((prevData) => ({
      ...prevData,
      qualifications: [...prevData.qualifications, newQualification],
    }));
  };

  const handleDeleteQualification = (index) => {
    setDoctorData((prevData) => ({
      ...prevData,
      qualifications: prevData.qualifications.filter(
        (_, qualificationIndex) => qualificationIndex !== index
      ),
    }));
  };

  const updateOnBoardingDoctors = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`https://api.assetorix.com/ah/api/v1/dc/admin/promoted/update/${id}`,
        doctorData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      )
    }
    catch (error) {
      console.log(error)
    }
  }

  const promoteDoctor = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`https://api.assetorix.com/ah/api/v1/dc/admin/promoted/add/${id}`,
        { status, statusDetails },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      )
      toast.success("User promoted to doctor Successfully!!")
      navigate(`/all-doctor`)
    }

    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="px-5 mt-5 flex justify-between">
        <p className="font-bold text-xl flex items-center mb-5">
          Edit onboarding Doctors Details
        </p>
        <div>
          <form onSubmit={promoteDoctor}>
            <div className="flex gap-10">
              <div className="gap-5">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Change Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={status}
                  onChange={handleStatusChange}
                  className="block w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" className="text-gray-600">
                    Change Status
                  </option>
                  <option value="processing" className="text-gray-600">
                    Processing
                  </option>
                  <option value="reject" className="text-gray-600">
                    Reject
                  </option>
                  <option value="accept" className="text-gray-600">
                    Accept
                  </option>
                  <option value="pending" className="text-gray-600">
                    Pending
                  </option>
                </select>
              </div>
              {/* Conditionally render the statusDetails input */}
              <div>
                {(status === 'reject' || status === 'accept' || status === 'pending' || status === 'processing') && (
                  <div className="flex gap-3">
                    <div className="">
                      <label
                        htmlFor="statusDetails"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Status Details
                      </label>
                      <input
                        type="text"
                        id="statusDetails"
                        name="statusDetails"
                        value={statusDetails}
                        onChange={(e) => setStatusDetails(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter status details"
                      />
                    </div>
                    <div className="mt-[30px]">
                      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md">
                        Approve
                      </button>
                    </div>
                  </div>

                )}
              </div>

            </div>
          </form>

        </div>
      </div>

      <div className="flex gap-10 p-5">

        <div className="left-section-sidebar w-[25%]">
          <div className="">
            <div className="flex flex-col gap-3 p-3">
              <div
                className={`${activeSection === "doctor-details"
                  ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                  : "flex gap-2"
                  }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("doctor-details")}
                >
                  Doctor-details
                </button>
                <MdOutlineDescription className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              <div
                className={`${activeSection === "hospital-address"
                  ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                  : "flex gap-2"
                  }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("hospital-address")}
                >
                  Hospital-Address
                </button>
                <MdOutlineDescription className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              <div
                className={`${activeSection === "language"
                  ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                  : " flex gap-2"
                  }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("language")}
                >
                  Language
                </button>
                <MdOutlineDescription className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              <div
                className={`${activeSection === "qualifications"
                  ? "bg-blue-500 text-white text-sm flex gap-2 py-1 px-2 font-bold"
                  : " flex gap-2"
                  }`}
              >
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => setActiveSection("qualifications")}
                >
                  Qualifications
                </button>
                <MdMore className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>

              {/* Experience */}
              <div
                className={`${activeSection === "experience"
                  ? "bg-blue-500 text-white flex gap-2 py-1 px-2 text-[12px] font-bold"
                  : " flex gap-2 text-sm"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveSection("experience")}
                >
                  Experience
                </button>
                <MdAssignmentAdd className="mt-1 text-sm" />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>
          </div>
        </div>

        <div className="w-[75%]">
          <form onSubmit={updateOnBoardingDoctors}>
            {activeSection === "doctor-details" && (
              <div className="flex flex-col gap-2 w-[85%]">
                {/* Doctor name and hospital name */}
                <div className="dr-hospital-name flex gap-5 w-full">
                  <div className="dr-name w-[50%]">
                    <label className="px-3 font-semibold text-gray-400">
                      Doctor name
                    </label>
                    <input
                      type="text"
                      // value={doctorData.userData.name}
                      name="userData"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="dr-name w-[50%]">
                    <label className="px-3 font-semibold text-gray-400">
                      Hospital name
                    </label>
                    <input
                      type="text"
                      value={doctorData?.hospitalName}
                      name="hospitalName"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                {/*Registration no and council name */}
                <div className="dr-hospital-name flex gap-5 w-full">
                  <div className="dr-name w-[50%]">
                    <label className="px-3 font-semibold text-gray-400">
                      Registration No
                    </label>
                    <input
                      type="text"
                      value={doctorData?.RegistrationNumber}
                      name="RegistrationNumber"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="dr-name w-[50%]">
                    <label className="px-3 font-semibold text-gray-400">
                      Council name
                    </label>
                    <input
                      type="text"
                      value={doctorData?.councilName}
                      name="councilName"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                {/* doctor status and doctor type */}
                <div className="all-filters flex sm:flex-row flex-col justify-center items-center sm:justify-normal gap-3">

                  <div className="w-[50%]">
                    <p className="px-3 font-semibold text-gray-400">
                      Doctor type
                    </p>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                      value={doctorData.doctorType}
                      onChange={handleChange}
                      name="doctorType"
                    >
                      <option value="">Dr Type</option>
                      <option value="normal">Normal</option>
                      <option value="special">Special</option>
                    </select>
                  </div>
                </div>

                {/* aboutDoctor */}
                <div className="dr-name">
                  <label className="px-3 font-semibold text-gray-400">
                    About Doctor
                  </label>
                  <textarea
                    type="text"
                    value={doctorData.aboutDoctor}
                    name="aboutDoctor"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            )}

            {activeSection === "hospital-address" && (
              <div className="w-full">
                <div className="dr-hospital-name flex gap-5 w-full">
                  <div className="dr-name w-[50%]">
                    <label className="px-3 font-semibold text-gray-400">
                      Permanent Address
                    </label>
                    <input
                      type="text"
                      value={doctorData.clinic_hospital_address.permanentAddress}
                      name="clinic_hospital_address"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="dr-name w-[50%]">
                    <label className="px-3 font-semibold text-gray-400">
                      City
                    </label>
                    <input
                      type="text"
                      value={doctorData.clinic_hospital_address.city}
                      name="clinic_hospital_address"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
                <div className="dr-hospital-name flex gap-5 w-full">
                  <div className="dr-name w-[50%]">
                    <label className="px-3 font-semibold text-gray-400">
                      State
                    </label>
                    <input
                      type="text"
                      value={doctorData.clinic_hospital_address.state}
                      name="clinic_hospital_address"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="dr-name w-[50%]">
                    <label className="px-3 font-semibold text-gray-400">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={doctorData.clinic_hospital_address.PinCode}
                      name="clinic_hospital_address"
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === "language" && (
              <div className="w-full">
                <div className="dr-name w-full">
                  <label className="px-3 font-semibold text-gray-400">
                    Languages <span className="text-gray-400 text-sm">(Please seperate by commas)</span>
                  </label>
                  <input
                    type="text"
                    value={doctorData?.language}
                    name="language"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none mt-2"
                  />
                </div>
              </div>
            )}

            {activeSection === "qualifications" && (
              <div className="w-full flex flex-col gap-4">
                {doctorData.qualifications.map((qualification, index) => (
                  <div
                    key={index}
                    className="qualification-entry flex flex-col gap-2 border p-4 rounded-xl shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">
                        Qualification {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleDeleteQualification(index)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Degree and Field of Study */}
                    <div className="flex gap-5 w-full">
                      <div className="w-[50%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Degree
                        </label>
                        <input
                          type="text"
                          value={qualification.degree}
                          name="degree"
                          onChange={(e) => handleQualificationChange(e, index)}
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="w-[50%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          value={qualification.fieldOfStudy}
                          name="fieldOfStudy"
                          onChange={(e) => handleQualificationChange(e, index)}
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="px-3 font-semibold text-gray-400">
                        Description
                      </label>
                      <textarea
                        value={qualification.description}
                        name="description"
                        onChange={(e) => handleQualificationChange(e, index)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                      ></textarea>
                    </div>

                    {/* Institute Name */}
                    <div>
                      <label className="px-3 font-semibold text-gray-400">
                        Institute Name
                      </label>
                      <input
                        type="text"
                        value={qualification.instituteName}
                        name="instituteName"
                        onChange={(e) => handleQualificationChange(e, index)}
                        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                      />
                    </div>

                    {/* Skills */}
                    <div>
                      <label className="px-3 font-semibold text-gray-400">
                        Skills
                      </label>
                      <input
                        type="text"
                        value={qualification.skills.join(", ")}
                        name="skills"
                        onChange={(e) => handleQualificationChange(e, index)}
                        placeholder="Separate skills with commas"
                        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                      />
                    </div>

                    {/* Start and End Dates */}
                    <div className="flex gap-5">
                      {/* Start Date */}
                      <div className="w-[50%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Start Date
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={
                              months.indexOf(qualification.startDate?.month) +
                              1 || ""
                            }
                            name="startDateMonth"
                            onChange={(e) =>
                              handleQualificationChange(
                                e,
                                index,
                                "startDate",
                                "month"
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                          >
                            <option value="" disabled>
                              Select Month
                            </option>
                            {months.map((month, idx) => (
                              <option key={idx} value={idx + 1}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={qualification.startDate?.year || ""}
                            name="startDateYear"
                            onChange={(e) =>
                              handleQualificationChange(
                                e,
                                index,
                                "startDate",
                                "year"
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                          >
                            <option value="" disabled>
                              Select Year
                            </option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="w-[50%]">
                        <label className="px-3 font-semibold text-gray-400">
                          End Date
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={
                              months.indexOf(qualification.endDate?.month) + 1 ||
                              ""
                            }
                            name="endDateMonth"
                            onChange={(e) =>
                              handleQualificationChange(
                                e,
                                index,
                                "endDate",
                                "month"
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                          >
                            <option value="" disabled>
                              Select Month
                            </option>
                            {months.map((month, idx) => (
                              <option key={idx} value={idx + 1}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={qualification.endDate?.year || ""}
                            name="endDateYear"
                            onChange={(e) =>
                              handleQualificationChange(
                                e,
                                index,
                                "endDate",
                                "year"
                              )
                            }
                            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                          >
                            <option value="" disabled>
                              Select Year
                            </option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Qualification Button */}
                <button
                  onClick={handleAddQualification}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                  Add Qualification
                </button>
              </div>
            )}

            {activeSection === "experience" && (
              <div className="w-full flex flex-col gap-4">
                {doctorData.years_of_experience.map((experience, index) => (
                  <div
                    key={index}
                    className="experience-entry flex flex-col gap-4 border p-4 rounded-xl shadow-md bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">
                        Experience {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setDoctorData((prev) => ({
                            ...prev,
                            years_of_experience: prev.years_of_experience.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Job Title and Organization */}
                    <div className="flex gap-5">
                      <div className="w-[50%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={experience.jobTitle}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "jobTitle",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="w-[50%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          value={experience.organizationName}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "organizationName",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Employment Type and Description */}
                    <div className="flex gap-5">
                      <div className="w-[50%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Employment Type
                        </label>
                        <select
                          value={experience.employmentType}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "employmentType",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        >
                          <option value="">Select Employment Type</option>
                          <option value="Full-Time">Full-Time</option>
                          <option value="Part-Time">Part-Time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                      <div className="w-[50%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Description
                        </label>
                        <textarea
                          value={experience.description}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>

                    {/* Date Fields */}
                    <div className="flex gap-5">
                      <div className="w-[25%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Start Date (Month)
                        </label>
                        <input
                          type="text"
                          value={experience.startDate.month}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "startDate.month",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="w-[25%]">
                        <label className="px-3 font-semibold text-gray-400">
                          Start Date (Year)
                        </label>
                        <input
                          type="text"
                          value={experience.startDate.year}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "startDate.year",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="w-[25%]">
                        <label className="px-3 font-semibold text-gray-400">
                          End Date (Month)
                        </label>
                        <input
                          type="text"
                          value={experience.endDate?.month || ""}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "endDate.month",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                          disabled={experience.isPresent}
                        />
                      </div>
                      <div className="w-[25%]">
                        <label className="px-3 font-semibold text-gray-400">
                          End Date (Year)
                        </label>
                        <input
                          type="text"
                          value={experience.endDate?.year || ""}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "endDate.year",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none"
                          disabled={experience.isPresent}
                        />
                      </div>
                    </div>

                    {/* Current Work Checkbox */}
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        checked={experience.isPresent}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "isPresent",
                            e.target.checked
                          )
                        }
                        className="mr-2"
                      />
                      <label className="font-semibold text-gray-600">
                        I am currently working here
                      </label>
                    </div>
                  </div>
                ))}

                {/* Add Experience Button */}
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                  Add Experience
                </button>
              </div>
            )}
            <div className="bg-green-500 hover:bg-green-600 flex justify-start items-center mt-10 rounded-xl">
              <button type="submit" className="text-white w-full py-2 font-bold">update</button>
            </div>
          </form>



        </div>
      </div>
    </>
  );
};

export default OnBoardingDoctorsDetails;

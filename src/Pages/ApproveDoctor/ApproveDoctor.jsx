import MySideBar from "../../Components/MySideBar/MySideBar";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApproveDoctor = () => {
  const [pendingDoctorList, setPendingDoctorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusDetails, setStatusDetails] = useState({});

  const defaultAvatar = "https://via.placeholder.com/150?text=No+Avatar";

  const fetchPendingDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://ah-backend-djja.onrender.com/dc/admin/doctor/processing",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      const data = await response.json();
      setPendingDoctorList(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const updateDoctorStatus = async (doctorId, status, statusDetail) => {
    try {
      const response = await fetch(
        `https://ah-backend-djja.onrender.com/dc/admin/promoted/add/${doctorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
          body: JSON.stringify({ status, statusDetail }),
        }
      );
      if (response.ok) {
        toast.success("Doctor status updated successfully!");
        fetchPendingDoctors();
      } else {
        toast.error("Failed to update doctor status.");
      }
    } catch (error) {
      console.error("Error updating doctor status:", error);
    }
  };

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const handleStatusChange = (doctorId, status) => {
    setStatusDetails((prev) => ({
      ...prev,
      [doctorId]: { ...prev[doctorId], status },
    }));
  };

  const handleDetailChange = (doctorId, detail) => {
    setStatusDetails((prev) => ({
      ...prev,
      [doctorId]: { ...prev[doctorId], statusDetail: detail },
    }));
  };

  const handleSubmit = (doctorId) => {
    const { status, statusDetail } = statusDetails[doctorId] || {};
    if (status && statusDetail) {
      updateDoctorStatus(doctorId, status, statusDetail);
    } else {
      toast.error("Please fill in all fields before submitting.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <MySideBar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {pendingDoctorList.length > 0 ? (
              pendingDoctorList.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white md:w-[50%] w-[45%] mr-5 shadow-md rounded-lg overflow-hidden hover:scale-105 transition ease-out"
                >
                  <img
                    src={doctor.userDetails?.avatar || defaultAvatar}
                    alt="Doctor Avatar"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {doctor.userDetails?.name || "Doctor Name"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Council: {doctor.councilName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      UHID: {doctor.userDetails?.uhid || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Requested on:{" "}
                      {new Date(doctor.RequestcreatedAt).toLocaleDateString()}
                    </p>
                    <p className="mt-3 text-gray-700">{doctor.aboutDoctor}</p>
                    <select
                      className="mt-4 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={
                        statusDetails[doctor._id]?.status || doctor.status || ""
                      }
                      onChange={(e) =>
                        handleStatusChange(doctor._id, e.target.value)
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="accept">Accept</option>
                      <option value="pending">Pending</option>
                      <option value="in process">In Process</option>
                      <option value="reject">Rejected</option>
                    </select>
                    {statusDetails[doctor._id]?.status && (
                      <textarea
                        className="mt-4 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter status details..."
                        onChange={(e) =>
                          handleDetailChange(doctor._id, e.target.value)
                        }
                      />
                    )}
                    <button
                      className="mt-4 bg-blue-500 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-600"
                      onClick={() => handleSubmit(doctor._id)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h2 className="text-center font-bold">
                  No doctor data is available
                </h2>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sm:hidden block">
        <MobileNavbar />
        <div className="p-4">
          <p className="text-gray-600">
            Please use a larger screen to manage doctors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApproveDoctor;

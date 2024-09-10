import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import UserDetails from "../../Components/UserDetails/UserDetails";

const UserDetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <UserDetails />
      </div>
    </div>
  );
};

export default UserDetailsPage;

import React from "react";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";
import AddBlogs from "../../Components/AddBlogs/AddBlogs";
import LoginAlert from "../../Components/LoginAlert/LoginAlert";
import MySideBar from "../../Components/MySideBar/MySideBar";

const AddBlogsPage = () => {
  const authorization = localStorage.getItem("authorization");
  const id = localStorage.getItem("id");
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div>
        <AddBlogs className="w-[100%]" />
      </div>
    </div>
  );
};

export default AddBlogsPage;

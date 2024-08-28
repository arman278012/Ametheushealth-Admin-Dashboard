import React from "react";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";
import AddBlogs from "../../Components/AddBlogs/AddBlogs";
import LoginAlert from "../../Components/LoginAlert/LoginAlert";

const AddBlogsPage = () => {
  const authorization = localStorage.getItem("authorization");
  const id = localStorage.getItem("id");
  return (
    <div className="sm:hidden block">
      <div>
        <MobileNavbar />
      </div>

      <div>
        {authorization && id ? (
          <AddBlogs className="w-[100%]" />
        ) : (
          <LoginAlert />
        )}
      </div>
    </div>
  );
};

export default AddBlogsPage;

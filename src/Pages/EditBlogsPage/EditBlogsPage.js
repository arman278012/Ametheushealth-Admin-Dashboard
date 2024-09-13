import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import EditBlogs from "../../Components/EditBlogs/EditBlogs";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const EditBlogsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <EditBlogs />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <EditBlogs />
        </div>
      </div>
    </>
  );
};

export default EditBlogsPage;

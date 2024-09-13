import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllBlogs from "../../Components/Allblogs/AllBlogs";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const AllBlogsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <AllBlogs />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <AllBlogs />
        </div>
      </div>
    </>
  );
};

export default AllBlogsPage;

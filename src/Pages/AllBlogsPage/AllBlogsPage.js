import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import AllBlogs from "../../Components/Allblogs/AllBlogs";

const AllBlogsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <AllBlogs />
      </div>
    </div>
  );
};

export default AllBlogsPage;

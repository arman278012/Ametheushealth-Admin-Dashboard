import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import EditBlogs from "../../Components/EditBlogs/EditBlogs";

const EditBlogsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <EditBlogs />
      </div>
    </div>
  );
};

export default EditBlogsPage;

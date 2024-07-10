import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import Login from "../../Components/Login/Login";

const LoginPage = () => {
  return (
    <div className="flex">
      {/* <div>
        <MySideBar />
      </div> */}

      <div className="w-[100%]">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;

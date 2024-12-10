import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import OnBoardingDoctorsDetails from "../../Components/OnBoardingDoctorsDetails/OnBoardingDoctorsDetails";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const OnBoardingDoctorsDetailsPage = () => {
  return (
    <div>
      <>
        <div className="sm:flex hidden">
          <div>
            <MySideBar />
          </div>

          <div className="w-[100%]">
            <OnBoardingDoctorsDetails />
          </div>
        </div>
        <div className="sm:hidden block">
          <div>
            <MobileNavbar />
          </div>

          <div className="w-[100%]">
            <OnBoardingDoctorsDetails />
          </div>
        </div>
      </>
    </div>
  );
};

export default OnBoardingDoctorsDetailsPage;

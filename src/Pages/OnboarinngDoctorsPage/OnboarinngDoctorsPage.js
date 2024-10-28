import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import OnboardingDoctors from "../../Components/OnboardingDoctors/OnboardingDoctors";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const OnboarinngDoctorsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <OnboardingDoctors />
        </div>
      </div>
      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <OnboardingDoctors />
        </div>
      </div>
    </>
  );
};

export default OnboarinngDoctorsPage;

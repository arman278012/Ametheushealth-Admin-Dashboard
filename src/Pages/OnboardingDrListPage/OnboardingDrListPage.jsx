import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import OnboardingDrList from "../../Components/onBoardingDrlist/OnboardingDrList";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const OnboardingDrListPage = () => {
  return (
    <div>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <OnboardingDrList />
        </div>
      </div>
      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <OnboardingDrList />
        </div>
      </div>
    </div>
  );
};

export default OnboardingDrListPage;

import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import ContactDetails from "../../Components/ContactDetials/ContactDetails";
import MobileNavbar from "../../Components/MobileNavbar/MobileNavbar";

const ContactDetailsPage = () => {
  return (
    <>
      <div className="sm:flex hidden">
        <div>
          <MySideBar />
        </div>

        <div className="w-[100%]">
          <ContactDetails />
        </div>
      </div>

      <div className="sm:hidden block">
        <div>
          <MobileNavbar />
        </div>

        <div className="w-[100%]">
          <ContactDetails />
        </div>
      </div>
    </>
  );
};

export default ContactDetailsPage;

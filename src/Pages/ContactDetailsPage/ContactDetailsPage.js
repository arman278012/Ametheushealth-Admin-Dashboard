import React from "react";
import MySideBar from "../../Components/MySideBar/MySideBar";
import ContactDetails from "../../Components/ContactDetials/ContactDetails";

const ContactDetailsPage = () => {
  return (
    <div className="flex">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <ContactDetails />
      </div>
    </div>
  );
};

export default ContactDetailsPage;

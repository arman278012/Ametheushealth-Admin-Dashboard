import React from 'react'
import MySideBar from '../../Components/MySideBar/MySideBar'
import DoctorForm from '../../Components/EditDoctor/EditDoctor'
import MobileNavbar from '../../Components/MobileNavbar/MobileNavbar'

function EditDoctorPage() {
  return (
    <>
    <div className="sm:flex hidden">
      <div>
        <MySideBar />
      </div>

      <div className="w-[100%]">
        <DoctorForm/>
      </div>
    </div>

    <div className="sm:hidden block">
      <div>
        <MobileNavbar />
      </div>

      <div className="w-[100%]">
        <DoctorForm />
      </div>
    </div>
  </>
  )
}

export default EditDoctorPage

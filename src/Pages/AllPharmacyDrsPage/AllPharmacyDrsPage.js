import React from 'react'
import MySideBar from '../../Components/MySideBar/MySideBar'
import AllPharmacyDrs from '../../Components/AllPharmacyDrs/AllPharmacyDrs'
import MobileNavbar from '../../Components/MobileNavbar/MobileNavbar'

const AllPharmacyDrsPage = () => {
    return (
        <>
            <div className="sm:flex hidden">
                <div>
                    <MySideBar />
                </div>
                <div className="w-[100%]">
                    <AllPharmacyDrs />
                </div>
            </div>
            <div className="sm:hidden block">
                <div>
                    <MobileNavbar />
                </div>
                <div className="w-[100%]">
                    <AllPharmacyDrs />
                </div>
            </div>
        </>
    )
}

export default AllPharmacyDrsPage
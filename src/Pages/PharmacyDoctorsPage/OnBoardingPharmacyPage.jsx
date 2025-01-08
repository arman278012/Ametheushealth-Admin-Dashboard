import React from 'react'
import OnboardingPharmacyDoctors from '../../Components/PharmacyDoctors/OnboardingPharmacyDoctors'
import MySideBar from '../../Components/MySideBar/MySideBar'
import MobileNavbar from '../../Components/MobileNavbar/MobileNavbar'

const OnBoardingPharmacyPage = () => {
    return (
        <>
            <div className="sm:flex hidden">
                <div>
                    <MySideBar />
                </div>
                <div className="w-[100%]">
                    <OnboardingPharmacyDoctors />
                </div>
            </div>
            <div className="sm:hidden block">
                <div>
                    <MobileNavbar />
                </div>
                <div className="w-[100%]">
                    <OnboardingPharmacyDoctors />
                </div>
            </div>
        </>
    )
}

export default OnBoardingPharmacyPage
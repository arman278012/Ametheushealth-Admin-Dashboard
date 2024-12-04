
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaUserDoctor } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
function OnboardingDrList() {
    const navigate=useNavigate()
    const [categories,setCategories]=useState([])
    useEffect(()=>{
    FetchAllDocter()
    },[])
    const FetchAllDocter=async()=>{
       
        try {
            const res=await axios.get("https://api.assetorix.com/ah/api/v1/dc/admin/doctor/processing",{
                headers: {
                    authorization: `Bearer ${localStorage.getItem("authorization")}`,
                    id: localStorage.getItem("id"),
                  },
            })
            setCategories(res.data.data)
            
        } catch (error) {
            console.log(error)
            
        }
    }


    const convertToIST = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          ...options,
        });
      };

      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
  return (
    <div>
        <div className="overflow-x-auto mt-5 border-2 p-5">
          <Table>
            <Thead>
              <Tr>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[5%]">
                  <input type="checkbox" className="form-checkbox" />
                </Th>
                <Th className="py-2 px-4 border-b  border-gray-300 text-left w-[15%]">
                  Avatar
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[25%]">
                  Name
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-center w-[10%]">
                  Gender
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-center w-[30%]">
                  Hospital Name
                </Th>
                <Th className="py-2 px-4 border-b border-gray-300 text-left w-[15%]">
                  Created At
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories?.map((order, index) => (
                <Tr key={index}>
                  <Td className="py-2 px-4 border-b border-gray-300">
                    <input type="checkbox" className="form-checkbox" />
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 l">
                    {order?.userDetails?.avatar ? (
                      <img
                        src={order.userDetails.avatar}
                        className="h-[60px] w-[60px] rounded-full"
                      />
                    ) : (
                      <div className="">
                        <FaUserDoctor className="h-[50px] w-[50px] rounded-full" />
                      </div>
                    )}
                  </Td>
                  <Td className="py-2 px-4 border-b text-[14px] border-gray-300">
                    <p className="font-bold capitalize">
                      {order?.userDetails?.name}
                    </p>
                    {order._id}
                    <div className="flex gap-2">
                      {/* <button
                        className="text-[#2271b1]"
                        onClick={() => navigate(`${order._id}`)}
                      >
                        View
                      </button> */}
                      {/* <span className="text-[#2271b1]">|</span> */}
                      <button
                        className="text-[#2271b1]"
                        onClick={() => navigate(`/edit-doctor/${order._id}`)}
                      >
                        Edit
                      </button>
                    </div>
                  </Td>
                  <Td className="py-2 px-8 border-b border-gray-300 text-[14px]">
                    {order?.userDetails?.gender}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[14px] text-center">
                    {order.hospitalName}
                  </Td>
                  <Td className="py-2 px-4 border-b border-gray-300 text-[13px]">
                    {convertToIST(order?.categories[0]?.createdAt)}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
    </div>
  )
}

export default OnboardingDrList

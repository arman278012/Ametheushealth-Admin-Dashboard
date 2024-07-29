import React from "react";
import { NavLink } from "react-router-dom";

const LoginAlert = () => {
  return (
    <div>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-4 text-center">Login Required</h2>
          <p class="mb-4 text-gray-700 text-center">
            Please login to access the website.
          </p>
          <div class="flex flex-col space-y-4 items-center">
            <button class="py-2 px-4 font-bold bg-[rgba(169,29,58,0.9)] text-white rounded hover:bg-[rgba(169,29,58,1)] w-full md:w-auto">
              <NavLink to="/">Login</NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAlert;

import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const userLogin = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/user/login`,
        values
      );
      if (response.status === 200) {
        localStorage.setItem("authorization", response.data.x_auth_token);
        localStorage.setItem("id", response.data.x_userid);
        toast.success("Login Successful...");
        navigate("/product-details");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <div className="bg-white flex flex-col gap-5 p-8 rounded shadow-md w-full max-w-sm">
          <img src="ametheusLogo.webp" alt="Logo" />
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              userLogin(values);
              console.log(values);
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <div className="mb-4 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-2 top-[47px] transform -translate-y-1/2 text-gray-700"
                  >
                    {isPasswordVisible ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <FaRegEye />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="bg-[#13a3bc] hover:bg-[#13b6d5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;

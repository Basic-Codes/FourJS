import { Link, useLocation } from "wouter";
import AuthLayout from "./AuthLayout";
import { useState } from "react";
import { useEffect } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { BACKEND_URL } from "../../../helper/staticVars";
const SignUp = () => {
  const [location, setLocation] = useLocation();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    user_type: "student",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${BACKEND_URL}/api/signup`, data)
      .then(function (response) {
        if (response.data.token) {
          localStorage.setItem("vr_token", response.data.token);
          setLocation("/");
        } else {
          console.log("no token");
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  const onChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <AuthLayout title="Sign Up">
      <form action="">
        <div className="mb-5">
          <div className="font-bold mb-2">Name</div>
          <input
            onChange={onChange}
            value={data.name}
            type="text"
            name="name"
            required
            className="px-3 py-1 text-lg outline-none border border-gray-400 rounded w-full placeholder:text-sm"
            placeholder="Enter name.."
          />
        </div>
        <div className="mb-5">
          <div className="font-bold mb-2">Email</div>
          <input
            onChange={onChange}
            value={data.email}
            type="text"
            name="email"
            required
            className="px-3 py-1 text-lg outline-none border border-gray-400 rounded w-full placeholder:text-sm"
            placeholder="Enter email.."
          />
        </div>
        <div className="mb-5">
          <div className="font-bold mb-2">Password</div>
          <input
            onChange={onChange}
            value={data.password}
            type="text"
            name="password"
            required
            className="px-3 py-1 text-lg outline-none border border-gray-400 rounded w-full placeholder:text-sm"
            placeholder="Enter password.."
          />
        </div>

        <div className="mb-5">
          <div className="font-bold mb-2">Select User Type</div>
          <select
            onChange={onChange}
            value={data.user_type}
            name="user_type"
            className="px-3 py-2  outline-none border border-gray-400 rounded w-full placeholder:text-sm"
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <Link href="/login">
          <div className="text-xs">
            <span className="mr-1">Already have an accound?</span>
            <span className="font-semibold text-[#4B4DF7] cursor-pointer ">
              Login
            </span>
          </div>
        </Link>

        <div className="w-full text-center mt-5">
          <button
            type="submit"
            onClick={onSubmit}
            className="px-5 py-1 text-lg bg-[#4B4DF7] text-white font-bold rounded"
          >
            Sign Up
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;

/* eslint-disable no-unused-vars */
import { Link, useLocation } from "wouter";
import AuthLayout from "./AuthLayout";
import { useState } from "react";
import { BACKEND_URL } from "../../../helper/staticVars";
import axios from "axios";
import { setUser } from "../../../stores/user";
import { toast } from "react-toastify";

const Login = () => {
    const [location, setLocation] = useLocation();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const onSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${BACKEND_URL}/api/login`, data)
            .then(function (response) {
                if (response?.data?.token) {
                    setUser(response.data?.user);
                    localStorage.setItem("vr_token", response.data.token);
                    setLocation("/");
                } else {
                    console.error("no token");
                    toast.error("no token");
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
                if (error?.response?.data?.msg) {
                    toast.error(error?.response?.data?.msg);
                } else if (error?.response?.data?.errors) {
                    error?.response?.data?.errors?.forEach((item) => {
                        toast.error(item?.msg);
                    });
                } else {
                    toast.error("Something went wrong!");
                }
            });
    };

    const onChange = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <AuthLayout title="Login">
            <div className="mb-5">
                <div className="font-bold mb-2">Email</div>
                <input
                    type="text"
                    className="px-3 py-2 text-base outline-none border border-gray-400 rounded w-full placeholder:text-sm"
                    placeholder="Enter email.."
                    name="email"
                    onChange={onChange}
                    value={data.email}
                />
            </div>
            <div className="">
                <div className="font-bold mb-2">Password</div>
                <input
                    type="password"
                    className="px-3 py-2 text-base outline-none border border-gray-400 rounded w-full placeholder:text-sm"
                    placeholder="Enter password.."
                    onChange={onChange}
                    name="password"
                    value={data.password}
                />
            </div>

            <Link href="/signup">
                <div className="mt-3 text-xs">
                    <span className="mr-1">Don`t have an accound?</span>
                    <span className="font-semibold text-[#4B4DF7] cursor-pointer ">
                        Sign Up
                    </span>
                </div>
            </Link>

            <div className="w-full text-center mt-5">
                <button
                    onClick={onSubmit}
                    className="px-5 py-1 text-lg bg-[#4B4DF7] text-white font-bold rounded"
                >
                    Login
                </button>
            </div>
        </AuthLayout>
    );
};

export default Login;

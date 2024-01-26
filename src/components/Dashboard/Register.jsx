import { Link } from "wouter";
import AuthLayout from "./AuthLayout";
import { useState } from "react";
import { useEffect } from "react";

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        user_type: "student",
    });

    const onChange = (e) => {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <AuthLayout title="Sign Up">
            <div className="mb-5">
                <div className="font-bold mb-2">Name</div>
                <input
                    onChange={onChange}
                    value={data.name}
                    type="text"
                    name="name"
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
                <button className="px-5 py-1 text-lg bg-[#4B4DF7] text-white font-bold rounded">
                    Sign Up
                </button>
            </div>
        </AuthLayout>
    );
};

export default SignUp;

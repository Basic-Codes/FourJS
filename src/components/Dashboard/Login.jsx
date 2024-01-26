import { Link } from "wouter";
import AuthLayout from "./AuthLayout";

const Login = () => {
    return (
        <AuthLayout title="Login">
            <div className="mb-5">
                <div className="font-bold mb-2">Email</div>
                <input
                    type="text"
                    className="px-3 py-1 text-lg outline-none border border-gray-400 rounded w-full placeholder:text-sm"
                    placeholder="Enter email.."
                />
            </div>
            <div className="">
                <div className="font-bold mb-2">Password</div>
                <input
                    type="text"
                    className="px-3 py-1 text-lg outline-none border border-gray-400 rounded w-full placeholder:text-sm"
                    placeholder="Enter password.."
                />
            </div>

            <Link href="/signup">
                <div className="mt-3 text-xs">
                    <span className="mr-1">Don't have an accound?</span>
                    <span className="font-semibold text-[#4B4DF7] cursor-pointer ">
                        Sign Up
                    </span>
                </div>
            </Link>

            <div className="w-full text-center mt-5">
                <button className="px-5 py-1 text-lg bg-[#4B4DF7] text-white font-bold rounded">
                    Login
                </button>
            </div>
        </AuthLayout>
    );
};

export default Login;

import React from "react";
import { useStore } from "@nanostores/react";
import { $user } from "../../../stores/user";
import NavbarProfileButton from "./NavbarProfileButton";
import { FiPlus } from "react-icons/fi";

const Navbar = () => {
    const user = useStore($user);
    return (
        <div className="fixed w-full bg-white border-2 py-2">
            <div className="flex justify-between items-center max-w-screen-2xl mx-auto px-5 md:px-10">
                <div className="flex items-center md:space-x-5 space-x-3">
                    <figure>
                        <img
                            src="/logo/logo.png"
                            alt=""
                            className="md:w-12 w-10"
                        />
                    </figure>
                    <p className="uppercase font-semibold hidden md:block md:text-lg text-[12px] ">
                        VR classroom
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                        <FiPlus className="text-2xl" />
                    </div>

                    <div className="font-semibold">
                        <p className="capitalize text-sm md:text-lg">
                            {user?.name}
                        </p>
                        <p className=" text-[12px] md:text-md text-gray-500 u">
                            {user?.isTeacher ? "Teacher" : "Student"}
                        </p>
                    </div>

                    <NavbarProfileButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

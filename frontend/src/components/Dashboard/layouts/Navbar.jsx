import React from "react";
import { useStore } from "@nanostores/react";
import { $user, setUser } from "../../../stores/user";
import NavbarProfileButton from "./NavbarProfileButton";
import { FiPlus } from "react-icons/fi";
import Add_Join_Modal from "./Add_Join_Modal";
import { useState } from "react";
import { BACKEND_URL } from "../../../helper/staticVars";
import axios from "axios";
import { getAxiosHeader } from "../../../helper/utils";
import { Link } from "wouter";
import { $classrooms } from "../../../stores/classroom";
import { toast } from "react-toastify";

const Navbar = () => {
    let [isOpen, setIsOpen] = useState(false);
    let [name_or_code, setNameOrCode] = useState(false); // This cound be name or code

    const user = useStore($user);
    const classrooms = useStore($classrooms);

    const onSubmit = () => {
        if (user) {
            const data = user?.isTeacher
                ? {
                      name: name_or_code,
                  }
                : {
                      code: name_or_code,
                  };

            const url = user?.isTeacher
                ? `${BACKEND_URL}/api/classroom/add`
                : `${BACKEND_URL}/api/classroom/join`;

            axios
                .post(url, data, {
                    headers: getAxiosHeader(),
                })
                .then(function (response) {
                    if (response?.data?.classroom) {
                        setIsOpen(false);
                        $classrooms.set([
                            ...classrooms,
                            {
                                classroom: response?.data?.classroom,
                                teacher: response?.data?.teacher,
                            },
                        ]);
                    } else {
                        console.error(response?.data?.msg);
                        toast.error(response?.data?.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error("Something went wrong");
                });
        }
    };

    return (
        <div className="fixed w-full bg-white border-2 py-2">
            <div className="flex justify-between items-center max-w-screen-2xl mx-auto px-5 md:px-10">
                <Link href="/">
                    <div className="flex items-center md:space-x-5 space-x-3 cursor-pointer">
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
                </Link>
                <div className="flex items-center space-x-4">
                    <div
                        onClick={() => setIsOpen(true)}
                        className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <FiPlus className="text-2xl" />
                    </div>
                    <Add_Join_Modal
                        title={
                            user?.isTeacher
                                ? "Create Classroom"
                                : "Join Classroom"
                        }
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        onSubmit={onSubmit}
                    >
                        <div>
                            <div className="mb-2 mt-5">
                                <input
                                    type="text"
                                    className="px-3 py-2 text-base outline-none border border-gray-400 rounded w-full placeholder:text-sm"
                                    placeholder={
                                        user?.isTeacher
                                            ? "Enter class name"
                                            : "Enter classroom code"
                                    }
                                    onChange={(e) =>
                                        setNameOrCode(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </Add_Join_Modal>

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

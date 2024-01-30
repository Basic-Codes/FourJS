import React from "react";
import { useStore } from "@nanostores/react";
import { $user } from "../../../stores/user";
import { Popover } from "@headlessui/react";
import NavbarProfileButton from "./NavbarProfileButton";
const Navbar = () => {
  const user = useStore($user);
  return (
    <div className="border-2 py-2 px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center md:space-x-10 space-x-3">
          <figure>
            <img src="/logo/logo.png" alt="" className="md:w-[60px] w-[32px]" />
          </figure>
          <p className="uppercase font-semibold md:text-lg text-[12px] ">
            VR classroom
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="font-semibold">
            <p className="capitalize text-sm md:text-lg">{user}</p>
            <p className=" text-[12px] md:text-md text-gray-500 u">Teacher</p>
          </div>

          <NavbarProfileButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

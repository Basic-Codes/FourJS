import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useStore } from "@nanostores/react";
import { $user } from "../../../stores/user";

const NavbarProfileButton = () => {
  const $auth_user = useStore($user);

  const Logout = () => {};

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          <div className="h-12 w-12 aspect-square rounded-full bg-gray-500 overflow-hidden mb-[-5px]">
            <img
              className="h-full w-full object-cover"
              src="https://cdn-icons-png.flaticon.com/512/168/168730.png"
              alt=""
            />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <div className="font-semibold text-center my-2 capitalize">
              {$auth_user}
            </div>

            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={Logout}
                  className={`cursor-pointer block mx-3 my-2 px-2 py-1.5 text-sm base-btn gray-btn text-gray-500 text-center`}
                >
                  Log Out
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavbarProfileButton;

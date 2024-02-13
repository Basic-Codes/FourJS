import { useStore } from "@nanostores/react";
import { $user, setUser } from "../../../stores/user";
import Navbar from "./Navbar";
import Class from "./ClassCard";
import axios from "axios";
import { BACKEND_URL } from "../../../helper/staticVars";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { getAxiosHeader } from "../../../helper/utils";

const Layout = ({ children }) => {
    const [location, setLocation] = useLocation();

    const user = useStore($user);

    useEffect(() => {
        if (user == null) {
            axios
                .get(`${BACKEND_URL}/api/login`, {
                    headers: getAxiosHeader(),
                })
                .then(function (response) {
                    if (response?.data?.user) {
                        setUser(response.data?.user);
                    } else {
                        console.error("no user");
                        setLocation("/login");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setLocation("/login");
                });
        }
    }, [user]);

    return (
        <div>
            <Navbar />

            <div className="px-5 md:px-10 max-w-screen-2xl mx-auto pt-20 md:pt-24 py-4">
                {children}
            </div>
        </div>
    );
};

export default Layout;

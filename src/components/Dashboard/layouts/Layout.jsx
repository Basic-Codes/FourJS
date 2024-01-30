import { useStore } from "@nanostores/react";
import { $user, setUser } from "../../../stores/user";
import Navbar from "./Navbar";
import Class from "./ClassCard";
import axios from "axios";
import { BACKEND_URL } from "../../../helper/staticVars";
import { useEffect } from "react";
import { useLocation } from "wouter";

const Layout = ({ children }) => {
    const [location, setLocation] = useLocation();

    const user = useStore($user);

    useEffect(() => {
        if (user == null) {
            const token = localStorage.getItem("vr_token");

            const headers = {
                "Content-Type": "application/json",
                "x-auth-token": token,
            };

            axios
                .get(`${BACKEND_URL}/api/login`, {
                    headers: headers,
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

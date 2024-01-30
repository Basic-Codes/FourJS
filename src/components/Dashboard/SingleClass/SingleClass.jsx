import { useStore } from "@nanostores/react";
import React from "react";
import { $user, setUser } from "../../../stores/user";
import Layout from "../layouts/Layout";
import axios from "axios";
import { BACKEND_URL } from "../../../helper/staticVars";
import { $single_classroom } from "../../../stores/classroom";
import { useEffect } from "react";
import { getAxiosHeader } from "../../../helper/utils";
import { Link, useLocation, useParams } from "wouter";

const SingleClass = () => {
    const [location, setLocation] = useLocation();
    const user = useStore($user);
    const params = useParams();
    const single_classroom = useStore($single_classroom);

    const getClassroom = () => {
        axios
            .get(`${BACKEND_URL}/api/classroom/get?code=${params.class_code}`, {
                headers: getAxiosHeader(),
            })
            .then(function (response) {
                console.log(response?.data?.classroom);
                if (response?.data?.classroom) {
                    $single_classroom.set({
                        classroom: response?.data?.classroom,
                        teacher: response?.data?.teacher,
                    });
                } else {
                    console.error(response?.data?.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const createSession = () => {
        axios
            .post(
                `${BACKEND_URL}/api/classroom/create-session`,
                {
                    code: params.class_code,
                },
                {
                    headers: getAxiosHeader(),
                }
            )
            .then(function (response) {
                console.log(response?.data?.classroom);
                if (response?.data?.classroom?.currentSessionCode) {
                    setLocation(
                        `/session/${response?.data?.classroom?.currentSessionCode}/teacher`
                    );
                } else {
                    console.error(response?.data?.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getClassroom();
    }, []);

    return (
        <div>
            <Layout>
                <div>
                    <div className="mb-5">
                        <div className="text-7xl font-bold mb-5 mt-2 text-red-400">
                            {single_classroom?.classroom?.code}
                        </div>
                        <div className="font-bold text-4xl">
                            {single_classroom?.classroom?.name}
                        </div>
                        <div className="text-lg text-gray-400">
                            {single_classroom?.teacher?.name}
                        </div>
                        <div className="text-lg text-gray-400">
                            {single_classroom?.teacher?.email}
                        </div>
                    </div>

                    <div className="">
                        {user?.isTeacher ? (
                            <button
                                onClick={() => createSession()}
                                className="px-5 py-1 text-lg bg-[#4B4DF7] text-white font-bold rounded"
                            >
                                Create VR Session
                            </button>
                        ) : (
                            <button className="px-5 py-1 text-lg bg-emerald-500 text-white font-bold rounded">
                                Join VR Session
                            </button>
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default SingleClass;

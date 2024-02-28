/* eslint-disable no-unused-vars */
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
import { toast } from "react-toastify";

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

    useEffect(() => {
        getClassroom();
    }, []);

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

    const joinSession = () => {
        if (single_classroom?.classroom?.currentSessionCode) {
            setLocation(
                `/session/${single_classroom?.classroom?.currentSessionCode}/student/${user.id}`
            );
        } else {
            toast.error("No session available");
            console.log("No session available");
        }
    };

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
                            <button
                                onClick={() => joinSession()}
                                className="px-5 py-1 text-lg bg-emerald-500 text-white font-bold rounded"
                            >
                                Join VR Session
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-10 space-y-5">
                    <div className="px-10 py-5 rounded-lg shadow-lg border">
                        <div className="font-semibold text-lg">Teacher 001</div>
                        <div className="text-red-500 text-lg">
                            Session has ended
                        </div>
                        <div>Session ended 5 min ago</div>
                    </div>
                    <div className="px-10 py-5 rounded-lg shadow-lg border">
                        <div className="font-semibold text-lg">Teacher 001</div>
                        <div className="text-emerald-500 text-lg">
                            has created a new session
                        </div>
                        <div>Session Started 50 min ago</div>
                    </div>
                    <div className="px-10 py-5 rounded-lg shadow-lg border">
                        <div className="font-semibold text-lg">Teacher 001</div>
                        <div className="text-emerald-500 text-lg">
                            has created a new session
                        </div>
                        <div>Session Started 5 min ago</div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default SingleClass;

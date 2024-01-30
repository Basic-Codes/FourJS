import { useStore } from "@nanostores/react";
import React from "react";
import { $user, setUser } from "../../../stores/user";
import Layout from "../layouts/Layout";
import ClassCard from "../layouts/ClassCard";
import { getAxiosHeader } from "../../../helper/utils";
import { $classrooms } from "../../../stores/classroom";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../helper/staticVars";

const Home = () => {
    const user = useStore($user);
    const classrooms = useStore($classrooms);

    const getClassrooms = () => {
        axios
            .get(`${BACKEND_URL}/api/classroom/list`, {
                headers: getAxiosHeader(),
            })
            .then(function (response) {
                console.log(response?.data?.classrooms);
                if (response?.data?.classrooms) {
                    $classrooms.set(response?.data?.classrooms);
                } else {
                    console.error(response?.data?.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
                setLocation("/login");
            });
    };

    useEffect(() => {
        getClassrooms();
    }, []);

    return (
        <div>
            <Layout>
                <div className="grid md:grid-cols-4 gap-5 md:gap-10 ">
                    {classrooms?.map((item) => (
                        <ClassCard
                            name={item?.classroom?.name}
                            code={item?.classroom?.code}
                            teacherName={item?.teacher?.name}
                        />
                    ))}
                </div>
            </Layout>
        </div>
    );
};

export default Home;

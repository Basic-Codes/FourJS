import { useStore } from "@nanostores/react";
import React from "react";
import { $user, setUser } from "../../../stores/user";
import Layout from "../layouts/Layout";
import ClassCard from "../layouts/ClassCard";

const Home = () => {
    const user = useStore($user);

    return (
        <div>
            <Layout>
                <div className="grid md:grid-cols-4 gap-5 md:gap-10 ">
                    <ClassCard />
                    <ClassCard />
                    <ClassCard />
                    <ClassCard />
                    <ClassCard />
                    <ClassCard />
                    <ClassCard />
                </div>
            </Layout>
        </div>
    );
};

export default Home;

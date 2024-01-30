import { useStore } from "@nanostores/react";
import React from "react";
import { $user, setUser } from "../../../stores/user";
import Layout from "../layouts/Layout";
import Class from "../layouts/Class";

const Home = () => {
  const user = useStore($user);

  return (
    <div>
      <Layout>
        <div className="grid md:grid-cols-3 max-w-screen-2xl mx-auto md:pt-24 py-4 gap-y-4  md:px-0 px-3 md:gap-10 ">
          <Class />
          <Class />
          <Class />

          <Class />
          <Class />
          <Class />

          <Class />
        </div>
      </Layout>
    </div>
  );
};

export default Home;

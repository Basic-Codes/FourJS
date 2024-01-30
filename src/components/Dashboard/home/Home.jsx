import { useStore } from "@nanostores/react";
import React from "react";
import { $user, setUser } from "../../../stores/user";
import Layout from "../layouts/Layout";

const Home = () => {
  const user = useStore($user);

  return (
    <div>
      home page
      <div onClick={() => setUser("NOOR")}>{user}</div>
      <Layout />
    </div>
  );
};

export default Home;

import { useStore } from "@nanostores/react";
import { $user, setUser } from "../../../stores/user";

const Layout = () => {
  const user = useStore($user);

  return <div>Layout: {user}</div>;
};

export default Layout;

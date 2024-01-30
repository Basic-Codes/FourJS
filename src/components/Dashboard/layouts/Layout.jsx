import { useStore } from "@nanostores/react";
import { $user, setUser } from "../../../stores/user";
import Navbar from "./Navbar";
import Class from "./Class";

const Layout = ({ children }) => {
  const user = useStore($user);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

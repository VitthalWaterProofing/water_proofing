import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import FloatingActions from "../FloatingActions";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <FloatingActions />
    </>
  );
};

export default PublicLayout;

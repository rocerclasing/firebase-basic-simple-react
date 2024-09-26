import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Private = () => {
  const { user } = useUserContext();

  console.log("PrivateLayout");

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default Private;

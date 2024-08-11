import { useContext } from "react";
import { AuthContext } from "../contenxt/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);

  // console.log(isAuthenticated);
  // console.log(authState);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};
export default ProtectedRoute;

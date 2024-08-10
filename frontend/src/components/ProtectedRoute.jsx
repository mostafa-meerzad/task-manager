import { useContext } from "react";
import { AuthContext } from "../contenxt/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children}) => {
  const { isAuthenticated } = useContext(AuthContext);

  if(!isAuthenticated) {

    return (
      <Navigate to={"/login"}/>
    );
  }
  return {children}
};
export default ProtectedRoute;

import { useContext } from "react";
import { AuthContext } from "../contenxt/AuthContext";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    >
      ProtectedRoute
    </Route>
  );
};
export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const AuthOutlet = ({ fallbackPath = "/login" }) => {
    const auth = useIsAuthenticated();

  return auth ? <Outlet/> : <Navigate to={fallbackPath} replace />;
};

AuthOutlet.propTypes = {
    fallbackPath: PropTypes.string,
}

export default AuthOutlet;
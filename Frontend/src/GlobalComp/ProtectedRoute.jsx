/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const isLoggedIn = useSelector((state) => state.getCurrentStatus.isUserLoggedIn);
	return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

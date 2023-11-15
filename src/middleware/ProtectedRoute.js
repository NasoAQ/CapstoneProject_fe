import { Outlet, Navigate } from "react-router-dom";
import Login from "../pages/Login";

export const isAuth = () => {
	return JSON.parse(localStorage.getItem("loggedInUser"));
};

export const isAdmin = () => {
	const user = isAuth();
	return user && user.role === "admin";
};

const ProtectedRoutes = () => {
	const auth = isAuth();
	const admin = isAdmin();

	if (!auth) {
		return <Login />;
	}

	return admin ? <Outlet /> : <Navigate state={{ from: "/" }} replace to="/" />;
};

export default ProtectedRoutes;

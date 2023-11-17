import { Outlet, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import { jwtDecode } from "jwt-decode";

export const isAuth = () => {
	return new Promise((resolve, reject) => {
		const user = JSON.parse(localStorage.getItem("loggedInUser"));
		if (user) {
			resolve(user);
		} else {
			reject("Utente non autenticato");
		}
	});
};

export const isAdmin = async () => {
	try {
		const user = await isAuth();
		return user && user.role === "admin";
	} catch (error) {
		console.error("Errore nell'ottenere l'utente autenticato:", error);
		return false;
	}
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

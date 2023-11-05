import React, { useState, useEffect } from "react";
import MainLayouts from "../layouts/MainLayouts";
import TravelForm from "../components/travelform/TravelForm";
import { jwtDecode } from "jwt-decode";
import { Container } from "react-bootstrap";
const Admin = () => {
	const [username, setUserName] = useState("");
	const token = localStorage.getItem("loggedInUser");
	const decodedToken = jwtDecode(token);
	const nickname = decodedToken.username;

	useEffect(() => setUserName(nickname), []);
	return (
		<MainLayouts>
			<Container className="mt-2">
				<div>
					Benvenuto, <span className="fw-bold"> {nickname}</span>
				</div>
			</Container>
			<TravelForm />
		</MainLayouts>
	);
};

export default Admin;

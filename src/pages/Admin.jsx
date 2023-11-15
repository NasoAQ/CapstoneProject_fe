import React, { useState, useEffect } from "react";
import MainLayouts from "../layouts/MainLayouts";
import TravelForm from "../components/travelform/TravelForm";
import { jwtDecode } from "jwt-decode";
import { Container } from "react-bootstrap";
import TestimonialTable from "../components/testimonialtable/TestimonialTable";
const Admin = () => {
	const [username, setUserName] = useState("");
	const token = localStorage.getItem("loggedInUser");
	const decodedToken = jwtDecode(token);
	const nickname = decodedToken.username;
	const role = decodedToken.role;

	useEffect(() => setUserName(nickname), []);
	return (
		<MainLayouts>
			<Container className="mt-2">
				<div className="fontnew">
					Benvenuto, <span className="fw-bold"> {nickname}</span> nell'{role}{" "}
					page!
				</div>
			</Container>
			<TravelForm />
			<TestimonialTable />
		</MainLayouts>
	);
};

export default Admin;

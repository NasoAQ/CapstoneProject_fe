import React, { useEffect, useState } from "react";
import { Dropdown, Image, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

const UserDropdown = () => {
	const [user, setUser] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("loggedInUser");

		if (token) {
			try {
				const user = jwtDecode(token);
				setUser(user);
				fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.id}`)
					.then(response => response.json())
					.then(data => {
						const userAvatar = data.newUser.avatar;
						setAvatarUrl(userAvatar);
					});
			} catch (error) {
				console.error("Errore nella codifica token", error);
			}
		}
	}, []);

	return (
		<Dropdown>
			<Dropdown.Toggle
				variant="warning"
				id="dropdown-basic"
				style={{ borderRadius: "50%", padding: "5px" }}
			>
				<Image
					src={
						avatarUrl ||
						"https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU="
					}
					style={{ width: "40px", height: "40px", borderRadius: "50%" }}
				/>
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item as={Link} to="/login">
					Login
				</Dropdown.Item>
				<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
				<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default UserDropdown;

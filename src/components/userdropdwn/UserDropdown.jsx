import React, { useEffect, useState } from "react";
import { Dropdown, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

const UserDropdown = () => {
	const [user, setUser] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState(null);
	const [nickname, setNickName] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("loggedInUser");
		setAvatarUrl(null);
		setNickName("");
		navigate("/");
	};

	useEffect(() => {
		const fetchAvatarUrl = async () => {
			const token = localStorage.getItem("loggedInUser");

			if (token) {
				try {
					const user = jwtDecode(token);
					const nickname = user.username;
					setNickName(nickname);
					setUser(user);

					const photos = user.photos || [];

					const savedAvatarUrl = localStorage.getItem("avatar_url");
					if (savedAvatarUrl) {
						setAvatarUrl(savedAvatarUrl);
					} else if (photos.length > 0) {
						const avatarUrl = photos[0].value;
						setAvatarUrl(avatarUrl);
						localStorage.setItem("avatar_url", avatarUrl);
					} else {
						const response = await fetch(
							`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.id}`
						);
						const data = await response.json();
						const userAvatar = data.newUser && data.newUser.avatar_url;

						if (!userAvatar) {
							const avatarUrl = photos.length > 0 ? photos[0].value : null;
							localStorage.setItem("avatar_url", avatarUrl);
						} else {
							setAvatarUrl(userAvatar);
							localStorage.setItem("avatar_url", userAvatar);
						}
					}
					setIsAdmin(user.role === "admin");
				} catch (error) {
					console.error("Errore nella codifica token", error);
				}
			}
		};

		fetchAvatarUrl();
	}, []);

	return (
		<Container className="d-flex align-items-center">
			<span className="me-1">
				Ciao {""} <strong> {nickname}</strong>
			</span>

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
					<Dropdown.Item as={Link} to="/registration">
						Registrati
					</Dropdown.Item>
					{isAdmin && (
						<Dropdown.Item as={Link} to="/admin">
							Admin
						</Dropdown.Item>
					)}
					<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Container>
	);
};

export default UserDropdown;

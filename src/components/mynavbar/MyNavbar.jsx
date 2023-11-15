import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import UserDropdown from "../userdropdwn/UserDropdown";
import "../mynavbar/mynav.css";

const MyNavbar = () => {
	return (
		<Navbar
			expand="lg"
			className="bg-light border-bottom nav-underline mb-3 fontnew"
		>
			<Container className="container-md">
				<Navbar.Brand className="navbar-brand d-lg-none">
					<Link to={"/"}>
						<Image
							src="https://raw.githubusercontent.com/NasoAQ/fe/main/src/Assets/LOGO.png"
							width=""
							height={80}
							className="myImg no-nav-underline"
							alt="logo"
						/>
					</Link>

					<UserDropdown />
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					className="border-0 p-0"
				/>
				<Navbar.Collapse id="basic-navbar-nav" className="border-0">
					<Nav className="mx-auto  align-items-center ">
						<Nav.Link as={NavLink} to="/" exact="true">
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to="/category">
							Avventure
						</Nav.Link>
						<Navbar.Brand className="px-5 d-none d-lg-block">
							<Link to={"/"}>
								<Image
									src="https://raw.githubusercontent.com/NasoAQ/fe/main/src/Assets/LOGO.png"
									width=""
									height={80}
									className="myImg"
									alt="logo"
									href="/"
								/>
							</Link>
						</Navbar.Brand>
						<Nav.Link as={NavLink} to="/testimonials">
							Testimonianze
						</Nav.Link>
						<Nav.Link as={NavLink} to="/contacts">
							Contattaci
						</Nav.Link>
					</Nav>
					<div className="px-5 d-none d-lg-block">
						<UserDropdown />
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default MyNavbar;

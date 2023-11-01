import React from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
	return (
		<Navbar expand="lg" className="bg-light border-bottom">
			<Container className="container-md">
				<Navbar.Brand className="navbar-brand d-lg-none">
					<Image
						src="https://raw.githubusercontent.com/NasoAQ/fe/main/src/Assets/LOGO.png"
						width=""
						height={80}
						//className="d-inline-block align-top"
						alt="logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					className="border-0 p-0"
				/>
				<Navbar.Collapse id="basic-navbar-nav" className="border-0">
					<Nav className="mx-auto  align-items-center">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/">Adventures</Nav.Link>
						<Navbar.Brand className="px-5 d-none d-lg-block">
							<Image
								src="https://raw.githubusercontent.com/NasoAQ/fe/main/src/Assets/LOGO.png"
								width=""
								height={80}
								//className="d-inline-block align-top"
								alt="logo"
							/>
						</Navbar.Brand>

						<Nav.Link href="#testimonials">Testimonials</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default MyNavbar;

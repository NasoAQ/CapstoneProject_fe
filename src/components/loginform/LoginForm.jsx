import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { jwtDecode } from "jwt-decode";
import Loader from "../spinner/Loader";

const LoginForm = () => {
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [login, setLogin] = useState(null);
	const [validated, setValidated] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};

	const onSubmit = async e => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
		}

		setValidated(true);

		try {
			setLoading(true);
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/login`,
				{
					headers: {
						"Content-type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(loginData),
				}
			);
			const data = await response.json();

			setLoading(false);

			if (data.token) {
				localStorage.setItem("loggedInUser", JSON.stringify(data.token));
				const decodedToken = jwtDecode(data.token);
				const role = decodedToken.role;
				if (role === "admin") {
					navigate("/admin");
				} else if (role === "user") {
					navigate("/");
				}
			} else {
				alert("Email o password errate. Si prega di riprovare.");
			}
			setLogin(data);
		} catch (error) {
			console.log(error);
			setLoading(false);
			alert("Email o password errate. Si prega di riprovare.");
		}
	};

	const redirectForLoginWithGithub = () => {
		window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
	};

	useEffect(() => {
		let params = new URLSearchParams(document.location.search);
		const token = params.get("token");

		if (token !== null) {
			localStorage.setItem("loggedInUser", JSON.stringify(token));

			const decodedToken = jwtDecode(token);
			if (decodedToken.role === "admin") {
				console.log("Navigating to /admin");
				navigate("/admin");
			} else {
				navigate("/");
			}
		}
	}, []);
	return (
		<Container className="sm my-3 py-1 bg-light border-bottom d-flex justify-content-center">
			{loading ? (
				<Loader />
			) : (
				<Row className="d-flex flex-column justify-content-center">
					<h3 className="text-warning-emphasis fontnew fst-italic fw-semibold text-center">
						Effettua il login
					</h3>
					<Form
						noValidate
						validated={validated}
						className="my-3"
						autoComplete="off"
						onSubmit={onSubmit}
					>
						<Form.Group as={Col} controlId="validationCustom01">
							<Form.Label>E-mail</Form.Label>
							<Form.Control
								required
								name="email"
								type="email"
								placeholder="e-mail"
								onChange={handleInputChange}
							/>
							<Form.Control.Feedback>Corretto!</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="validationCustom02">
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								name="password"
								type="password"
								placeholder="password"
								onChange={handleInputChange}
							/>
							<Form.Control.Feedback>Corretto!</Form.Control.Feedback>
						</Form.Group>
						<Col className="mt-2 d-flex flex-column">
							<Button type="submit" variant="warning">
								Login
							</Button>
						</Col>
					</Form>
					<Col>
						<Button
							onClick={() => redirectForLoginWithGithub()}
							type="button"
							variant="dark"
							className="btn btn-sm"
						>
							<Github /> Login with github
						</Button>
					</Col>
					<Col>
						<Link
							to={"/registration"}
							className="my-2 d-flex align-items-center text-xs font-weight-light text-center text-muted"
						>
							<span className="ml-2">Non hai un account?</span>
						</Link>
					</Col>
				</Row>
			)}
		</Container>
	);
};

export default LoginForm;

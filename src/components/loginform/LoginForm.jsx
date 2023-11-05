import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginForm = () => {
	const [loginData, setLoginData] = useState({});
	const [login, setLogin] = useState(null);
	const [validated, setValidated] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = e => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};

	const onSubmit = async e => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
		}

		setValidated(true);

		try {
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

			if (data.token) {
				localStorage.setItem("loggedInUser", JSON.stringify(data.token));
				navigate("/admin");
			} else {
				alert("Email o password errate. Si prega di riprovare.");
			}
			setLogin(data);
		} catch (error) {
			console.log(error);
			alert("Email o password errate. Si prega di riprovare.");
		}
	};

	useEffect(() => {
		let params = new URLSearchParams(document.location.search);
		const token = params.get("token");
		if (token !== null) {
			localStorage.setItem("loggedInUser", JSON.stringify(token));
			navigate("/");
		}
	}, []);
	return (
		<Container className="sm my-3 py-1 bg-light border-bottom d-flex justify-content-center">
			<Row className="d-flex flex-column justify-content-center">
				<h3 className="text-warning-emphasis">Login your account</h3>
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
							type="email"
							placeholder="e-mail"
							onChange={handleInputChange}
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="validationCustom02">
						<Form.Label>Password</Form.Label>
						<Form.Control
							required
							type="password"
							placeholder="password"
							onChange={handleInputChange}
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Col className="my-2 d-flex flex-column">
						<Button
							type="submit"
							//className="bg-primary-subtle "
							variant="warning"
						>
							Login
						</Button>
					</Col>
				</Form>
				<Col>
					<Link
						to="/registration"
						className="d-flex align-items-center text-xs font-weight-light text-center text-muted"
					>
						<span className="ml-2">You don't have an account?</span>
					</Link>
				</Col>
			</Row>
			<Row></Row>
		</Container>
	);
};

export default LoginForm;

import React, { useState } from "react";
import { Button, Container, Form, Col, Row, Alert } from "react-bootstrap";

const ContactForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const [showAlert, setShowAlert] = useState(false);
	const [validated, setValidated] = useState(false);

	function encode(data) {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			.join("&");
	}

	const handleSubmit = async e => {
		e.preventDefault();
		e.stopPropagation();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			setValidated(true);
			return;
		}

		setValidated(true);
		try {
			const response = await fetch("/", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: encode({ "form-name": "contact", name, email, message }),
			});

			if (response.ok) {
				setAlertVariant("success");
				setAlertMessage("Message sent successfully!");
				setShowAlert(true);
				setValidated(false);
			} else {
				throw new Error(
					`Server responded with ${response.status} ${response.statusText}`
				);
			}
		} catch (error) {
			setAlertVariant("danger");
			setAlertMessage(`Error: ${error.message}`);
			setShowAlert(true);
		}
	};

	return (
		<Container
			id="contact"
			className="sm my-3 py-1 bg-light border-bottom d-flex justify-content-center"
		>
			<Row className="d-flex flex-column justify-content-center align-items-center">
				<Col className="col-6">
					<h2 className="text-warning-emphasis fst-italic text-center fontnew fw-semibold">
						Contact us
					</h2>
					<p className="mb-5 text-warning-emphasis text-center fontnew fs-5 fst-italic">
						Fill out the form with your preferred dates and specific requests.
						We'll contact you soon to plan your dream vacation together
						collaboratively.
					</p>
				</Col>
				<Form
					noValidate
					validated={validated}
					data-netlify="true"
					name="contact"
					onSubmit={handleSubmit}
					className="col-6"
				>
					<Form.Group as={Col} controlId="name" className="mb-4">
						<input type="hidden" name="form-name" value="contact" />
						<Form.Label>Name</Form.Label>
						<Form.Control
							required
							type="text"
							name="name"
							onChange={e => setName(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a name.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="email" className="mb-4">
						<Form.Label>E-mail</Form.Label>
						<Form.Control
							required
							type="email"
							name="email"
							onChange={e => setEmail(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid e-mail.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="message" className="mb-4">
						<Form.Label>Message</Form.Label>
						<Form.Control
							required
							as="textarea"
							name="message"
							rows="4"
							onChange={e => setMessage(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a comment.
						</Form.Control.Feedback>
					</Form.Group>
					<Button type="submit" className="btn btn-warning">
						Submit
					</Button>
					{showAlert && (
						<Alert variant={alertVariant} className="mt-3">
							{alertMessage}
						</Alert>
					)}
				</Form>
			</Row>
		</Container>
	);
};

export default ContactForm;

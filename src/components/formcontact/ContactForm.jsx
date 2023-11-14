import React, { useState } from "react";
import { Button, Container, Form, Row, Alert } from "react-bootstrap";

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
			className=" py-2 bg-light border-bottom d-flex justify-content-center my-5"
		>
			<Row className="d-flex flex-column justify-content-center">
				<h2 className="text-warning-emphasis fst-italic text-center">
					Contact us
				</h2>
				<p className="mb-5 text-warning-emphasis text-center fst-italic">
					Fill out the form with your preferred dates and specific requests.
					We'll contact you soon to plan your dream vacation together
					collaboratively.
				</p>
				<Form
					noValidate
					validated={validated}
					data-netlify="true"
					name="contact"
					onSubmit={handleSubmit}
				>
					<Form.Group controlId="name" className="mb-4">
						<input type="hidden" name="form-name" value="contact" />
						<Form.Label /* htmlFor="name" */>Name</Form.Label>
						<Form.Control
							required
							type="text"
							//id="name"
							name="name"
							onChange={e => setName(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a name.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="email" className="mb-4">
						<Form.Label /* htmlFor="email" */>E-mail</Form.Label>
						<Form.Control
							required
							type="email"
							//id="email"
							name="email"
							onChange={e => setEmail(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid e-mail.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="message" className="mb-4">
						<Form.Label /* htmlFor="message" */>Message</Form.Label>
						<Form.Control
							required
							as="textarea"
							//id="message"
							name="message"
							rows="4"
							onChange={e => setMessage(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a comment.
						</Form.Control.Feedback>
					</Form.Group>
					<Button type="submit" className="btn btn-primary">
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

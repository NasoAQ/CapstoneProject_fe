import React, { useState } from "react";
import { Button, Container, Form, Col, Row, Alert } from "react-bootstrap";

const ContactForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [date, setDate] = useState("");
	const [dateTwo, setDateTwo] = useState("");
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
				body: encode({
					"form-name": "contact",
					name,
					email,
					date,
					dateTwo,
					message,
				}),
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
						Contattaci
					</h2>
					<p className="mb-5 text-warning-emphasis text-center fontnew fs-5 fst-italic">
						Compila il modulo con le date preferite e le richieste specifiche.
						Ci metteremo presto in contatto con te per pianificare insieme la
						tua vacanza da sogno in modo collaborativo.
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
						<Form.Label>Nome</Form.Label>
						<Form.Control
							required
							type="text"
							name="name"
							onChange={e => setName(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Inserisci un nome.
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
							Inserisci un e-mail valida.
						</Form.Control.Feedback>
					</Form.Group>
					<Row>
						<Form.Group as={Col} controlId="date" className="mb-4" md={6}>
							<Form.Label>Dal</Form.Label>
							<Form.Control
								required
								type="date"
								name="date"
								onChange={e => setDate(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid">
								Inserisci una data valida.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="dateTwo" className="mb-4" md={6}>
							<Form.Label>Al</Form.Label>
							<Form.Control
								required
								type="date"
								name="dateTwo"
								onChange={e => setDateTwo(e.target.value)}
							/>
							<Form.Control.Feedback type="invalid">
								Inserisci una data valida.
							</Form.Control.Feedback>
						</Form.Group>
					</Row>
					<Form.Group as={Col} controlId="message" className="mb-4">
						<Form.Label>Messaggio</Form.Label>
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
					<Col className="my-2 d-flex flex-column">
						<Button type="submit" variant="warning">
							Submit
						</Button>
					</Col>
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

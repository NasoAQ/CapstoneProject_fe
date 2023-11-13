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
			className=" py-2 bg-light border-bottom d-flex justify-content-center my-5 fst-italic"
		>
			<Row className="d-flex flex-column justify-content-center">
				{/* <div className="col-lg-7 col-md-12 bg-dark text-white rounded-lg p-5 position-relative">
					<iframe
						width="100%"
						height="100%"
						title="map"
						className="position-absolute inset-0"
						frameBorder={0}
						marginHeight={0}
						marginWidth={0}
						style={{ filter: "opacity(0.7)" }}
						src="src="https://www.google.com/maps/embed/v1/place?q=L'Aquila,+AQ,+Italia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8""
					/>
					<div className="bg-dark relative flex flex-wrap py-4 rounded shadow-md">
						<div className="col-lg-6 col-md-12">
							<h2 className="title-font font-semibold text-white tracking-widest text-xs">
								ADDRESS
							</h2>
							<p className="mt-1">
								97 Warren St. <br />
								New York, NY 10007
							</p>
						</div>
						<div className="col-lg-6 col-md-12 mt-4 lg:mt-0">
							<h2 className="title-font font-semibold text-white tracking-widest text-xs">
								EMAIL
							</h2>
							<a
								href="mailto:reedbarger@email.com"
								className="text-indigo-400 leading-relaxed"
							>
								reedbarger@email.com
							</a>
							<h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
								PHONE
							</h2>
							<p className="leading-relaxed">123-456-7890</p>
						</div>
					</div>
				</div> */}
				<h2 className="text-warning-emphasis">Contact us</h2>
				<p className="leading-relaxed mb-5">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
					suscipit officia aspernatur veritatis. Asperiores, aliquid?
				</p>
				<Form
					noValidate
					validated={validated}
					data-netlify="true"
					name="contact"
					onSubmit={handleSubmit}
				>
					<Form.Group className="mb-4">
						<input type="hidden" name="form-name" value="contact" />
						<Form.Label htmlFor="name" className=" text-gray-400">
							Name
						</Form.Label>
						<Form.Control
							required
							type="text"
							id="name"
							name="name"
							onChange={e => setName(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a name.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-4">
						<Form.Label htmlFor="email" className=" text-gray-400">
							E-mail
						</Form.Label>
						<Form.Control
							required
							type="email"
							id="email"
							name="email"
							onChange={e => setEmail(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid e-mail.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-4">
						<Form.Label htmlFor="message" className=" text-gray-400">
							Message
						</Form.Label>
						<Form.Control
							required
							as="textarea"
							id="message"
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

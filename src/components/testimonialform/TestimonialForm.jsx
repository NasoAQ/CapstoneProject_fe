import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "../spinner/Loader";

const TestimonialForm = ({ onTestimonialUpdate }) => {
	const { id } = useParams();
	const [testimonialData, setTestimonialData] = useState({
		testimonial: "",
		valutation: 0,
	});
	const [travelName, setTravelName] = useState("");
	const [validated, setValidated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setTestimonialData({
			...testimonialData,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		e.stopPropagation();
		setValidated(true);
		setLoading(true);

		try {
			const token = localStorage.getItem("loggedInUser");
			const user = jwtDecode(token);
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/travels/${id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ...testimonialData, user }),
				}
			);
			if (response.ok) {
				setLoading(false);
				console.log("Commento creato con successo");
				setValidated(false);
				setShowAlert(true);
				setTestimonialData({
					testimonial: "",
					valutation: 0,
				});

				onTestimonialUpdate();
				const form = e.target;
				const elements = form.elements;
				for (let i = 0; i < elements.length; i++) {
					if (elements[i].type !== "submit") {
						elements[i].value = "";
					}
				}
			} else {
				console.log("Errore nella creazione del commento");
			}
		} catch (error) {
			console.error("Errore nella chiamata", error);
		}
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/travels/${id}`)
			.then(response => response.json())
			.then(data => {
				setTravelName(data.travel.title);
			})
			.catch(error => {
				console.error("Errore nella richiesta:", error);
			});
	}, [id]);
	return (
		<Container className="sm my-3 py-1 bg-light border-bottom d-flex justify-content-center">
			<Row className="d-flex flex-column justify-content-center">
				<h3 className="text-warning-emphasis fst-italic">
					Leave a Testimonial for {travelName}
				</h3>
				<Form
					noValidate
					validated={validated}
					className="my-3"
					autoComplete="off"
					onSubmit={handleSubmit}
				>
					<Form.Group as={Col} controlId="formTestimonial">
						<Form.Label>Your experience</Form.Label>
						<Form.Control
							required
							as="textarea"
							name="testimonial"
							onChange={handleInputChange}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a comment.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formValutation">
						<Form.Label>Rating</Form.Label>
						<Form.Control
							required
							name="valutation"
							type="number"
							min="1"
							max="5"
							onChange={handleInputChange}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid rating (1-5).
						</Form.Control.Feedback>
					</Form.Group>

					<Col className="my-2 d-flex flex-column">
						<Button type="submit" variant="warning" disabled={loading}>
							{loading ? <Loader /> : "Submit Testimonial"}
						</Button>
					</Col>
				</Form>
				{showAlert && (
					<Alert
						variant="success"
						onClose={() => setShowAlert(false)}
						dismissible
						className="mt-3"
					>
						Testimonial sent successfully!
					</Alert>
				)}
			</Row>
		</Container>
	);
};

export default TestimonialForm;

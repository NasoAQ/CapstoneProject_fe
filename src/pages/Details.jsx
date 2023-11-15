import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Loader from "../components/spinner/Loader";
import { Card, Col, Container, Row, Button } from "react-bootstrap";

const Details = () => {
	const { id } = useParams();
	const [travel, setTravel] = useState({});
	const isAuthenticated = checkUserAuthentication();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/travels/${id}`)
			.then(response => response.json())
			.then(data => {
				setTravel(data.travel);
				setLoading(false);
			})
			.catch(error => {
				console.error("Errore nella richiesta:", error);
				setLoading(false);
			});
	}, [id]);

	function checkUserAuthentication() {
		const token = localStorage.getItem("loggedInUser");
		return !!token;
	}

	return (
		<MainLayouts>
			<Container className="sm my-3 py-1 bg-light border-bottom d-flex justify-content-center">
				{loading ? (
					<Loader />
				) : (
					<Row className="py-3">
						<h2 className="text-warning-emphasis text-center fst-italic fontnew fw-semibold">
							{travel.title}
						</h2>
						<Col>
							<Card className="h-100">
								<Card.Img variant="top" src={travel.cover} alt={travel.title} />
								<Card.Body>
									<Card.Subtitle className="mb-2 text-muted">
										{travel.category}
									</Card.Subtitle>
									<Card.Title className="text-warning-emphasis">
										{travel.title}
									</Card.Title>
									<Card.Text>{travel.content}</Card.Text>
									<div className="d-flex justify-content-between ">
										<Card.Text className="text-primary">
											A partire da{" "}
											<span className="text-warning-emphasis fw-semibold">
												{" "}
												{travel.price} €
											</span>
										</Card.Text>
										<Button
											as={Link}
											to={`/contacts`}
											variant="outline-warning"
											className="btn-sm"
										>
											Contattaci
										</Button>
										{isAuthenticated ? (
											<Button
												as={Link}
												to={`/testimonials/${id}`}
												variant="light"
												className="btn-sm"
											>
												Lascia una recensione.
											</Button>
										) : (
											<Button
												as={Link}
												to={`/login`}
												variant="light"
												className="btn-sm"
											>
												Login per lasciare una recensione.
											</Button>
										)}
									</div>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				)}
			</Container>
		</MainLayouts>
	);
};

export default Details;

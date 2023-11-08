import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import { Card, Col, Container, Row, Button } from "react-bootstrap";

const Details = () => {
	const { id } = useParams();
	const [travel, setTravel] = useState({});
	const isAuthenticated = checkUserAuthentication();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/travels/${id}`)
			.then(response => response.json())
			.then(data => {
				setTravel(data.travel);
			})
			.catch(error => {
				console.error("Errore nella richiesta:", error);
			});
	}, [id]);

	function checkUserAuthentication() {
		const token = localStorage.getItem("loggedInUser");
		return !!token;
	}

	return (
		<MainLayouts>
			<Container className="py-3 bg-light border-bottom">
				<Row>
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
										Price: {travel.price} €
									</Card.Text>
									<Button
										as={Link}
										to={`/contacts`}
										variant="outline-warning"
										className="btn-sm"
									>
										Contact us
									</Button>
									{isAuthenticated ? (
										<Button
											as={Link}
											to={`/testimonials`}
											variant="light"
											className="btn-sm"
										>
											Comment
										</Button>
									) : (
										<Link to={`/login`}>
											<Button variant="light" className="btn-sm">
												Login to Comment
											</Button>
										</Link>
									)}
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</MainLayouts>
	);
};

export default Details;

import React from "react";
import { Card, Button } from "react-bootstrap";

const TravelCard = props => {
	const { title, category, price, content, cover } = props.travel;

	return (
		<Card className="h-100">
			<Card.Img variant="top" src={cover} alt={title} />
			<Card.Body>
				<Card.Title className="text-warning-emphasis">{title}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
				<Card.Text>{content}</Card.Text>
				<Card.Text className="text-primary">Price: {price} €</Card.Text>
				<Button variant="warning">Book Now</Button>
			</Card.Body>
		</Card>
	);
};

export default TravelCard;

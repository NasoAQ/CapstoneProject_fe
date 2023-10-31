import React from "react";
import { Card } from "react-bootstrap";

const Jumbotron = () => {
	return (
		<Card className="bg-dark text-white">
			<Card.Img
				src="10f5a5d25e2808a8a47ee054a2698af9 (1).jpg"
				alt="Card image"
			/>
			<Card.ImgOverlay>
				<Card.Title>Card title</Card.Title>
				<Card.Text>
					This is a wider card with supporting text below as a natural lead-in
					to additional content. This content is a little bit longer.
				</Card.Text>
				<Card.Text>Last updated 3 mins ago</Card.Text>
			</Card.ImgOverlay>
		</Card>
	);
};

export default Jumbotron;

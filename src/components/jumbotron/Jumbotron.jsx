import React from "react";
import { Card } from "react-bootstrap";

const Jumbotron = () => {
	return (
		<Card className=" text-white border-0 rounded-0">
			<Card.Img
				src="https://hannahfielding.net/wp-content/uploads/2021/02/Egypt-desert.jpg"
				alt="Card image"
				className="rounded-0 opacity-75"
			/>
			<Card.ImgOverlay className="text-center text-white my-5 pt-5 border-0 rounded-0">
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

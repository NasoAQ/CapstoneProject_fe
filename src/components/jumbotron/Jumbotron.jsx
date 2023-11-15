import React from "react";
import { Card } from "react-bootstrap";
import "./jumbostyle.css";

const Jumbotron = () => {
	return (
		<Card
			className=" text-white border-0 rounded-0 "
			style={{ maxHeight: "500px" }}
		>
			<Card.Img
				src="https://hannahfielding.net/wp-content/uploads/2021/02/Egypt-desert.jpg"
				alt="Card image"
				className="rounded-0 opacity-75"
				style={{ maxHeight: "100%", objectFit: "cover", overflow: "hidden" }}
			/>
			<Card.ImgOverlay className="text-center text-white my-5 pt-5 border-0 rounded-0 d-flex flex-column justify-content-center">
				<Card.Title className="mytitle fs-1 fontnew ">
					Rigenera le tue emozioni
				</Card.Title>
				<Card.Text className="mytitle fs-3 m-0   fst-italic fontnew">
					Ogni cento metri, il mondo si trasforma
				</Card.Text>
				<Card.Text className="fs-4 mytitle fontnew  fst-italic">
					Esploralo con noi
				</Card.Text>
			</Card.ImgOverlay>
		</Card>
	);
};

export default Jumbotron;

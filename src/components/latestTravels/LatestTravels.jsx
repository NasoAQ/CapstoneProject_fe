import React from "react";
import { Container } from "react-bootstrap";
import CardCategory from "../cardcategory/CardCategory";

const LatestTravels = () => {
	return (
		<>
			<Container id="adventures" className="my-5 fst-italic">
				<h2 className="text-center text-warning-emphasis fontnew fw-semibold">
					Latest Adventures
				</h2>
				<CardCategory />
			</Container>
		</>
	);
};

export default LatestTravels;

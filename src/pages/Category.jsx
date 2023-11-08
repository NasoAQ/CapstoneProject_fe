import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import TravelCard from "../components/travelcard/TravelCard";
import { Col, Container, Row } from "react-bootstrap";

const Category = () => {
	const { categoryName } = useParams();
	const [categoryTravels, setCategoryTravels] = useState([]);

	useEffect(() => {
		if (categoryName) {
			fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/travels/category/${categoryName}`
			)
				.then(response => response.json())
				.then(data => {
					if (data.travels) {
						setCategoryTravels(data.travels);
					}
				})
				.catch(error => {
					console.error("Errore durante la richiesta GET", error);
				});
		} else {
			// Altrimenti, se categoryName non è definito, effettua la richiesta per tutti i viaggi
			fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/travels`)
				.then(response => response.json())
				.then(data => {
					if (data.travels) {
						setCategoryTravels(data.travels);
					}
				})
				.catch(error => {
					console.error("Errore durante la richiesta GET", error);
				});
		}
	}, [categoryName]);
	return (
		<MainLayouts>
			<Container className="mt-5 text-center justify-content-center bg-light border-bottom">
				<h2 className="text-warning-emphasis fst-italic">
					{categoryName ? `Adventure: ${categoryName}` : "All Adventures"}
				</h2>
				<Row>
					{categoryTravels.map(travel => (
						<Col className="my-2" md={4} key={travel._id}>
							<TravelCard travel={travel} />
						</Col>
					))}
				</Row>
			</Container>
		</MainLayouts>
	);
};

export default Category;

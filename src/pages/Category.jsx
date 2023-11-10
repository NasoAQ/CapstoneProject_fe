import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import TravelCard from "../components/travelcard/TravelCard";
import Loader from "../components/spinner/Loader";
import { Col, Container, Row } from "react-bootstrap";

const Category = () => {
	const { categoryName } = useParams();
	const [categoryTravels, setCategoryTravels] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			try {
				let response;

				if (categoryName) {
					response = await fetch(
						`${process.env.REACT_APP_SERVER_BASE_URL}/travels/category/${categoryName}`
					);
				} else {
					response = await fetch(
						`${process.env.REACT_APP_SERVER_BASE_URL}/travels`
					);
				}

				const data = await response.json();

				if (data.travels) {
					setCategoryTravels(data.travels);
				}

				setLoading(false);
			} catch (error) {
				console.error("Errore durante la richiesta GET", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [categoryName]);

	return (
		<MainLayouts>
			<Container className="mt-5 text-center justify-content-center bg-light border-bottom">
				<h2 className="text-warning-emphasis fst-italic">
					{categoryName ? `Adventure: ${categoryName}` : "All Adventures"}
				</h2>

				{loading ? (
					<Loader /> // Mostra il loader se lo stato di loading è true
				) : (
					<Row>
						{categoryTravels.map(travel => (
							<Col className="my-2" md={4} key={travel._id}>
								<TravelCard travel={travel} />
							</Col>
						))}
					</Row>
				)}
			</Container>
		</MainLayouts>
	);
};

export default Category;

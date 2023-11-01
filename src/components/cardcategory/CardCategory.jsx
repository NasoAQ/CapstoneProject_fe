import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { myUrlImages } from "../../data/urlimg";
import "./mystyle.css";

const CardCategory = () => {
	const cardTitles = ["Glamping", "Sport", "Relax", "Yacht"];
	return (
		<Container>
			<Row xs={1} md={2} xl={4} className="g-4">
				{cardTitles.map((title, idx) => (
					<Col key={idx}>
						<Card className="mycard bg-secondary" style={{ height: "200px" }}>
							<Card.Img
								className=""
								src={myUrlImages[idx]}
								style={{ maxHeight: "100%", objectFit: "cover" }}
							/>
							<Card.ImgOverlay className="d-flex">
								<Card.Body className="d-flex justify-content-center align-items-center">
									<Card.Title className="mytitle text-warning text-center fs-2">
										{title}
									</Card.Title>
								</Card.Body>
							</Card.ImgOverlay>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default CardCategory;

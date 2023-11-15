import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";

const Error = () => {
	return (
		<Container className="my-3 py-3 text-center justify-content-center bg-light border-bottom">
			<h1>OOOOPS LA PAGINA NON ESISTE!</h1>
			<Button className="btn-success">
				<Link to="/">
					<span className="text-warning">Torna a casa {""}</span>
					<HouseFill size={50} color="orange" />
				</Link>
			</Button>
		</Container>
	);
};

export default Error;

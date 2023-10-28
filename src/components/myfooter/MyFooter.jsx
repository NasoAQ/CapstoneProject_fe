import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

const MyFooter = () => {
	return (
		<footer className="bg-secondary text-dark text-lg-start mt-3">
			<Container>
				<Row>
					<Button variant="warning">
						<Github link="/" />
					</Button>
				</Row>
			</Container>
		</footer>
	);
};

export default MyFooter;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
	Github,
	Linkedin,
	Twitter,
	House,
	Envelope,
	Telephone,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const MyFooter = () => {
	return (
		<footer className="bg-secondary-subtle text-dark text-lg-start mt-3">
			<Container className=" container-md d-flex justify-content-start">
				<Row className="pt-3 col-4 flex-nowrap">
					<Col>
						<h5 className="text-warning-emphasis fontnew fw-semibold">
							La nostra azienda
						</h5>
						<p>
							Con una carriera pluriennale nell'eccellenza del lusso, la nostra
							agenzia di viaggi è sinonimo di esperienze straordinarie. Dal
							curare itinerari esclusivi alle prenotazioni impeccabili, ci
							dedichiamo a offrire viaggi indimenticabili.
						</p>
					</Col>
				</Row>
				<Row className="pt-3 flex-end ms-auto">
					<Col className="">
						<h5 className="text-warning-emphasis fontnew fw-semibold">
							Contatti
						</h5>
						<ul>
							<li className="mb-3">
								<House />
								<span className="ms-2">L'Aquila, 67100, Italia</span>
							</li>
							<li className="mb-3">
								<Envelope />
								<span className="ms-2">contact@example.com</span>
							</li>
							<li className="mb-3">
								<Telephone />
								<span className="ms-2">+ 48 234 567 88</span>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
			<Container className=" container-md d-flex flex-nowrap justify-content-start ">
				<Row className="py-3 col-2 flex-nowrap">
					<Col>
						<Link
							to="https://www.linkedin.com/in/gabriele-d-onofrio-46494563/"
							target="blank"
						>
							<Linkedin color="black" />
						</Link>
					</Col>
					<Col>
						<Link
							to="https://github.com/stars/NasoAQ/lists/crown-prestigeadventures"
							target="blank"
						>
							<Github color="black" />
						</Link>
					</Col>
					<Col>
						<Twitter />
					</Col>
				</Row>
			</Container>
			<div className="bg-secondary text-center text-white p-3">
				© 2023 Copyright:
				<a className="text-warning p-2" href="/">
					PrestigeAdventures
				</a>
			</div>
		</footer>
	);
};

export default MyFooter;

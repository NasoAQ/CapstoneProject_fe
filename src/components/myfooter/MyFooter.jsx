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

const MyFooter = () => {
	return (
		<footer className="bg-dark-subtle text-dark text-lg-start mt-3">
			<Container className=" container-md d-flex justify-content-start">
				<Row className="pt-3 col-4 flex-nowrap">
					<Col>
						<h5>Our Company</h5>
						<p>
							At vero eos et accusamus et iusto odio dignissimos ducimus qui
							blanditiis praesentium voluptatum deleniti atque corrupti.
						</p>
					</Col>
				</Row>
				<Row className="pt-3 flex-end ms-auto">
					<Col className="">
						<h5>Our Contacts</h5>
						<ul>
							<li className="mb-3">
								<House />
								<span className="ms-2">Warsaw, 00-967, Poland</span>
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
			<Container className=" container-md d-flex flex-nowrap justify-content-start bg-">
				<Row className="py-3 col-2 flex-nowrap">
					<Col>
						<Linkedin />
					</Col>
					<Col>
						<Github />
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

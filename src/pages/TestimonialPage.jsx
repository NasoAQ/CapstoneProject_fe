import React from "react";
import MainLayouts from "../layouts/MainLayouts";
import { useParams } from "react-router-dom";
import TestimonialForm from "../components/testimonialform/TestimonialForm";
import { Alert, Container } from "react-bootstrap";
import Testimonial from "../components/testimonials/Testimonial";

const TestimonialPage = () => {
	const { id } = useParams();
	const token = localStorage.getItem("loggedInUser");
	const renderContent = () => {
		if (id && token) {
			return (
				<>
					<TestimonialForm />
					<Testimonial />
				</>
			);
		} else if (token) {
			return (
				<Container>
					<Alert variant="warning" className="text-center">
						Please select a travel to leave a testimonial.
					</Alert>
					<Testimonial />
				</Container>
			);
		} else {
			return (
				<Container>
					<Alert variant="info" className="text-center">
						Please login to leave a testimonial.
					</Alert>
					<Testimonial />
				</Container>
			);
		}
	};

	return <MainLayouts>{renderContent()}</MainLayouts>;
};

export default TestimonialPage;

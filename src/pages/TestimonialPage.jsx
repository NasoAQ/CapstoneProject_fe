import React, { useState } from "react";
import MainLayouts from "../layouts/MainLayouts";
import { useParams } from "react-router-dom";
import TestimonialForm from "../components/testimonialform/TestimonialForm";
import { Alert, Container } from "react-bootstrap";
import Testimonial from "../components/testimonials/Testimonial";

const TestimonialPage = () => {
	const { id } = useParams();
	const [updateTestimonials, setUpdateTestimonials] = useState(0);
	const token = localStorage.getItem("loggedInUser");

	const handleTestimonialUpdate = () => {
		setUpdateTestimonials(updateTestimonials + 1);
	};

	const renderContent = () => {
		if (id && token) {
			return (
				<>
					<TestimonialForm onTestimonialUpdate={handleTestimonialUpdate} />
					<Testimonial key={updateTestimonials} />
				</>
			);
		} else if (token) {
			return (
				<Container>
					<Alert variant="warning" className="text-center fontnew">
						Seleziona un <a href="/category"> viaggio</a> per lasciare una
						recensione.
					</Alert>
					<Testimonial key={updateTestimonials} />
				</Container>
			);
		} else {
			return (
				<Container>
					<Alert variant="info" className="text-center fontnew">
						Effettua il <a href="/login"> login</a> per lasciare una recensione.
					</Alert>
					<Testimonial key={updateTestimonials} />
				</Container>
			);
		}
	};

	return <MainLayouts>{renderContent()}</MainLayouts>;
};

export default TestimonialPage;

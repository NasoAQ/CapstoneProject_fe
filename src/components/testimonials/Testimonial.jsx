import React, { useState, useEffect } from "react";
import { Container, Carousel } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

const Testimonial = () => {
	const [testimonials, setTestimonials] = useState([]);

	const renderStars = valutation => {
		const stars = [];
		for (let i = 0; i < valutation; i++) {
			stars.push(<StarFill key={i} color="gold" />);
		}
		return stars;
	};

	const fetchTestimonials = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/testimonials`
			);
			const data = await response.json();

			const updatedTestimonials = await Promise.all(
				data.testimonials.map(async testimonial => {
					const userResponse = await fetch(
						`${process.env.REACT_APP_SERVER_BASE_URL}/users/${testimonial.user}`
					);
					const user = await userResponse.json();

					const travelResponse = await fetch(
						`${process.env.REACT_APP_SERVER_BASE_URL}/travels/${testimonial.travel}`
					);
					const travel = await travelResponse.json();

					return {
						...testimonial,
						username: user.newUser.username,
						travelTitle: travel.travel.title,
					};
				})
			);

			setTestimonials(updatedTestimonials);
		} catch (error) {
			console.error("Errore nella richiesta:", error);
		}
	};

	useEffect(() => {
		fetchTestimonials();
	}, []);

	return (
		<Container id="testimonials" className="my-5 fst-italic">
			<h2 className="text-center text-warning-emphasis">Testimonials</h2>

			<Carousel className="bg-primary bg-gradient bg-opacity-10">
				{testimonials.length === 0 ? (
					// Aggiungi una slide vuota
					<Carousel.Item>
						<Carousel.Caption className="text-black">
							<p>Nessun testimonial disponibile al momento.</p>
						</Carousel.Caption>
					</Carousel.Item>
				) : (
					testimonials.map(testimonial => (
						<Carousel.Item key={testimonial._id}>
							<img
								style={{ opacity: 0 }}
								width="100%"
								height={300}
								alt="900x500"
								src="https://img.freepik.com/premium-vector/abstract-blurred-gradient-mesh-tools-coffee-tea-color-red-orange-light-background_640644-408.jpg"
							/>
							<Carousel.Caption className="text-black">
								<h3>{testimonial.username}</h3>
								<p>{testimonial.travelTitle}</p>
								<h4>{testimonial.testimonial}</h4>
								<p>{renderStars(testimonial.valutation)}</p>
								<p>{testimonial.updatedAt}</p>
							</Carousel.Caption>
						</Carousel.Item>
					))
				)}
			</Carousel>
		</Container>
	);
};

export default Testimonial;

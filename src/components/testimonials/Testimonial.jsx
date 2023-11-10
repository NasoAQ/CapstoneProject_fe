import React, { useState, useEffect } from "react";
import { Container, Carousel } from "react-bootstrap";

const Testimonial = () => {
	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/testimonials`)
			.then(response => response.json())
			.then(data => {
				setTestimonials(data.testimonials);
			})
			.catch(error => {
				console.error("Errore nella richiesta:", error);
			});
	}, []);

	return (
		<Container id="testimonials" className="my-5 fst-italic">
			<h2 className="text-center text-warning-emphasis">Testimonials</h2>

			<Carousel className="bg-light bg-gradient">
				{testimonials.map(testimonial => (
					<Carousel.Item key={testimonial._id}>
						<img
							style={{ opacity: 0 }}
							width="100%"
							height={300}
							alt="900x500"
							src="https://img.freepik.com/premium-vector/abstract-blurred-gradient-mesh-tools-coffee-tea-color-red-orange-light-background_640644-408.jpg"
						/>
						<Carousel.Caption className="text-black">
							<h3>{testimonial._id}</h3>
							<p>{testimonial.testimonial}</p>
							<p>{testimonial.valutation}</p>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		</Container>
	);
};

export default Testimonial;

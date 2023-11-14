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

	const formatDate = timestamp => {
		const date = new Date(timestamp);
		const options = { year: "numeric", month: "long", day: "numeric" };
		return date.toLocaleDateString("en-US", options);
	};

	useEffect(() => {
		fetchTestimonials();
	}, []);

	return (
		<Container id="testimonials" className="my-5 fst-italic">
			<h2 className="text-center text-warning-emphasis">Testimonials</h2>

			<Carousel
				style={{
					backgroundImage: `url('https://www.traveldesign.it/upload/CONF52/20160817/ARUBA_BEACH_RELAX_-tSa-1200X476.jpg')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					opacity: 0.7,
				}}
				className=" bg-opacity-10"
			>
				{testimonials.length === 0 ? (
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
								<h4 className="text-warning-emphasis">
									{testimonial.travelTitle}
								</h4>
								<h5>{testimonial.username}</h5>
								<p>{testimonial.testimonial}</p>
								<p>{renderStars(testimonial.valutation)}</p>
								<p>
									<strong>{formatDate(testimonial.updatedAt)}</strong>
								</p>
							</Carousel.Caption>
						</Carousel.Item>
					))
				)}
			</Carousel>
		</Container>
	);
};

export default Testimonial;

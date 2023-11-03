import React from "react";
import { Container, Carousel } from "react-bootstrap";

const Testimonial = () => {
	return (
		<Container id="testimonials" className="my-5 fst-italic">
			<h2 className="text-center text-warning-emphasis">Testimonials</h2>
			<Carousel>
				<Carousel.Item>
					<img
						style={{ opacity: 0.5 }}
						width="100%"
						height={300}
						alt="900x500"
						src="https://img.freepik.com/premium-vector/abstract-blurred-gradient-mesh-tools-coffee-tea-color-red-orange-light-background_640644-408.jpg"
					/>
					<Carousel.Caption className="text-black">
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						style={{ opacity: 0.5 }}
						width="100%"
						height={300}
						alt="900x500"
						src="https://img.freepik.com/premium-vector/abstract-blurred-gradient-mesh-tools-coffee-tea-color-red-orange-light-background_640644-408.jpg"
					/>
					<Carousel.Caption className="text-black">
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						style={{ opacity: 0.5 }}
						width="100%"
						height={300}
						alt="900x500"
						src="https://img.freepik.com/premium-vector/abstract-blurred-gradient-mesh-tools-coffee-tea-color-red-orange-light-background_640644-408.jpg"
					/>
					<Carousel.Caption className="text-black">
						<h3>Third slide label</h3>
						<p>
							Praesent commodo cursus magna, vel scelerisque nisl consectetur.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</Container>
	);
};

export default Testimonial;

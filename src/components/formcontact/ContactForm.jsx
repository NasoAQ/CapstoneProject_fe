import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";

const ContactForm = () => {
	return (
		<Container
			id="contact"
			className="sm  py-1 bg-light border-bottom d-flex justify-content-center my-5 fst-italic"
		>
			<Row className="d-flex flex-column justify-content-center">
				{/* <div className="col-lg-7 col-md-12 bg-dark text-white rounded-lg p-5 position-relative">
					<iframe
						width="100%"
						height="100%"
						title="map"
						className="position-absolute inset-0"
						frameBorder={0}
						marginHeight={0}
						marginWidth={0}
						style={{ filter: "opacity(0.7)" }}
						src="https://www.google.com/maps/embed/v1/place?q=97+warren+st+new+york+city&key=YOUR_GOOGLE_MAPS_API_KEY"
					/>
					<div className="bg-dark relative flex flex-wrap py-4 rounded shadow-md">
						<div className="col-lg-6 col-md-12">
							<h2 className="title-font font-semibold text-white tracking-widest text-xs">
								ADDRESS
							</h2>
							<p className="mt-1">
								97 Warren St. <br />
								New York, NY 10007
							</p>
						</div>
						<div className="col-lg-6 col-md-12 mt-4 lg:mt-0">
							<h2 className="title-font font-semibold text-white tracking-widest text-xs">
								EMAIL
							</h2>
							<a
								href="mailto:reedbarger@email.com"
								className="text-indigo-400 leading-relaxed"
							>
								reedbarger@email.com
							</a>
							<h2 className="title-font font-semibold text-white tracking-widest text-xs mt-4">
								PHONE
							</h2>
							<p className="leading-relaxed">123-456-7890</p>
						</div>
					</div>
				</div> */}
				<Form
					netlify
					name="contact"
					/* onSubmit={handleSubmit} */
				>
					<h2 className="text-warning-emphasis">Contact us</h2>
					<p className="leading-relaxed mb-5">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
						suscipit officia aspernatur veritatis. Asperiores, aliquid?
					</p>
					<div className="mb-4">
						<label htmlFor="name" className="form-label text-gray-400">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="form-control"
							/* onChange={(e) => setName(e.target.value)} */
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="email" className="form-label text-gray-400">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="form-control"
							/* onChange={(e) => setEmail(e.target.value)} */
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="message" className="form-label text-gray-400">
							Message
						</label>
						<textarea
							id="message"
							name="message"
							className="form-control"
							rows="4"
							/* onChange={(e) => setMessage(e.target.value)} */
						/>
					</div>
					<Button type="submit" className="btn btn-primary">
						Submit
					</Button>
				</Form>
			</Row>
		</Container>
	);
};

export default ContactForm;

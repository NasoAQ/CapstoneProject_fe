import React, { useState, useEffect, useRef } from "react";
import { Container, Alert } from "react-bootstrap";
import { PencilSquare, Trash3Fill, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Loader from "../spinner/Loader";

const TestimonialTable = () => {
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const tableRef = useRef(null);

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
			setLoading(false);
		} catch (error) {
			console.error("Errore nella richiesta:", error);
			setLoading(false);
		}
	};

	const formatDate = timestamp => {
		const date = new Date(timestamp);
		const options = { year: "numeric", month: "long", day: "numeric" };
		return date.toLocaleDateString("en-US", options);
	};

	const handleDelete = async (testId, travelId) => {
		try {
			// Esegui la chiamata API per eliminare il testimonial
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/travels/${travelId}/testimonials/${testId}`,
				{
					method: "DELETE",
				}
			);

			if (response.status === 200) {
				setAlertMessage("Testimonial eliminato con successo!");
				setShowAlert(true);
				tableRef.current.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
				// Se l'eliminazione ha avuto successo, aggiorna lo stato
				const updatedTestimonials = testimonials.filter(
					testimonials => testimonials._id !== testId
				);
				setTestimonials(updatedTestimonials);
			} else {
				console.error("Errore durante l'eliminazione del testimonial");
			}
		} catch (error) {
			console.error("Errore durante la chiamata API:", error);
		}
	};

	useEffect(() => {
		fetchTestimonials();
	}, []);
	return (
		<Container className="sm my-3 py-1 bg-light border-bottom ">
			<p className="text-warning-emphasis fontnew">
				Sono presenti <span className="fw-semibold">{testimonials.length}</span>{" "}
				commenti
			</p>
			{loading ? (
				<Loader />
			) : (
				<>
					<Alert
						variant="success"
						show={showAlert}
						onClose={() => setShowAlert(false)}
						dismissible
					>
						{alertMessage}
					</Alert>

					<table ref={tableRef} className="table table-sm my-3">
						<thead>
							<tr>
								<th className="text-warning-emphasis" scope="col">
									#
								</th>
								<th className="text-warning-emphasis" scope="col">
									Viaggio
								</th>
								<th className="text-warning-emphasis" scope="col">
									Username
								</th>
								<th className="text-warning-emphasis" scope="col">
									Testimonianza
								</th>
								<th className="text-warning-emphasis" scope="col">
									Valutazione
								</th>
								<th className="text-warning-emphasis" scope="col">
									Data
								</th>

								<th className="text-warning-emphasis" scope="col">
									Cancella
								</th>
							</tr>
						</thead>
						<tbody>
							{testimonials.map((testimonial, index) => (
								<tr key={testimonial._id}>
									<th scope="row">{index + 1}</th>
									<td>{testimonial.travelTitle}</td>
									<td>{testimonial.username}</td>
									<td>{testimonial.testimonial}</td>
									<td>{renderStars(testimonial.valutation)}</td>
									<td>{formatDate(testimonial.updatedAt)}</td>

									<td>
										<button
											type="submit"
											className="btn btn-danger btn-sm"
											onClick={() =>
												handleDelete(testimonial._id, testimonial.travel)
											}
										>
											<Trash3Fill color="black" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</Container>
	);
};

export default TestimonialTable;

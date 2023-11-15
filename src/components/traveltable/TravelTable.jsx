import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const TravelTable = ({ travels, onDelete, onEdit }) => {
	/* const [travelList, setTravelList] = useState(travels);
	const totalTravels = travels.length; */

	const handleDelete = async id => {
		try {
			await onDelete(id);
		} catch (error) {
			console.error("Errore durante l'eliminazione del viaggio", error);
		}
	};

	const handleEdit = travel => {
		onEdit(travel);
	};

	return (
		<Container>
			<p className="text-warning-emphasis fontnew">
				Sono presenti <span className="fw-semibold">{travels.length}</span>{" "}
				viaggi in questa pagina
			</p>
			<table className="table table-sm my-3">
				<thead>
					<tr>
						<th className="text-warning-emphasis" scope="col">
							#
						</th>
						<th className="text-warning-emphasis" scope="col">
							Titolo
						</th>
						<th className="text-warning-emphasis" scope="col">
							Categoria
						</th>
						<th className="text-warning-emphasis" scope="col">
							Contenuto
						</th>
						<th className="text-warning-emphasis" scope="col">
							Prezzo
						</th>
						<th className="text-warning-emphasis" scope="col">
							Copertina
						</th>
						<th className="text-warning-emphasis" scope="col">
							Modifica
						</th>
						<th className="text-warning-emphasis" scope="col">
							Cancella
						</th>
					</tr>
				</thead>
				<tbody>
					{travels.map((travel, index) => (
						<tr key={travel._id}>
							<th scope="row">{index + 1}</th>
							<td>{travel.title}</td>
							<td>{travel.category}</td>
							<td>{travel.content}</td>
							<td>{travel.price} €</td>
							<td>
								{travel.cover && (
									<Link as={Link} to={`/details/${travel._id}`}>
										<img
											src={travel.cover}
											alt={`Cover for ${travel.title}`}
											style={{ maxWidth: "100px", maxHeight: "100px" }}
										/>
									</Link>
								)}
							</td>
							<td>
								<button
									type="submit"
									className="btn btn-warning btn-sm"
									onClick={() => handleEdit(travel)}
								>
									<PencilSquare />
								</button>
							</td>
							<td>
								<button
									type="submit"
									className="btn btn-danger btn-sm"
									onClick={() => handleDelete(travel._id)}
								>
									<Trash3Fill color="black" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
};

export default TravelTable;

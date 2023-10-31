import React, { useState } from "react";
import { PencilSquare, Trash3Fill } from "react-bootstrap-icons";

const TravelTable = ({ travels, onDelete, onEdit }) => {
	const [travelList, setTravelList] = useState(travels);
	const totalTravels = travels.length;

	const handleDelete = async id => {
		try {
			await onDelete(id);

			const updatedTravelList = travelList.filter(travel => travel._id !== id);
			setTravelList(updatedTravelList);
		} catch (error) {
			console.error("Errore durante l'eliminazione del viaggio", error);
		}
	};

	const handleEdit = travel => {
		onEdit(travel);
	};

	return (
		<div>
			<p>Sono presenti {totalTravels} viaggi</p>
			<table className="table my-3">
				<thead>
					<tr>
						<th className="text-warning-emphasis" scope="col">
							#
						</th>
						<th className="text-warning-emphasis" scope="col">
							Title
						</th>
						<th className="text-warning-emphasis" scope="col">
							Category
						</th>
						<th className="text-warning-emphasis" scope="col">
							Content
						</th>
						<th className="text-warning-emphasis" scope="col">
							Price
						</th>
						<th className="text-warning-emphasis" scope="col">
							Cover
						</th>
						<th className="text-warning-emphasis" scope="col">
							Edit
						</th>
						<th className="text-warning-emphasis" scope="col">
							Delete
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
									<img
										src={travel.cover}
										alt={`Cover for ${travel.title}`}
										style={{ maxWidth: "100px", maxHeight: "100px" }}
									/>
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
		</div>
	);
};

export default TravelTable;

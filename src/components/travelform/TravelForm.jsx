import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import TravelTable from "../traveltable/TravelTable";

const TravelForm = () => {
	const [file, setFile] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		category: "",
		price: "",
		content: "",
	});
	const [travels, setTravels] = useState([]);
	const [totalTravels, setTotalTravels] = useState(0);

	const onChangeSetFile = e => {
		console.log(e.target.files);
		setFile(e.target.files[0]);
	};

	const uploadFile = async cover => {
		const fileData = new FormData();
		fileData.append("cover", cover);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/travels/cloudUpload`,
				{
					method: "POST",
					body: fileData,
				}
			);
			return await response.json();
		} catch (error) {
			console.log(error, "Errore in upload file");
		}
	};

	const onSubmit = async e => {
		e.preventDefault();

		if (file) {
			try {
				const uploadCover = await uploadFile(file);
				console.log(uploadCover);
				const finalBody = {
					...formData,
					cover: uploadCover.cover,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/travels/create`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "POST",
						body: JSON.stringify(finalBody),
					}
				);
				setFormData({
					title: "",
					category: "",
					cover: "",
					price: "",
					content: "",
				});
				setFile(null);
				return response.json();
			} catch (error) {
				console.log(error);
			}
		} else {
			console.error("Seleziona un file");
		}
	};

	const handleDeleteTravel = async id => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_BASE_URL}/travels/delete/${id}`,
				{
					method: "DELETE",
				}
			);

			if (response.status === 200) {
				const updatedTravels = travels.filter(travel => travel._id !== id);
				setTravels(updatedTravels);
			} else {
				console.error("Errore durante l'eliminazione del viaggio");
			}
		} catch (error) {
			console.error("Errore durante l'eliminazione del viaggio", error);
		}
	};

	useEffect(() => {
		// Effettua la richiesta GET ai viaggi quando il componente si monta
		fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/travels`)
			.then(response => response.json())
			.then(data => {
				if (data.travels) {
					setTravels(data.travels);
					setTotalTravels(data.totalTravels);
				}
			})
			.catch(error => {
				console.error("Errore durante la richiesta GET", error);
			});
	}, [totalTravels]);

	return (
		<Container className="my-3 py-1 bg-light border-bottom">
			<Row>
				<h5 className="text-warning-emphasis">Gestione travels</h5>
			</Row>
			<Form onSubmit={onSubmit}>
				<Row encType="multipart/form-data">
					<Col>
						<input
							type="text"
							placeholder="Title"
							aria-label="Title"
							className="form-control form-control-sm"
							value={formData.title}
							onChange={e =>
								setFormData({
									...formData,
									title: e.target.value,
								})
							}
						/>
					</Col>
					<Col>
						<input
							type="text"
							placeholder="Category"
							aria-label="Category"
							className="form-control form-control-sm"
							value={formData.category}
							onChange={e =>
								setFormData({
									...formData,
									category: e.target.value,
								})
							}
						/>
					</Col>
					<Col>
						<input
							type="file"
							placeholder="Cover"
							aria-label="Cover"
							className="form-control form-control-sm"
							name="cover"
							onChange={onChangeSetFile}
						/>
					</Col>
					<Col>
						<input
							type="number"
							placeholder="price"
							aria-label="price"
							min={1}
							className="form-control form-control-sm"
							value={formData.price}
							onChange={e =>
								setFormData({
									...formData,
									price: e.target.value,
								})
							}
						/>
					</Col>
					<Row className="my-2">
						<Col>
							<input
								type="text"
								placeholder="Content"
								aria-label="Content"
								className="form-control form-control-sm"
								value={formData.content}
								onChange={e =>
									setFormData({
										...formData,
										content: e.target.value,
									})
								}
							/>
						</Col>
						<Col className="d-flex justify-content-end px-0">
							<button type="submit" className="btn btn-primary">
								<PlusCircleFill />
							</button>
						</Col>
					</Row>
				</Row>
			</Form>
			<TravelTable travels={travels} onDelete={handleDeleteTravel} />
		</Container>
	);
};

export default TravelForm;
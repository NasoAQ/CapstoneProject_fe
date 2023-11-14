import React, { useState, useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import {
	XCircleFill,
	PlusCircleFill,
	PencilSquare,
} from "react-bootstrap-icons";
import TravelTable from "../traveltable/TravelTable";

const TravelForm = () => {
	const [file, setFile] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		category: "",
		price: "",
		content: "",
		cover: "",
	});
	const [travels, setTravels] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [editingTravel, setEditingTravel] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [alertVariant, setAlertVariant] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	const onChangeSetFile = e => {
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

		if (editingTravel) {
			return;
		}

		if (file) {
			try {
				const uploadCover = await uploadFile(file);
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

				if (response.ok) {
					// Dopo aver creato con successo il nuovo viaggio,
					// esegui una nuova richiesta per ottenere l'elenco aggiornato dei viaggi
					const updatedResponse = await fetch(
						`${process.env.REACT_APP_SERVER_BASE_URL}/travels?page=${currentPage}`
					);

					if (updatedResponse.ok) {
						const updatedData = await updatedResponse.json();
						// Aggiorna lo stato travels con l'elenco aggiornato
						setTravels(updatedData.travels);
						setTotalPages(updatedData.totalPages);
						setAlertVariant("success");
						setAlertMessage("Travel created successfully!");
						setShowAlert(true);
					} else {
						console.error(
							"Errore durante la richiesta GET dopo la creazione del viaggio"
						);
						setAlertVariant("danger");
						setAlertMessage("Error creating travel. Please try again.");
						setShowAlert(true);
					}

					setFormData({
						title: "",
						category: "",
						cover: "",
						price: "",
						content: "",
					});
					setFile(null);
					return response.json();
				} else {
					console.error("Errore durante la creazione del viaggio");
					setAlertVariant("danger");
					setAlertMessage("Error creating travel. Please try again.");
					setShowAlert(true);
				}
			} catch (error) {
				console.log(error);
				setAlertVariant("danger");
				setAlertMessage("Error creating travel. Please try again.");
				setShowAlert(true);
			}
		} else {
			console.error("Seleziona un file");
			setAlertVariant("danger");
			setAlertMessage("Please select a file.");
			setShowAlert(true);
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
				setAlertVariant("success");
				setAlertMessage("Travel deleted successfully!");
				setShowAlert(true);
			} else {
				console.error("Errore durante l'eliminazione del viaggio");
				setAlertVariant("danger");
				setAlertMessage("Error deleting travel. Please try again.");
				setShowAlert(true);
			}
		} catch (error) {
			console.error("Errore durante l'eliminazione del viaggio", error);
			setAlertVariant("danger");
			setAlertMessage("Error deleting travel. Please try again.");
			setShowAlert(true);
		}
	};

	const handleEdit = async travel => {
		setEditingTravel(travel);
		setFormData({
			title: travel.title,
			category: travel.category,
			price: travel.price,
			content: travel.content,
		});
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (editingTravel) {
			try {
				const uploadCover = await uploadFile(file);
				const finalBody = {
					...formData,
					cover: uploadCover.cover,
				};
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_BASE_URL}/travels/update/${editingTravel._id}`,
					{
						headers: {
							"Content-Type": "application/json",
						},
						method: "PATCH",
						body: JSON.stringify(finalBody),
					}
				);

				if (response.status === 200) {
					// Aggiorna la lista dei viaggi dopo la modifica
					const updatedTravels = travels.map(travel =>
						travel._id === editingTravel._id
							? { ...travel, ...finalBody }
							: travel
					);
					setTravels(updatedTravels);

					// Resetta il form di modifica
					setEditingTravel(null);
					setFormData({
						title: "",
						category: "",
						price: "",
						content: "",
					});
				} else {
					console.error("Errore durante la modifica del viaggio");
				}
			} catch (error) {
				console.error("Errore durante la modifica del viaggio", error);
			}
		}
	};

	const handleCancelEdit = () => {
		setEditingTravel(null);
		setFormData({
			title: "",
			category: "",
			price: "",
			content: "",
			cover: "",
		});
	};

	const handlePagination = value => {
		setCurrentPage(value);
	};

	useEffect(() => {
		// Effettua la richiesta GET ai viaggi quando il componente si monta
		fetch(
			`${process.env.REACT_APP_SERVER_BASE_URL}/travels?page=${currentPage}`
		)
			.then(response => response.json())
			.then(data => {
				if (data.travels) {
					setTravels(data.travels);
					setTotalPages(data.totalPages);
				}
			})
			.catch(error => {
				console.error("Errore durante la richiesta GET", error);
			});
	}, [currentPage]);

	return (
		<>
			<Container
				id="gestione-travel"
				className="my-3 py-3 bg-light border-bottom"
			>
				<Alert
					variant={alertVariant}
					show={showAlert}
					onClose={() => setShowAlert(false)}
					dismissible
					className="mt-3"
				>
					{alertMessage}
				</Alert>
				<Row>
					<h5 className="text-warning-emphasis fontnew fw-semibold">
						Gestione travels
					</h5>
				</Row>
				<Form onSubmit={onSubmit}>
					<Row encType="multipart/form-data">
						<Col>
							<input
								type="text"
								placeholder="Title"
								aria-label="Title"
								className="form-control form-control-sm"
								value={formData.title || ""}
								onChange={e =>
									setFormData({
										...formData,
										title: e.target.value,
									})
								}
							/>
						</Col>
						<Col>
							<Form.Select
								aria-label="Category"
								value={formData.category || ""}
								onChange={e =>
									setFormData({
										...formData,
										category: e.target.value,
									})
								}
							>
								{" "}
								<option value="" disabled>
									Select a category
								</option>
								<option value="Glamping">Glamping</option>
								<option value="Yacht">Yacht</option>
								<option value="Relax">Relax</option>
								<option value="Sport">Sport</option>
							</Form.Select>
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
								value={formData.price || ""}
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
									value={formData.content || ""}
									onChange={e =>
										setFormData({
											...formData,
											content: e.target.value,
										})
									}
								/>
							</Col>
							<Col className="d-flex justify-content-end px-0">
								{editingTravel ? (
									<div>
										<button
											type="button"
											className="btn btn-secondary btn-sm mx-2"
											onClick={handleCancelEdit}
										>
											<XCircleFill />
										</button>
										<button
											type="submit"
											className="btn btn-warning btn-sm mr-2"
											onClick={handleEdit}
										>
											<PencilSquare />
										</button>
									</div>
								) : (
									<button type="submit" className="btn btn-primary btn-sm">
										<PlusCircleFill />
									</button>
								)}
							</Col>
						</Row>
					</Row>
				</Form>
				<TravelTable
					travels={travels}
					onDelete={handleDeleteTravel}
					onEdit={handleEdit}
				/>
				<ResponsivePagination
					current={currentPage}
					total={totalPages}
					onPageChange={handlePagination}
				/>
			</Container>
		</>
	);
};

export default TravelForm;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

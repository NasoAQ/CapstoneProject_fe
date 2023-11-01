import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Category from "./pages/Category";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/category/:categoryName" element={<Category />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import TestimonialPage from "./pages/TestimonialPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/category" element={<Category />} />
					<Route path="/category/:categoryName" element={<Category />} />
					<Route path="/testimonials" element={<TestimonialPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;

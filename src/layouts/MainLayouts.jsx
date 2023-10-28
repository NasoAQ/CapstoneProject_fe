import React from "react";
import MyNavbar from "../components/mynavbar/MyNavbar";
import MyFooter from "../components/myfooter/MyFooter";

const MainLayouts = ({ children }) => {
	return (
		<>
			<MyNavbar />
			{children}
			<MyFooter />
		</>
	);
};

export default MainLayouts;

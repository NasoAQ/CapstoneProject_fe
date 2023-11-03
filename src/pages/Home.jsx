import React from "react";
import MainLayouts from "../layouts/MainLayouts";
import Jumbotron from "../components/jumbotron/Jumbotron";
import LatestTravels from "../components/latestTravels/LatestTravels";
import Testimonial from "../components/testimonials/Testimonial";

const Home = () => {
	return (
		<MainLayouts>
			<Jumbotron />
			<LatestTravels />
			<Testimonial />
		</MainLayouts>
	);
};

export default Home;

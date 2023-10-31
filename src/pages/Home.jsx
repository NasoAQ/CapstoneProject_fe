import React from "react";
import MainLayouts from "../layouts/MainLayouts";
import Jumbotron from "../components/jumbotron/Jumbotron";
import LatestTravels from "../components/latestTravels/LatestTravels";

const Home = () => {
	return (
		<MainLayouts>
			<Jumbotron />
			<LatestTravels />
		</MainLayouts>
	);
};

export default Home;

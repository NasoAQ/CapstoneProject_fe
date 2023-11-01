import React from "react";
import MainLayouts from "../layouts/MainLayouts";
import Jumbotron from "../components/jumbotron/Jumbotron";
import LatestTravels from "../components/latestTravels/LatestTravels";
import CardCategory from "../components/cardcategory/CardCategory";

const Home = () => {
	return (
		<MainLayouts>
			<Jumbotron />
			<LatestTravels />
			<CardCategory />
		</MainLayouts>
	);
};

export default Home;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import small from "../Images/small.png";
import mobile from "../Images/mobiles.png";
import plastic from "../Images/plastic.png";
import metal from "../Images/metal.png";
import large from "../Images/large.png";
import books from "../Images/Books.webp";
import automobile from "../Images/automobiles.png";

const scrapItems = [
	{
		title: "Small Appliances",
		desc: "Includes electric kettles, toasters, blenders, etc.",
		img: small,
		path: "/Small",
	},
	{
		title: "Electronics",
		desc: "Old phones, laptops, and other devices.",
		img: mobile,
		path: "/Mobile",
	},
	{
		title: "Plastic",
		desc: "Includes plastic bottles, containers, and packaging materials.",
		img: plastic,
		path: "/Plastic",
	},
	{
		title: "Metal",
		desc: "Covers iron, aluminum, copper wires, and other metal scraps.",
		img: metal,
		path: "/Metal",
	},
	{
		title: "Large Appliances",
		desc: "Fridges, washing machines, air conditioners, and other bulky items.",
		img: large,
		path: "/Large",
	},
	{
		title: "Paper",
		desc: "Old books, magazines, and newspapers for recycling.",
		img: books,
		path: "/Paper",
	},
	{
		title: "Automobiles",
		desc: "Vehicle parts, car bodies, and automobile scrap materials.",
		img: automobile,
		path: "/Automobiles",
	},
];

const Scrap_Card = () => {
	const [query, setQuery] = useState("");

	// 🔍 Filtered list based on query
	const filteredItems = scrapItems.filter(item =>
		item.title.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-16 mx-auto">
				{/* Header and Search */}
				<div className="flex flex-col text-center w-full mb-10">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
						Search Prices
					</h1>
					<p className="lg:w-2/3 mx-auto text-base leading-relaxed text-gray-600">
						Search the price of any scrap item like small
						appliances, electronics, metals, etc.
					</p>
					<div className="mt-6 w-full sm:w-2/3 mx-auto">
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search for an item..."
							className="w-full px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition shadow-sm hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] transition-shadow duration-300"
						/>
					</div>
				</div>

				{/* Scrap Cards */}
				<div className="flex flex-wrap -m-4 justify-center">
					{filteredItems.length > 0 ? (
						filteredItems.map((item, index) => (
							<Link
								to={item.path}
								key={index}
								className="p-4 lg:w-1/3 md:w-1/2 w-full"
							>
								<div className="h-full bg-black bg-opacity-90 rounded-xl flex items-center p-5 hover:bg-opacity-80 transition">
									<img
										src={item.img}
										alt={item.title}
										className="w-16 h-16 mr-4"
									/>
									<div className="flex-grow">
										<h2 className="text-white title-font font-semibold text-lg">
											{item.title}
										</h2>
										<p className="text-gray-300 text-sm mt-1">
											{item.desc}
										</p>
									</div>
								</div>
							</Link>
						))
					) : (
						<p className="text-gray-500 text-lg mt-6">No matching items found.</p>
					)}
				</div>

				{/* Note Section */}
				<div className="flex-grow mt-10">
					<h2 className="text-black title-font font-semibold text-lg">
						The prices may vary with fluctuation in the scrap market.
					</h2>
					<p className="text-black text-sm mt-1">
						Prices may be different for bulk pickups. Call us at +91-8595358613 to get a quote for bulk pickup.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Scrap_Card;

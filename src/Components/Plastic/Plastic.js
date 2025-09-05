import React from "react";
import HardImage from "../Images/P/Hard.png";
import SoftImage from "../Images/P/Soft.png";

const metalItems = [
	{ name: "Hard Plastic", img: HardImage },
	{ name: "Soft Plastic", img: SoftImage },
];

const Plastic = () => {
	return (
		<section className="bg-white py-10 px-4 ">
			<div className="max-w-5xl mx-auto">
				{/* Heading */}
				<h1 className="text-white bg-black px-10 py-5 rounded-2xl text-4xl font-bold inline-block mt-6 mb-6">Plastics</h1>

				{/* Grid of metal items */}
				<div className="flex flex-wrap gap-4">
					{metalItems.map((item, index) => (
						<div key={index} className="w-[130px] bg-black rounded-xl p-2">
							<div className="bg-[#d7e7e5] rounded-xl p-2 flex flex-col items-center">
								<img
									alt={item.name}
									src={item.img}
									className="w-14 h-14 object-cover object-center mb-2"
								/>
								<p className="text-green-900 font-semibold text-sm">$16.00</p>
							</div>
							<div className="mt-2 text-center">
								<h2 className="text-blue-500 text-sm font-medium">
									{item.name}
								</h2>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Plastic;

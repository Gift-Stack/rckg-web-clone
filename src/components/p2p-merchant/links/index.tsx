import React from "react";
// import { YoutubeOutlined, More, Order } from "assets";
import { YoutubeOutlined, More, Order } from "../../../assets";

const P2PLinks = () => {
	return (
		<div
			className="flex justify-between mb-25 text-neutral-500 font-semibold"
			data-testid={"p2p-merchant-links"}
		>
			<div className="flex gap-6 text-sm-headline">
				<a href="#!">Express</a>
				<a href="#!">P2P</a>
				<a href="#!">Block</a>
			</div>
			<div className="flex gap-6 text-labels">
				<a href="#!" className="flex items-center gap-1.5">
					<YoutubeOutlined width={25} height={18} />
					Watch Tutorial
				</a>
				<a href="#!" className="flex items-center gap-1.5">
					<Order height={18} width={18} />
					Order
				</a>
				<a href="#!" className="flex items-center gap-1.5">
					<More height={18} width={18} />
					More
				</a>
			</div>
		</div>
	);
};

export default P2PLinks;

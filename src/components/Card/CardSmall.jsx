import React from "react";
// import { Image } from "react-bootstrap";
import { BsCircleHalf, BsInfoCircle } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import colorPalette from "../../utils/styles/colorPalette";
import { UserGroupIcon, BuildingOfficeIcon } from "@heroicons/react/24/solid";

export default function CardSmall(props) {
	return (
		<article className="flex justify-between py-2 items-center">
			<article className="flex flex-col space-y-2">
				<div className="flex space-x-2 items-center">
					<figure
						className="notes__topIcon"
						style={{ backgroundColor: colorPalette.GRAY }}
					>
						<BuildingOfficeIcon width={25} height={25} color="white" />
					</figure>
					<div>
						<h4 className="" style={{ color: colorPalette.PRIMARY_COLOR }}>
							{props.data.title}
						</h4>
					</div>
				</div>
				<div className="flex space-x-2 items-center mt-2">
					<figure className="flex space-x-1 bg-gray-light py-1 px-2 rounded-2xl">
						<UserGroupIcon
							width={25}
							height={25}
							style={{ color: colorPalette.PRIMARY_COLOR }}
						/>
						<p>{props.data.users}</p>
					</figure>
					<BsInfoCircle
						size={25}
						style={{ color: colorPalette.SECONDARY_COLOR, fontWeight: "500" }}
						className=""
					/>
				</div>
			</article>
			<FaAngleRight
				size={24}
				className="cursor-pointer"
				style={{ color: colorPalette.SECONDARY_COLOR }}
			/>
		</article>
	);
}

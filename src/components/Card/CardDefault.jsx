import {
	BuildingOfficeIcon,
	ClipboardDocumentIcon,
	UserGroupIcon,
} from "@heroicons/react/24/solid";
import React from "react";
// import { Image } from "react-bootstrap";
import { BsCircleHalf } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";
import colorPalette from "../../utils/styles/colorPalette";

export default function CardDefault(props) {
	return (
		<article className="flex flex-col space-y-2 py-1">
			<div className="flex space-x-2">
				<figure
					className="notes__topIcon"
					style={{ backgroundColor: colorPalette.GRAY }}
				>
					<ClipboardDocumentIcon width={25} height={25} color="white" />
				</figure>
				<div>
					<h4 style={{ color: colorPalette.PRIMARY_COLOR }}>
						{props.data.title}
					</h4>
					<p className="italic" style={{ color: colorPalette.GRAY_DARK }}>
						{props.type === "recentlyViewed" && "Last Viewed "}
						{props.type === "newStudies" && "Created on "}
						{props.data.lastViewed}
					</p>
				</div>
			</div>

			<p className="p-2">{props.data.description}</p>

			<div className="flex space-x-2">
				<figure className="flex space-x-1 bg-gray-light py-1 px-2 rounded-2xl">
					<UserGroupIcon
						width={25}
						height={25}
						style={{ color: colorPalette.PRIMARY_COLOR }}
					/>
					<p>{props.data.users}</p>
				</figure>
				{props.type === "recentlyViewed" && (
					<figure className="flex space-x-1 bg-gray-light py-1 px-2 rounded-2xl">
						<BsCircleHalf
							size={25}
							style={{ color: colorPalette.PRIMARY_COLOR }}
						/>
						<p>{props.data.status === "inprogress" && "In-Progress"}</p>
					</figure>
				)}
			</div>

			<div
				className="flex space-x-2 justify-between cursor-pointer font-medium mt-3"
				style={{ color: colorPalette.SECONDARY_COLOR }}
			>
				<p>View Details</p>
				<HiArrowRight />
			</div>
		</article>
	);
}

import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import samplePreview from "../../../../assets/images/samplePreview.png";

function PDFPreview(props) {
	const { title, pageNo, onEditClick, onDeleteClick, file } = props;

	return (
		<div className="flex flex-col items-center justify-center gap-1 text-secondary bg-white hover:border-secondary-dark mx-auto mb-6 border border-gray relative">
			{/* preview */}
			<img src={samplePreview} width={160} alt="Preview" />

			{/* buttons */}

			<button className="absolute bottom-2 text-white px-2 py-1 rounded-sm bg-[#6b6b6b]">
				{pageNo + 1}
			</button>

			<button className="absolute bottom-2 text-white px-2 py-1 rounded-sm bg-[#6b6b6b]">
				{pageNo + 1}
			</button>

			<button
				className="absolute -top-4 -right-3 rounded-full bg-[#ededed] h-6 w-6 flex items-center justify-center text-red-500"
				onClick={onDeleteClick}
			>
				<XMarkIcon height={16} width={16} />
			</button>

			<button
				className="absolute top-5 -right-3 rounded-full bg-[#ededed] h-6 w-6 flex items-center justify-center"
				onClick={onEditClick}
			>
				<PencilSquareIcon height={16} width={16} />
			</button>
		</div>
	);
}

export default PDFPreview;

import PropTypes from "prop-types";

PDFPreview.propTypes = {
	title: PropTypes.string,
	pageNo: PropTypes.number,
	onEditClick: PropTypes.func,
	onDeleteClick: PropTypes.func,
	file: PropTypes.any,
};

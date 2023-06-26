import { PlusIcon } from "@heroicons/react/24/solid";

function AddButtonLarge(props) {
	const { onClick } = props;

	return (
		<button
			className="flex items-center gap-1 text-secondary bg-white   hover:bg-secondary-dark hover:text-white mx-auto mb-6 border border-gray w-[159px] justify-center"
			onClick={onClick}
		>
			<PlusIcon height={60} width={60} />
		</button>
	);
}

export default AddButtonLarge;

import PropTypes from "prop-types";

AddButtonLarge.propTypes = {
	title: PropTypes.string,
	onClick: PropTypes.func,
};

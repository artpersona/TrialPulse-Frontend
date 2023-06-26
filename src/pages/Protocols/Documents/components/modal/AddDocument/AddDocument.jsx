import PropTypes from "prop-types";
import { useState } from "react";
import Modal from "src/components/Modal/Modal";
import samplePreview from "../../../../../../assets/images/samplePreview.png";

function AddDocument(props) {
	const { onOk, onCancel } = props;

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isRequired, setIsRequired] = useState(true);
	const [isDependent, setIsDependent] = useState(true);

	function handleSave() {
		onOk({
			name,
			description,
			isRequired,
			isDependent,
		});
	}

	return (
		<Modal>
			<div className="bg-white rounded-lg p-4">
				<main className="flex gap-4">
					{/* pdf view */}
					<figure className="border-2 border-gray">
						<img src={samplePreview} width={500} alt="Preview" />
					</figure>

					{/* pdf details */}
					<div className="criteria">
						<p>Document Title</p>
						<input value={name} onChange={(e) => setName(e.target.value)} />

						<p>Description</p>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>

						<div className="mt-8 mx-8 ">
							<p>Uploaded on: July 23, 2022</p>
							<p>Uploaded by: FirstName LastName</p>
							<p>File original name: documentTitle01.pdf</p>
							<p>File type: PDF</p>
							<p>File size: 375 KB</p>
							<p>Dimensions: 1920 by 768 pixels</p>
						</div>
					</div>
				</main>

				<footer className="modal__actions">
					<button className="modal-button bg-primary" onClick={handleSave}>
						Save
					</button>
					<button className="modal-button bg-gray-dark" onClick={onCancel}>
						Cancel
					</button>
				</footer>
			</div>
		</Modal>
	);
}

export default AddDocument;

AddDocument.propTypes = {
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

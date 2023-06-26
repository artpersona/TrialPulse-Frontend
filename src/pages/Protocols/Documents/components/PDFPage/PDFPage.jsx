import { useState } from "react";
import AddButtonLarge from "../../../../../components/AddButtonLarge/AddButtonLarge";
import { pdfData } from "./docDummyData";
import PDFPreview from "../../../../../components/Protocols/Documents/PDFPreview/PDFPreview";
import AddDocument from "../modal/AddDocument/AddDocument";

function PDFPage() {
	const [showPDFModal, setShowPDFModal] = useState(false);
	const [pdfArray, setPdfArray] = [pdfData];

	async function handleAddDocument(data) {
		console.log(data);
	}

	async function handleDeleteDocument(index) {
		const updatedArray = [...pdfArray];
		updatedArray.splice(index, 1);
		setPdfArray(updatedArray);
		console.log(updatedArray);
	}

	return (
		<div className="flex flex-wrap gap-5 justify-evenly mr-10">
			<AddButtonLarge onClick={() => setShowPDFModal(true)} />

			{pdfArray.map((item, index) => (
				<PDFPreview
					key={item.id}
					title={item.title}
					file={item.file}
					pageNo={index}
					onEditClick={() => setShowPDFModal(true)}
					onDeleteClick={() => handleDeleteDocument(index)}
				/>
			))}

			{showPDFModal ? (
				<AddDocument
					onOk={handleAddDocument}
					onCancel={() => setShowPDFModal(false)}
				/>
			) : null}
		</div>
	);
}

export default PDFPage;

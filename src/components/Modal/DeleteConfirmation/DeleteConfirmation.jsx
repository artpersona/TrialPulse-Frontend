import Modal from "../Modal";

function DeleteConfirmation(props) {
  const { title, onProceed, onCancel } = props;

  return (
    <Modal>
      <div className="w-[450px] bg-white rounded-md p-10 shadow-lg">
        <h3 className="text-2xl text-center pb-2 text-gray-700">{title}</h3>
        <p className="py-2 text-sm text-gray-600 text-center">
          Are you absolutely sure you want to delete this record? This action is
          irreversible and cannot be undone. Once you proceed, the record will
          be permanently removed from the system, along with any associated
          data.
        </p>

        <div className="flex flex-col gap-3 justify-center items-center pt-4">
          <button
            className="has-transition cursor-pointer text-sm bg-gray-cancel rounded-full py-3 shadow-md w-[300px] text-gray-700 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="has-transition cursor-pointer text-sm bg-primary text-white rounded-full py-3 shadow-md w-[300px] font-medium hover:bg-primary-dark"
            onClick={onProceed}
          >
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmation;

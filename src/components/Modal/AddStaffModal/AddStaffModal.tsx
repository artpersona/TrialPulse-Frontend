import React from "react";
import Modal from "../Modal";
import colorPalette from "../../../utils/styles/colorPalette";
import {
  ChatBubbleOvalLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

function AddStaffModal(props) {
  const { data, onCancel, onProceed } = props;

  return (
    <Modal>
      <div className="bg-white border-gray rounded-2xl w-[450px] p-6">
        <h4 className="modal__title">Add Staff</h4>
        <div>
          {data.map((data) => (
            <div
              className={`has-transition flex items-center border py-2 px-4 rounded-full gap-2 w-full mb-2 shadow-md `}
            >
              <img
                src="https://t4.ftcdn.net/jpg/02/99/97/35/360_F_299973520_rgAKO2BdhNhDArSSm7ikCT03qBCYcumJ.jpg"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <h4 className="text-primary text-sm font-medium flex-1 capitalize">
                  {data.firstName} {data.lastName}
                </h4>
                <p className="text-xs text-gray">{data.position}</p>
              </div>

              <div
                className="has-transition group p-1 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer hover:bg-secondary hover:scale-110"
                onClick={() => onProceed(data.userId)}
              >
                <CheckCircleIcon className="has-transition w-6 h-6 text-secondary group-hover:text-white" />
              </div>
            </div>
          ))}
        </div>
        <div className="modal__actions">
          <button
            className="has-transition cursor-pointer text-sm bg-gray-cancel rounded-full py-3 shadow-md w-[300px] text-gray-700 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddStaffModal;

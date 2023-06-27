import { useState } from "react";
import Modal from "../../Modal/Modal";
import useDebounce from "../../../hooks/useDebounce";
import {
  ClipboardDocumentIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useProtocolContext } from "../../../contexts/ProtocolContext";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";

function AddProtocol(props) {
  const { currentProtocols, handleAdd, onProceed } = props;

  const { protocols } = useProtocolContext();

  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce({ value: search, delay: 600 });

  const getCurrentProtocolsIds = () => currentProtocols.map((item) => item.id);

  const getProtocols = () => {
    if (search.length === 0) return [];
    const result = protocols.filter((item) =>
      item?.title.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    const currentProtocolsIds = getCurrentProtocolsIds();

    return result.filter((item) => !currentProtocolsIds.includes(item.id));
  };

  function handleClick(protocolId) {
    handleAdd(protocolId);
  }

  return (
    <Modal>
      <div className="bg-white border-gray rounded-2xl w-[450px] p-4">
        <h4 className="modal__title">Add Protocols</h4>

        <div className="border border-gray flex items-center py-2 px-4 rounded-full">
          <input
            type="text"
            className="outline-none border-none flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-4 w-4" />
        </div>

        <div className="py-2 flex flex-col space-y-2">
          {getProtocols().map((item) => (
            <div
              key={item.id}
              className="card p-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <AvatarContainer Icon={ClipboardDocumentIcon} />
                <h4 className="text-sm">{item.title}</h4>
              </div>
              <button
                className="flex items-center gap-1 bg-secondary text-white rounded-full py-1 px-3"
                onClick={() => handleClick(item.id)}
              >
                <PlusIcon className="w-4 h-4" /> Add
              </button>
            </div>
          ))}
        </div>
        <div className="modal__actions">
          <button className="modal-button bg-primary" onClick={onProceed}>
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProtocol;

import PropTypes from "prop-types";

AddProtocol.propTypes = {
  currentProtocols: PropTypes.array,
  handleAdd: PropTypes.func,
  onProceed: PropTypes.func,
};

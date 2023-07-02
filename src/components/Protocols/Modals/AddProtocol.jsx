import { useState } from "react";
import Modal from "../../Modal/Modal";
import useDebounce from "../../../hooks/useDebounce";
import {
  CheckCircleIcon,
  ClipboardDocumentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import AvatarContainer from "../../AvatarContainer/AvatarContainer";

function AddProtocol(props) {
  const { currentProtocols, handleAdd, onProceed } = props;

  const { api, protocols } = useGetProtocols({
    sort: "",
  });

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

  if (api.isLoading) {
    return <div>Loading..</div>;
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

        <div className="py-2 flex flex-col">
          {getProtocols().map((data) => (
            <div
              key={data.id}
              className={`has-transition flex items-center border py-2 px-4 rounded-full gap-2 w-full mb-2 shadow-md `}
            >
              <AvatarContainer Icon={ClipboardDocumentIcon} />

              <div className="flex-1">
                <h4 className="text-primary text-sm font-medium flex-1 capitalize">
                  {data.title}
                </h4>
                <p className="text-xs text-gray">{data.position}</p>
              </div>

              <div
                className="has-transition group p-1 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer hover:bg-secondary hover:scale-110"
                onClick={() => handleClick(data.id)}
              >
                <CheckCircleIcon className="has-transition w-6 h-6 text-secondary group-hover:text-white" />
              </div>
            </div>

            // <div
            //   key={item.id}
            //   className="card p-2 flex items-center justify-between"
            // >
            //   <div className="flex items-center gap-2">
            //     <AvatarContainer Icon={ClipboardDocumentIcon} />
            //     <h4 className="text-sm">{item.title}</h4>
            //   </div>
            //   <button
            //     className="flex items-center gap-1 bg-secondary text-white rounded-full py-1 px-3"
            //     onClick={() => handleClick(item.id)}
            //   >
            //     <PlusIcon className="w-4 h-4" /> Add
            //   </button>
            // </div>
          ))}
        </div>
        <div className="modal__actions">
          <button className="modal-cancel" onClick={onProceed}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddProtocol;

import PropTypes from "prop-types";
import useGetProtocols from "../../../api/protocols/useGetProtocols";

AddProtocol.propTypes = {
  currentProtocols: PropTypes.array,
  handleAdd: PropTypes.func,
  onProceed: PropTypes.func,
};

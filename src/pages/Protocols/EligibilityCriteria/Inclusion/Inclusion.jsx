import { useEffect, useState } from "react";
import Criteria from "src/components/Protocols/Criteria";
import { privateClient } from "../../../../api";
import { useProtocolContext } from "../../../../contexts/ProtocolContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import colorPalette from "src/utils/styles/colorPalette";
import AddCriteria from "../components/modal/AddCriteria/AddCriteria";
import FloatingPlusButton from "../../../../components/FloatingPlusButton/FloatingPlusButton";

function Inclusion() {
  const { getSelectedProtocol, addCriteria } = useProtocolContext();

  const protocolId = getSelectedProtocol().id;

  const [criterias, setCriterias] = useState([]);

  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);

  useEffect(() => {
    fetchCriterias();
  }, []);

  async function fetchCriterias() {
    try {
      const res = await privateClient({
        url: `protocols/${protocolId}/eligibility-criterias?page=1&isInclusion=true`,
        method: "get",
      });
      setCriterias(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddCriteria(data) {
    try {
      await addCriteria({
        ...data,
        isInclusion: true,
      });
      setShowAddCriteriaModal(false);
      fetchCriterias();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteCriteria(id) {
    try {
      await privateClient({
        url: `protocols/${protocolId}/eligibility-criterias/${id}`,
        method: "delete",
      });
      fetchCriterias();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {criterias.map((item) => (
        <Criteria key={item.id} data={item} onDelete={handleDeleteCriteria} />
      ))}

      <FloatingPlusButton handleClick={() => setShowAddCriteriaModal(true)} />

      {showAddCriteriaModal ? (
        <AddCriteria
          onOk={handleAddCriteria}
          onCancel={() => setShowAddCriteriaModal(false)}
        />
      ) : null}
    </div>
  );
}

export default Inclusion;

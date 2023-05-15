import { useEffect, useState } from "react";

import { privateClient } from "src/api";

import { useProtocolContext } from "src/contexts/ProtocolContext";

import AddButton from "src/components/AddButton/AddButton";
import Criteria from "src/components/Protocols/Criteria";
import AddCriteria from "../components/modal/AddCriteria/AddCriteria";

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
      <AddButton
        title="Add Criteria"
        onClick={() => setShowAddCriteriaModal(true)}
      />

      {criterias.map((item) => (
        <Criteria key={item.id} data={item} onDelete={handleDeleteCriteria} />
      ))}

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

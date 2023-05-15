import { useEffect, useState } from "react";
import Criteria from "src/components/Protocols/Criteria";
import { privateClient } from "src/api";
import { useProtocolContext } from "src/contexts/ProtocolContext";
import AddCriteria from "../components/modal/AddCriteria/AddCriteria";
import AddButton from "src/components/AddButton/AddButton";

function Exclusion() {
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
        url: `protocols/${protocolId}/eligibility-criterias?page=1&isInclusion=false`,
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
        isInclusion: false,
      });
      setShowAddCriteriaModal(false);
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
        <Criteria key={item.id} data={item} />
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

export default Exclusion;

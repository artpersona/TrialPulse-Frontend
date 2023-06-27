import { useState } from "react";
import { useParams } from "react-router-dom";

import useGetCriterias from "src/api/protocols/eligibility-criteria/useGetCriterias";
import useCreateCriteria from "src/api/protocols/eligibility-criteria/useCreateCriteria";
import useDeleteCriteria from "src/api/protocols/eligibility-criteria/useDeleteCriteria";

import AddButton from "src/components/AddButton/AddButton";
import Criteria from "src/components/Protocols/Criteria";
import AddCriteria from "../components/modal/AddCriteria/AddCriteria";

function Inclusion() {
  const { protocolId } = useParams();

  const { mutate } = useCreateCriteria({
    resetForm: () => setShowAddCriteriaModal(false),
    id: protocolId,
  });

  const { mutate: deleteCriteria } = useDeleteCriteria({
    resetForm: () => setShowAddCriteriaModal(false),
    id: protocolId,
  });

  const { api, criterias } = useGetCriterias({
    protocolId,
    isInclusion: true,
  });

  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);

  async function handleAddCriteria(data) {
    mutate({
      ...data,
      isInclusion: true,
    });
  }

  async function handleDeleteCriteria(id) {
    deleteCriteria({
      protocolId,
      criteriaId: id,
    });
  }

  if (api.isLoading) {
    return <div>Loading..</div>;
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

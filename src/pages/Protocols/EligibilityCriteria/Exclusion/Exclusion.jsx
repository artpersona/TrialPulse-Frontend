import { useState } from "react";
import { useParams } from "react-router-dom";

import useCreateCriteria from "src/api/protocols/eligibility-criteria/useCreateCriteria";
import useDeleteCriteria from "src/api/protocols/eligibility-criteria/useDeleteCriteria";
import useGetCriterias from "src/api/protocols/eligibility-criteria/useGetCriterias";

import Criteria from "src/components/Protocols/Criteria";
import AddButton from "src/components/AddButton/AddButton";
import AddCriteria from "../components/modal/AddCriteria/AddCriteria";
import DeleteConfirmation from "../../../../components/Modal/DeleteConfirmation/DeleteConfirmation";

function Exclusion() {
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
    isInclusion: false,
  });

  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
  const [showDeleteCriteriaModal, setShowDeleteCriteriaModal] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState(null);

  async function handleAddCriteria(data) {
    mutate({
      ...data,
      isInclusion: false,
    });
  }

  async function handleDeleteCriteria(id) {
    setShowDeleteCriteriaModal(true);
    setSelectedCriteria(id);
  }

  async function handleDelete() {
    deleteCriteria({
      protocolId,
      criteriaId: selectedCriteria,
    });
    setShowDeleteCriteriaModal(false);
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

      {showDeleteCriteriaModal ? (
        <DeleteConfirmation
          title="Remove Criteria?"
          onProceed={handleDelete}
          onCancel={() => setShowDeleteCriteriaModal(false)}
        />
      ) : null}
    </div>
  );
}

export default Exclusion;

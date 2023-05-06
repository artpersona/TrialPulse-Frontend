import GeneralInfoComponent from "src/components/Protocols/GeneralInfo";
import StudyDetails from "src/components/Protocols/StudyDetails";
import { useProtocolContext } from "src/contexts/ProtocolContext";

function GeneralInfo() {
  const { getSelectedProtocol } = useProtocolContext();
  return (
    <div>
      <GeneralInfoComponent data={getSelectedProtocol()} />
      <StudyDetails data={getSelectedProtocol()} />
    </div>
  );
}

export default GeneralInfo;

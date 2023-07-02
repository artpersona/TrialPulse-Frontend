import { useRef, useState } from "react";
// import Drug from "src/assets/images/svgs/Drug.svg";
// import Iv from "src/assets/images/svgs/Iv.svg";
// import Bandage from "src/assets/images/svgs/Bandage.svg";
// import Needle from "src/assets/images/svgs/Needle.svg";
// import Surgery from "src/assets/images/svgs/Surgery.svg";
// import Respirator from "src/assets/images/svgs/Respirator.svg";

import { hasBlank } from "src/utils";
import colorPalette from "src/utils/styles/colorPalette";

import useGetSponsors from "src/api/sponsors/useGetSponsors";
import useCreateProtocol from "src/api/protocols/useCreateProtocol";

import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import { drugRoutes } from "src/shared/constants";

import "./AddProtocol.styles.css";
import FormRow from "../../../components/Form/FormRow";
import FormCol from "../../../components/Form/FormCol";
import FormInput from "../../../components/Form/FormInput";
import FormSelect from "../../../components/Form/FormSelect";
import FormTextArea from "../../../components/Form/FormTextArea";
import useZodForm from "../../../hooks/useZodForm";
import protocolSchema from "../../../schema/protocolSchema";

// const drugRoutes = [
//   {
//     id: "drug",
//     icon: Drug,
//     label: "Oral",
//   },
//   {
//     id: "iv",
//     icon: Iv,
//     label: "Iv",
//   },
//   {
//     id: "Bandage",
//     icon: Bandage,
//     label: "Bandage",
//   },
//   {
//     id: "Needle",
//     icon: Needle,
//     label: "Needle",
//   },
//   {
//     id: "Surgery",
//     icon: Surgery,
//     label: "Surgery",
//   },
//   {
//     id: "Respirator",
//     icon: Respirator,
//     label: "Respirator",
//   },
// ];

const activeOnApp = [
  {
    id: "Active",
    name: "Active",
  },
  {
    id: "Inactive",
    name: "Inactive",
  },
];

const phases = [
  {
    id: "Phase 1",
    name: "Phase 1",
  },
  {
    id: "Phase 2",
    name: "Phase 2",
  },
  {
    id: "Phase 3",
    name: "Phase 3",
  },
  {
    id: "Phase 4",
    name: "Phase 4",
  },
];

const timeframes = [
  {
    id: "Days",
    name: "Days",
  },
  {
    id: "Weeks",
    name: "Weeks",
  },
];

const booleans = [
  {
    id: "Yes",
    name: "Yes",
  },
  {
    id: "No",
    name: "No",
  },
];

const populations = [
  {
    id: "18",
    name: "Mov-Sev CD",
  },
];
const bionaives = [
  {
    id: "50",
    name: "50",
  },
  {
    id: "100",
    name: "100",
  },
];

function AddProtocol() {
  const [title, setTitle] = useState("");
  const [eligibilityOverview, setEligibilityOverview] = useState("");
  const [sponsorId, setSponsorId] = useState("");
  const [studyNumber, setStudyNumber] = useState("");
  const [studyInfo, setStudyInfo] = useState("");
  const [phase, setPhase] = useState("Phase 1");
  const [drugRoute, setDrugRoute] = useState("");
  const [drugTarget, setDrugTarget] = useState("Active");
  const [drugTreatmentPeriodNumber, setDrugTreatmentPeriodNumber] =
    useState("");
  const [drugTreatmentPeriodDays, setDrugTreatmentPeriodDays] =
    useState("Days");
  const [placebo, setPlacebo] = useState("Yes");
  const [lte, setLte] = useState("");
  const [lteDurationType, setLteDurationType] = useState("Days");
  const [population, setPopulation] = useState("18");
  const [bioNaive, setBioNaive] = useState("Yes");
  const [bioIr, setBioIr] = useState("50");

  const { mutate } = useCreateProtocol({
    resetForm: () => resetState(),
  });

  const isDisabled = () =>
    hasBlank([
      title,
      eligibilityOverview,
      sponsorId,
      studyNumber,
      studyInfo,
      phase,
      drugRoute,
      drugTarget,
      drugTreatmentPeriodNumber,
      drugTreatmentPeriodNumber,
      placebo,
      lte,
      lteDurationType,
      population,
      bioNaive,
      bioIr,
    ]);
  const { sponsors, api } = useGetSponsors({ sort: "" });

  async function addProtocol() {
    mutate({
      sponsorId,
      title,
      eligibilityOverview,
      studyNumber,
      studyInfo,
      phase,
      drugRoute,
      drugTarget,
      drugTreatmentPeriod: `${drugTreatmentPeriodNumber} ${drugTreatmentPeriodDays}`,
      placebo,
      lte,
      lteDurationType,
      population,
      bioNaive,
      bioIr,
    });
  }

  function resetState() {
    setSponsorId("");
    setTitle("");
    setEligibilityOverview("");
    setStudyNumber("");
    setStudyInfo("");
    setPhase("Phase 1");
    setDrugRoute("");
    setDrugTarget("Active");
    setDrugTreatmentPeriodNumber("");
    setDrugTreatmentPeriodDays("");
    setPlacebo("Yes");
    setLte("");
    setLteDurationType("Days");
    setPopulation("18");
    setBioNaive("Yes");
    setBioIr("50");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(protocolSchema);

  const formRef = useRef(null);
  const submitData = (data) => {
    console.log(data);

    mutate({
      ...data,
      sponsorId: parseInt(data.sponsorId),
      lte: parseInt(data.lte),
      population: parseInt(data.population),
      bioIr: parseInt(data.bioIr),
    });
    if (formRef) {
      formRef.current.reset();
    }
  };

  console.log(errors);

  if (api.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="pb-10">
      <BlackNavbar></BlackNavbar>
      {/* GENERAL INFO */}

      <form ref={formRef} onSubmit={handleSubmit(submitData)}>
        <div className="generalInfo">
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            General Info
          </h2>

          <div className="generalInfo__section">
            <FormRow>
              <FormCol label="Study Name">
                <FormInput {...register("title")} />
              </FormCol>
            </FormRow>
            <FormRow>
              <FormCol label="Sponsor">
                <FormSelect options={sponsors} {...register("sponsorId")} />
              </FormCol>
            </FormRow>
            {/* <p>Study Name</p>
          <input value={title} onChange={(e) => setTitle(e.target.value)} /> */}
            {/* <p>Sponsor</p>
          <select
            value={sponsorId}
            onChange={(e) => setSponsorId(e.target.value)}
          >
            <option value="">Select Sponsor</option>
            {sponsors?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select> */}
          </div>

          <div
            style={{
              width: "100%",
              height: 1,
              background: "gray",
              margin: "20px 0",
            }}
          />

          <div className="generalInfo__section">
            <FormRow>
              <FormCol label="Eligibility Overview">
                <FormTextArea {...register("eligibilityOverview")} />
              </FormCol>
            </FormRow>
            {/* <p>Eligibility Overview</p>
          <textarea
            value={eligibilityOverview}
            onChange={(e) => setEligibilityOverview(e.target.value)}
          /> */}
          </div>

          <div
            style={{
              width: "100%",
              height: 1,
              background: "gray",
              margin: "20px 0",
            }}
          />

          <div className="generalInfo__section">
            <FormRow>
              <FormCol label="Active on App">
                <FormSelect options={activeOnApp} />
              </FormCol>
            </FormRow>
            {/* <p>Active on App</p>
          <select>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select> */}
          </div>
        </div>

        {/* STUDY DETAILS */}
        <div className="studyDetails">
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            Study Details
          </h2>

          <FormRow>
            <FormCol label="Study Number">
              <FormInput {...register("studyNumber")} />
            </FormCol>
          </FormRow>
          {/* <p>Study Number</p>
        <input
          value={studyNumber}
          onChange={(e) => setStudyNumber(e.target.value)}
        /> */}

          <FormRow>
            <FormCol label="Study Details Info">
              <FormTextArea {...register("studyInfo")} />
            </FormCol>
          </FormRow>

          {/* <p>Study Details Info</p>
        <textarea
          value={studyInfo}
          onChange={(e) => setStudyInfo(e.target.value)}
        /> */}

          <FormRow>
            <FormCol label="Phase">
              <FormSelect options={phases} {...register("phase")} />
            </FormCol>
          </FormRow>
          {/* <p>Phase</p>
        <select value={phase} onChange={(e) => setPhase(e.target.value)}>
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
          <option value="Phase 3">Phase 3</option>
          <option value="Phase 4">Phase 4</option>
        </select> */}

          <FormRow>
            <FormCol label="Drug Route">
              <FormSelect
                options={drugRoutes.map((item) => ({ id: item, name: item }))}
                {...register("drugRoute")}
              />
            </FormCol>
          </FormRow>

          {/* <p>Drug Route</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <select
            value={drugRoute}
            onChange={(e) => setDrugRoute(e.target.value)}
          >
            <option value="">Select Drug Route </option>

            {drugRoutes.map((drug) => (
              <option key={drug} value={drug}>
                {drug}
              </option>
            ))}
          </select> */}
          {/* {drugRoutes.map((drug) => (
            <div
              key={drug}
              style={{
                width: 60,
                height: 35,
                border: "1px solid black",
                display: "grid",
                placeItems: "center",
                borderRadius: 5,
                backgroundColor:
                drug === drugRoute
                    ? colorPalette.SECONDARY_COLOR
                    : "#FFFFFF",
              }}
              onClick={() => setDrugRoute(drug)}
            >
              <img src={icon} />
            </div>
          ))} */}
          {/* </div> */}

          <FormRow>
            <FormCol label="Drug Target">
              <FormSelect options={activeOnApp} {...register("drugTarget")} />
            </FormCol>
          </FormRow>
          {/* <p>Drug Target</p>
        <select
          value={drugTarget}
          onChange={(e) => setDrugTarget(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select> */}

          <FormRow>
            <FormCol label="Drug Treatment Period">
              <FormInput {...register("drugTreatmentPeriod")} />
            </FormCol>

            <FormCol label=" ">
              <FormSelect
                options={timeframes}
                {...register("drugTreatmentPeriodType")}
              />
            </FormCol>
          </FormRow>
          {/* <p>Drug Treatment Period</p>
        <div style={{ display: "flex", gap: 20 }}>
          <input
            value={drugTreatmentPeriodNumber}
            onChange={(e) => setDrugTreatmentPeriodNumber(e.target.value)}
          />
          <select
            value={drugTreatmentPeriodDays}
            onChange={(e) => setDrugTreatmentPeriodDays(e.target.value)}
          >
            <option value="Days">Days</option>
            <option value="Weeks">Weeks</option>
          </select>
        </div> */}

          <FormRow>
            <FormCol label="Placebo">
              <FormSelect options={booleans} {...register("placebo")} />
            </FormCol>
          </FormRow>
          {/* <p>Placebo</p>
        <select value={placebo} onChange={(e) => setPlacebo(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select> */}

          <FormRow>
            <FormCol label="LTE">
              <FormInput {...register("lte")} />
            </FormCol>

            <FormCol label=" ">
              <FormSelect
                options={timeframes}
                {...register("lteDurationType")}
              />
            </FormCol>
          </FormRow>
          {/* <p>LTE</p>
        <div style={{ display: "flex", gap: 20 }}>
          <input value={lte} onChange={(e) => setLte(e.target.value)} />

          <select
            value={lteDurationType}
            onChange={(e) => setLteDurationType(e.target.value)}
          >
            <option value="Days">Days</option>
            <option value="Weeks">Weeks</option>
          </select>
        </div> */}

          <FormRow>
            <FormCol label="Population">
              <FormSelect options={populations} {...register("population")} />
            </FormCol>
          </FormRow>
          {/* <p>Population</p>
        <select
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
        >
          <option value="18">Mov-Sev CD</option>
        </select> */}

          <FormRow>
            <FormCol label="Bio-naive">
              <FormSelect options={booleans} {...register("bioNaive")} />
            </FormCol>
          </FormRow>
          {/* <p>Bio-naive</p>
        <select value={bioNaive} onChange={(e) => setBioNaive(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select> */}

          <FormRow>
            <FormCol label="Bio-IR (min%)">
              <FormSelect options={bionaives} {...register("bioIr")} />
            </FormCol>
          </FormRow>
          {/* <p>Bio-IR (min%)</p>
        <select value={bioIr} onChange={(e) => setBioIr(e.target.value)}>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> */}
        </div>

        <div className="sticky bottom-4 left-0 w-full flex items-center justify-center mt-4">
          <button
            type="submit"
            className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
            // style={{ backgroundColor: colorPalette.SECONDARY_COLOR }}
            // disabled={isDisabled()}
            // onClick={addProtocol}
          >
            Add Protocol
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProtocol;

import { useRef } from "react";

import useZodForm from "src/hooks/useZodForm";

import useGetSponsors from "src/api/sponsors/useGetSponsors";
import useCreateProtocol from "src/api/protocols/useCreateProtocol";

import FormRow from "src/components/Form/FormRow";
import FormCol from "src/components/Form/FormCol";
import FormInput from "src/components/Form/FormInput";
import FormSelect from "src/components/Form/FormSelect";
import FormTextArea from "src/components/Form/FormTextArea";
import BlackNavbar from "src/components/Protocols/BlackNavbar/BlackNavbar";

import protocolSchema from "src/schema/protocolSchema";

import { drugRoutes } from "src/shared/constants";

import "./AddProtocol.styles.css";

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
  const { mutate } = useCreateProtocol({
    resetForm: () => null,
  });

  const { sponsors, api } = useGetSponsors({ sort: "" });

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
      drugTreatmentPeriod: `${data.drugTreatmentPeriod} ${data.drugTreatmentPeriodType}`,
    });
    if (formRef) {
      formRef.current.reset();
    }
  };

  // console.log(errors);
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
              <FormCol label="Study Name" error={errors.title}>
                <FormInput {...register("title")} />
              </FormCol>
            </FormRow>
            <FormRow>
              <FormCol label="Sponsor" error={errors.sponsorId}>
                <FormSelect options={sponsors} {...register("sponsorId")} />
              </FormCol>
            </FormRow>
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
              <FormCol
                label="Eligibility Overview"
                error={errors.eligibilityOverview}
              >
                <FormTextArea {...register("eligibilityOverview")} />
              </FormCol>
            </FormRow>
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
          </div>
        </div>

        {/* STUDY DETAILS */}
        <div className="studyDetails">
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            Study Details
          </h2>

          <FormRow>
            <FormCol label="Study Number" error={errors.studyNumber}>
              <FormInput {...register("studyNumber")} />
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol label="Study Details Info" error={errors.studyInfo}>
              <FormTextArea {...register("studyInfo")} />
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol label="Phase" error={errors.phase}>
              <FormSelect options={phases} {...register("phase")} />
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol label="Drug Route" error={errors.drugRoute}>
              <FormSelect
                options={drugRoutes.map((item) => ({ id: item, name: item }))}
                {...register("drugRoute")}
              />
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol label="Drug Target" error={errors.drugTarget}>
              <FormSelect options={activeOnApp} {...register("drugTarget")} />
            </FormCol>
          </FormRow>

          <p className="text-sm ml-2 mt-2 -mb-1">Drug Treatment Period</p>

          <FormRow>
            <FormCol label="" error={errors.drugTreatmentPeriod}>
              <FormInput {...register("drugTreatmentPeriod")} />
            </FormCol>

            <FormCol label=" " error={errors.drugTreatmentPeriodType}>
              <FormSelect
                options={timeframes}
                {...register("drugTreatmentPeriodType")}
              />
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol label="Placebo" error={errors.placebo}>
              <FormSelect options={booleans} {...register("placebo")} />
            </FormCol>
          </FormRow>

          <p className="text-sm ml-2 mt-2 -mb-1">LTE</p>

          <FormRow>
            <FormCol label="" error={errors.lte}>
              <FormInput {...register("lte")} />
            </FormCol>

            <FormCol label=" " error={errors.lteDurationType}>
              <FormSelect
                options={timeframes}
                {...register("lteDurationType")}
              />
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol label="Population" error={errors.population}>
              <FormSelect options={populations} {...register("population")} />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol label="Bio-naive" error={errors.bioNaive}>
              <FormSelect options={booleans} {...register("bioNaive")} />
            </FormCol>
          </FormRow>

          <FormRow>
            <FormCol label="Bio-IR (min%)" error={errors.bioIr}>
              <FormSelect options={bionaives} {...register("bioIr")} />
            </FormCol>
          </FormRow>
        </div>

        <div className="sticky bottom-4 left-0 w-full flex items-center justify-center mt-4">
          <button
            type="submit"
            className="button w-64 bg-secondary text-white font-sm py-3 rounded-full hover:bg-secondary-dark"
          >
            Add Protocol
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProtocol;

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

import protocolSchema from "src/schema/protocolSchemaSponsor";

import { drugRoutes, activeOnApp, phases, timeframes, booleans, populations, bionaives } from "src/shared/constants";

import "./AddProtocol.styles.css";
import { useAuthContext } from "../../../contexts/AuthContext";

function AddProtocol() {
  const { userDetails } = useAuthContext();
  const { mutate } = useCreateProtocol({
    resetForm: () => null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(protocolSchema);

  const formRef = useRef(null);
  const submitData = (data) => {

    mutate({
      ...data,
      sponsorId: userDetails.sponsorId,
      lte: parseInt(data.lte),
      population: parseInt(data.population),
      bioIr: parseInt(data.bioIr),
      drugTreatmentPeriod: `${data.drugTreatmentPeriod} ${data.drugTreatmentPeriodType}`,
    });
    if (formRef) {
      formRef.current.reset();
    }
  };

  return (
    <div className="pb-10 relative">
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

          <FormRow>
            <FormCol
              label="Drug Treatment Period"
              error={errors.drugTreatmentPeriod}
            >
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

          <FormRow>
            <FormCol label="LTE" error={errors.lte}>
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

        <div className="absolute -left-80 top-5 w-full flex items-center">
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

import { z as zfd } from "zod";

export default zfd
  .object({
    title: zfd.string().nonempty("Required"),
    eligibilityOverview: zfd.string().nonempty("Required"),
    studyNumber: zfd.string(),
    studyInfo: zfd.string().nonempty("Required"),
    phase: zfd.string(),
    drugRoute: zfd.string(),
    drugTarget: zfd.string(),
    drugTreatmentPeriod: zfd.string(),
    drugTreatmentPeriodType: zfd.string().nonempty("Required"),
    placebo: zfd.string(),
    lte: zfd.string(),
    lteDurationType: zfd.string().nonempty("Required"),
    population: zfd.string(),
    bioNaive: zfd.string(),
    bioIr: zfd.string(),
  })
  .required();

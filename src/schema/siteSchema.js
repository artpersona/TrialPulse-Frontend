import { z } from "zod";

export default z.object({
  name: z.string(),
  contactEmail: z.string().refine((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }, "Invalid email address"),
});

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useZodForm = (schema) => useForm({ resolver: zodResolver(schema) });

export default useZodForm;

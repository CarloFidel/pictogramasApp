import { z } from "zod";

export const PromptSchema = z.object({
  action: z
    .string({ message: "Ingresa una acción válida" })
    .min(2, { message: "La acción tiene que tener más de dos letras" })
    .max(20, { message: "La acción tiene que tener menos de 20 letras" }),
});

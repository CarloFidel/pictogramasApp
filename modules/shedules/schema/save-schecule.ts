import { z } from "zod";

export const SaveScheduleSchema = z.object({
  title: z
    .string({ message: "Ingresa un título válido" })
    .min(2, { message: "El título tiene que tener más de dos letras" })
    .max(50, { message: "El título tiene que tener menos de 50 letras" }),
});

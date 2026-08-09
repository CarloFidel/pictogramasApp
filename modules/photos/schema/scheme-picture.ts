import { z } from "zod";

export const SavePhotoSchema = z.object({
  word: z
    .string({ message: "Ingresa una palabra válida" })
    .min(2, { message: "la palabra tiene que tener más de una letras" })
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, {
      message: "La palabra solo puede contener letras",
    }),
});

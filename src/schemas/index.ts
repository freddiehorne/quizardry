import { z } from "zod";

export const newQuizSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" })
    .max(50),
  type: z.enum(["multipleChoice", "openEnded"]),
  amount: z
    .number()
    .int()
    .positive()
    .min(1, { message: "Must be at least 1 question" })
    .max(10, { message: "Maximum of 10 questions" }),
});

import { z } from "zod";

export const GradeSchema = {
  create: z.object({
    articleId: z.string().min(1, "شناسه نوشته الزامی است"),
    score: z
      .number()
      .min(0, "نمره نمی‌تواند کمتر از ۰ باشد")
      .max(20, "نمره نمی‌تواند بیشتر از ۲۰ باشد"),
    comment: z
      .string()
      .max(500, "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد")
      .optional(),
  }),
};

export type CreateGradeInput = z.infer<typeof GradeSchema.create>;

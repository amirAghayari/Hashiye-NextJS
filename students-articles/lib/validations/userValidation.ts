import { z } from "zod";

export const UserSchema = {
  register: z.object({
    fullName: z
      .string()
      .min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد")
      .max(100, "نام و نام خانوادگی نباید بیشتر از ۱۰۰ کاراکتر باشد"),
    email: z.string().email("لطفاً یک ایمیل معتبر وارد کنید"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    role: z.enum(["student", "professor"], {
      message: "نقش کاربر باید دانشجو یا استاد باشد",
    }),
    university: z
      .string()
      .min(2, "نام دانشگاه باید حداقل ۲ کاراکتر باشد")
      .max(100, "نام دانشگاه نباید بیشتر از ۱۰۰ کاراکتر باشد"),
    field: z
      .string()
      .min(2, "رشته تحصیلی باید حداقل ۲ کاراکتر باشد")
      .max(100, "رشته تحصیلی نباید بیشتر از ۱۰۰ کاراکتر باشد"),
  }),

  login: z.object({
    email: z.string().email("لطفاً یک ایمیل معتبر وارد کنید"),
    password: z.string().min(1, "رمز عبور الزامی است"),
  }),
};

export type RegisterInput = z.infer<typeof UserSchema.register>;
export type LoginInput = z.infer<typeof UserSchema.login>;

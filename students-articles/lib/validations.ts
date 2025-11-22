import { z } from 'zod';

export const UserSchema = {
  register: z.object({
    fullName: z.string()
      .min(2, 'نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد')
      .max(100, 'نام و نام خانوادگی نباید بیشتر از ۱۰۰ کاراکتر باشد'),
    email: z.string()
      .email('لطفاً یک ایمیل معتبر وارد کنید'),
    password: z.string()
      .min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
    role: z.enum(['student', 'professor'], {
      message: 'نقش کاربر باید دانشجو یا استاد باشد'
    }),
    university: z.string()
      .min(2, 'نام دانشگاه باید حداقل ۲ کاراکتر باشد')
      .max(100, 'نام دانشگاه نباید بیشتر از ۱۰۰ کاراکتر باشد'),
    field: z.string()
      .min(2, 'رشته تحصیلی باید حداقل ۲ کاراکتر باشد')
      .max(100, 'رشته تحصیلی نباید بیشتر از ۱۰۰ کاراکتر باشد')
  }),
  
  login: z.object({
    email: z.string()
      .email('لطفاً یک ایمیل معتبر وارد کنید'),
    password: z.string()
      .min(1, 'رمز عبور الزامی است')
  })
};

export const ArticleSchema = {
  create: z.object({
    title: z.string()
      .min(5, 'عنوان مقاله باید حداقل ۵ کاراکتر باشد')
      .max(200, 'عنوان مقاله نباید بیشتر از ۲۰۰ کاراکتر باشد'),
    content: z.string()
      .min(100, 'محتوای مقاله باید حداقل ۱۰۰ کاراکتر باشد')
      .max(10000, 'محتوای مقاله نباید بیشتر از ۱۰۰۰۰ کاراکتر باشد'),
    category: z.enum(['کامپیوتر', 'مهندسی', 'علوم پایه', 'پزشکی', 'علوم انسانی', 'هنر', 'سایر'], {
      message: 'دسته‌بندی انتخاب شده معتبر نیست'
    }),
    tags: z.array(z.string().max(50, 'هر برچسب نباید بیشتر از ۵۰ کاراکتر باشد'))
      .max(10, 'حداکثر ۱۰ برچسب می‌توانید وارد کنید')
      .optional()
      .default([])
  }),
  
  update: z.object({
    title: z.string()
      .min(5, 'عنوان مقاله باید حداقل ۵ کاراکتر باشد')
      .max(200, 'عنوان مقاله نباید بیشتر از ۲۰۰ کاراکتر باشد')
      .optional(),
    content: z.string()
      .min(100, 'محتوای مقاله باید حداقل ۱۰۰ کاراکتر باشد')
      .max(10000, 'محتوای مقاله نباید بیشتر از ۱۰۰۰۰ کاراکتر باشد')
      .optional(),
    category: z.enum(['کامپیوتر', 'مهندسی', 'علوم پایه', 'پزشکی', 'علوم انسانی', 'هنر', 'سایر'], {
      message: 'دسته‌بندی انتخاب شده معتبر نیست'
    }).optional(),
    tags: z.array(z.string().max(50, 'هر برچسب نباید بیشتر از ۵۰ کاراکتر باشد'))
      .max(10, 'حداکثر ۱۰ برچسب می‌توانید وارد کنید')
      .optional()
  })
};

export const GradeSchema = {
  create: z.object({
    articleId: z.string()
      .min(1, 'شناسه مقاله الزامی است'),
    score: z.number()
      .min(0, 'نمره نمی‌تواند کمتر از ۰ باشد')
      .max(20, 'نمره نمی‌تواند بیشتر از ۲۰ باشد'),
    comment: z.string()
      .max(500, 'توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد')
      .optional()
  })
};

export type RegisterInput = z.infer<typeof UserSchema.register>;
export type LoginInput = z.infer<typeof UserSchema.login>;
export type CreateArticleInput = z.infer<typeof ArticleSchema.create>;
export type UpdateArticleInput = z.infer<typeof ArticleSchema.update>;
export type CreateGradeInput = z.infer<typeof GradeSchema.create>;

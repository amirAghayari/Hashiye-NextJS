import mongoose, { Document, Schema, Model } from "mongoose";

export interface IGrade {
  professor: mongoose.Types.ObjectId;
  score: number;
  comment?: string;
  gradedAt: Date;
}

export interface IArticle extends Document {
  title: string;
  content: string;
  category: string;
  author: mongoose.Types.ObjectId;
  grades: IGrade[];
  averageScore: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const gradeSchema = new Schema<IGrade>(
  {
    professor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "شناسه استاد الزامی است"],
    },
    score: {
      type: Number,
      required: [true, "نمره الزامی است"],
      min: [0, "نمره نمی‌تواند کمتر از ۰ باشد"],
      max: [20, "نمره نمی‌تواند بیشتر از ۲۰ باشد"],
    },
    comment: {
      type: String,
      maxlength: [500, "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد"],
      trim: true,
    },
    gradedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, "عنوان مقاله الزامی است"],
      trim: true,
      maxlength: [200, "عنوان مقاله نباید بیشتر از ۲۰۰ کاراکتر باشد"],
    },
    content: {
      type: String,
      required: [true, "محتوای مقاله الزامی است"],
      trim: true,
      minlength: [100, "محتوای مقاله باید حداقل ۱۰۰ کاراکتر باشد"],
    },
    category: {
      type: String,
      required: [true, "دسته‌بندی الزامی است"],
      enum: {
        values: [
          "کامپیوتر",
          "مهندسی",
          "علوم پایه",
          "پزشکی",
          "علوم انسانی",
          "هنر",
          "سایر",
        ],
        message: "دسته‌بندی انتخاب شده معتبر نیست",
      },
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "نویسنده مقاله الزامی است"],
    },
    grades: [gradeSchema],
    averageScore: {
      type: Number,
      default: 0,
      min: [0, "میانگین نمرات نمی‌تواند کمتر از ۰ باشد"],
      max: [20, "میانگین نمرات نمی‌تواند بیشتر از ۲۰ باشد"],
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, "هر برچسب نباید بیشتر از ۵۰ کاراکتر باشد"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ author: 1 });
articleSchema.index({ category: 1 });
articleSchema.index({ averageScore: -1 });
articleSchema.index({ createdAt: -1 });

articleSchema.pre("save", function (next) {
  if (this.isModified("grades")) {
    if (this.grades && this.grades.length > 0) {
      const totalScore = this.grades.reduce(
        (sum, grade) => sum + grade.score,
        0
      );
      this.averageScore = totalScore / this.grades.length;
    } else {
      this.averageScore = 0;
    }
  }
  next();
});

const Article =
  (mongoose.models.Article as Model<IArticle>) ||
  mongoose.model<IArticle>("Article", articleSchema);

export default Article;

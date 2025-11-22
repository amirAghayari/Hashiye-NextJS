import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: 'student' | 'professor';
  university: string;
  field: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'نام و نام خانوادگی الزامی است'],
    trim: true,
    maxlength: [100, 'نام و نام خانوادگی نباید بیشتر از ۱۰۰ کاراکتر باشد']
  },
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'لطفاً یک ایمیل معتبر وارد کنید']
  },
  password: {
    type: String,
    required: [true, 'رمز عبور الزامی است'],
    minlength: [6, 'رمز عبور باید حداقل ۶ کاراکتر باشد']
  },
  role: {
    type: String,
    required: [true, 'نقش کاربر الزامی است'],
    enum: {
      values: ['student', 'professor'],
      message: 'نقش کاربر باید دانشجو یا استاد باشد'
    },
    default: 'student'
  },
  university: {
    type: String,
    required: [true, 'دانشگاه الزامی است'],
    trim: true,
    maxlength: [100, 'نام دانشگاه نباید بیشتر از ۱۰۰ کاراکتر باشد']
  },
  field: {
    type: String,
    required: [true, 'رشته تحصیلی الزامی است'],
    trim: true,
    maxlength: [100, 'رشته تحصیلی نباید بیشتر از ۱۰۰ کاراکتر باشد']
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      // @ts-ignore
      delete ret.password;
      return ret;
    }
  }
});


export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

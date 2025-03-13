import mongoose, { Schema, Document } from 'mongoose';

// Tworzymy interfejs dla dokumentu User
interface ICourseType extends Document {
    name: string;
  }

  // Tworzymy schemat dla użytkownika
const courseSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Dodaje pola createdAt i updatedAt
  }
);

const CourseType = mongoose.model<ICourseType>('CourseType', courseSchema);

export default CourseType;
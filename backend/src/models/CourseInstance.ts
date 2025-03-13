import mongoose, { Schema, Document } from 'mongoose';

// Tworzymy interfejs dla dokumentu User
interface ICourseInstance extends Document {
    name: string;
    courseTypeId: string;
    timestampStart: Date;
    timestampEnd: Date;
    courseNumber: string;
    courseManager: string;
  }

  // Tworzymy schemat dla użytkownika
const courseInstanceSchema: Schema<ICourseInstance> = new Schema<ICourseInstance>(
  {
    name: {
      type: String,
      required: true,
    },
    courseTypeId: {
      type: String,
      required: true,
    },
    timestampStart: {
      type: Date,
      required: true,
    },
    timestampEnd: {
      type: Date,
      required: true,
    },
    courseNumber: {
      type: String,
      required: true,
    },
    courseManager: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Dodaje pola createdAt i updatedAt
  }
);

const CourseInstance = mongoose.model<ICourseInstance>('CourseInstance', courseInstanceSchema);

export default CourseInstance;
import mongoose from '../../database';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
  englishLevel: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  imageUrl: {
    type: String,
  },
}, { versionKey: false });

export const StudentModel = mongoose.model('Student', StudentSchema);

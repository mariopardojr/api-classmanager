import mongoose from '../../database';

const NoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
});

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
  notes: [NoteSchema],
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

export const StudentModel = mongoose.model('Student', StudentSchema);

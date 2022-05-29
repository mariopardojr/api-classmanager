import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { versionKey: false });

export const NoteModel = mongoose.model('Note', NoteSchema);

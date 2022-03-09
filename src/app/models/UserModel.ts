import mongoose from '../../database';
import bcrypt from 'bcryptjs';

const StudentSchema = new mongoose.Schema({
  name: String,
  id: String,
  imageUrl: String,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
  },
  students: {
    type: [StudentSchema],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

export const UserModel = mongoose.model('User', UserSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    role: [{ type: mongoose.Types.ObjectId, ref: 'Role', default: ['User'] }],
    avatar: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/quizgame-e00c9.appspot.com/o/general%2Fdefault_avatar.png?alt=media&token=12be8359-13e5-4554-9359-7dd6889fbf66',
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;

import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    answerOptions: {
      type: [
        {
          content: { type: String, required: true },
          isCorrect: { type: Boolean, default: false, required: true },
        },
      ],
      default: [],
    },
    isMultipleAnswer: { type: Boolean, default: false },
    numberOfQuestions: { type: String, required: true },
    time: { type: Number, default: 30, required: true },
    difficulty: { type: String, required: true },
    imageURL: { type: String },
    explaination: { type: String },
    quizzes: [{ type: mongoose.Types.ObjectId, ref: 'Quiz' }],
  },
  { timestamps: true },
);

const Question = mongoose.model('Question', questionSchema);

export default Question;

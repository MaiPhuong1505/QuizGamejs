import mongoose from 'mongoose';

const questionInQuizSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Types.ObjectId, ref: 'Question' },
    quizId: { type: mongoose.Types.ObjectId, ref: 'Quiz' },
    isUpdated: { type: Boolean, default: false },
    UpdatedQuestionContent: { type: String },
    UpdatedAnswerOptions: {
      type: [
        {
          content: { type: String },
          isCorrect: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

const QuestionInQuiz = mongoose.model('QuestionInQuiz', questionInQuizSchema);

export default QuestionInQuiz;

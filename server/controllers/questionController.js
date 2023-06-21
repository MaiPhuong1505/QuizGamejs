import Question from '../models/questionModel.js';
import Quiz from '../models/quizModel.js';

const questionController = {
  createQuestion: async (req, res) => {
    try {
      const { question, answerOptions, isMultipleAnswer, time, difficulty, imageURL, explaination, quiz } = req.body;
      const newQuestion = {
        question,
        answerOptions,
        isMultipleAnswer,
        time,
        difficulty,
        imageURL,
        explaination,
        quizzes: [quiz],
      };
      const insertedQuestion = await Question.create(newQuestion); //insert new question
      const update = { $push: { questions: insertedQuestion._id } }; //add new question ID into questions field of Quiz schema
      await Quiz.findOneAndUpdate({ _id: quiz }, update);
      res.json({
        msg: `Created question`,
        insertedQuestion,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getQuestionById: async (req, res) => {
    try {
      const question = await Question.findOne({ _id: req.params.id });
      res.json({
        msg: `Get question with id ${req.params.quizId}`,
        question,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateQuestion: async (req, res) => {
    try {
      const { question, answerOptions, isMultipleAnswer, time, difficulty, imageURL, explaination, quiz } = req.body;
      const newQuestion = {
        question,
        answerOptions,
        isMultipleAnswer,
        time,
        difficulty,
        imageURL,
        explaination,
      };
      const updatedQues = await Question.findOneAndUpdate(
        { _id: req.params.id },
        { $set: newQuestion, $push: { quizzes: quiz } },
        { new: true },
      );
      res.json({
        msg: `Updated question`,
        updatedQues,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteQuestion: async (req, res) => {
    try {
      const removedQues = await Question.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { quizzes: req.body.quiz } },
        { new: true },
      );
      res.json({
        msg: `Remove question from a quiz`,
        removedQues,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default questionController;

import Quiz from '../models/quizModel.js';

const quizController = {
  createQuiz: async (req, res) => {
    try {
      const { title, description, visibility, category, numberOfQuestions, user } = req.body;
      const newQuiz = { title, description, visibility, category, numberOfQuestions, user };
      const imageURL = req.body.imageURL;
      if (imageURL) {
        newQuiz = { ...newQuiz, imageURL };
      }
      await Quiz.create(newQuiz);

      res.json({
        msg: 'Created quiz!',
        newQuiz: {
          ...newQuiz,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getQuizzes: async (req, res) => {
    try {
      const quizzes = await Quiz.find({
        user: req.body.user,
        $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
      });
      res.json({
        msg: `All quizzes of userId ${req.body.user}`,
        quizzes,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getQuizById: async (req, res) => {
    try {
      const quiz = await Quiz.findOne({ _id: req.params.quizId });
      res.json({
        msg: `Get quiz with id ${req.params.quizId}`,
        quiz,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateQuiz: async (req, res) => {
    try {
      const { title, description, visibility, category, numberOfQuestions, imageURL } = req.body;
      const newQuiz = { title, description, visibility, category, numberOfQuestions, imageURL };
      const quiz = await Quiz.findOneAndUpdate({ _id: req.params.quizId }, newQuiz);

      res.json({
        msg: `Updated Quiz`,
        quiz,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findOneAndUpdate(
        { _id: req.params.quizId },
        { $set: { isDeleted: true } },
        { new: true },
      );
      res.json({
        msg: `Deleted Quiz`,
        quiz,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
export default quizController;

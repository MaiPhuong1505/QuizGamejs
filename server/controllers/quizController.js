import Quiz from '../models/quizModel.js';
import { QUIZ_TYPE } from '../utils/constants.js';

const getRandomQuestions = (questionsInQuiz, numberOfQues) => {
  const questionsWithRandomIndex = questionsInQuiz.map((item) => {
    console.log('item', item);
    item = { ...item._doc, randIndex: Math.floor(Math.random() * questionsInQuiz.length) };
    return item;
  });
  questionsWithRandomIndex.sort((a, b) => a.randIndex - b.randIndex);
  questionsWithRandomIndex.slice(0, numberOfQues);
  questionsWithRandomIndex.forEach((element) => {
    delete element.randIndex;
  });
  return questionsWithRandomIndex;
};

const quizController = {
  createQuiz: async (req, res) => {
    try {
      const { title, description, visibility, category, type, user, imageURL } = req.body;
      const newQuiz = { title, description, visibility, category, type, user, imageURL };

      const insertedQuiz = await Quiz.create(newQuiz);

      res.json({
        msg: 'Created quiz!',
        newQuiz: {
          ...newQuiz,
          quizId: insertedQuiz._id,
          user: req.user,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createQuizAuto: async (req, res) => {
    try {
      const { quizTitle, requirement, userId } = req.body;
      //requirement = [{quizId, numberOfQuestions}]
      let newQuestionList = [];
      for (let i = 0; i < requirement.length; i++) {
        const questions = await Question.find({
          quizzes: { $in: [requirement[i].quizId] },
        });
        // console.log(questions)
        // console.log(getRandomQuestions(questions, requirement.numberOfQuestions));
        newQuestionList = [...getRandomQuestions(questions, requirement.numberOfQuestions)];
      }
      console.log('newQuestionList', newQuestionList);
      const insertedQuiz = await Quiz.create({
        title: quizTitle,
        user: userId,
        questions: newQuestionList,
        type: ['Quiz'],
      });
      newQuestionList.forEach((question) => {
        Question.updateOne({ _id: question._id }, { $push: { quizzes: insertedQuiz._id } });
      });
      res.json({
        msg: 'Created quiz!',
        newQuiz: {
          ...insertedQuiz._doc,
          quizId: insertedQuiz._id,
          user: userId,
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
        type: { $in: [QUIZ_TYPE.QUIZ] },
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
      const quiz = await Quiz.findOneAndUpdate({ _id: req.params.quizId }, newQuiz, { new: true });

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
  getQuizzesTypeFlashcard: async (req, res) => {
    try {
      const flashcards = await Quiz.find({
        user: req.body.user,
        $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
        type: { $in: [QUIZ_TYPE.FLASHCARD] },
      });
      res.json({
        msg: `All flashcards of userId ${req.body.user}`,
        flashcards,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
export default quizController;

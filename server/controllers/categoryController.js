import Category from '../models/categoryModel.js';

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find({});
      res.json({
        msg: 'All categories',
        categories,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default categoryController;

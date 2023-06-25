import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userController = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      let newUserName = username.replace(/ /g, '');

      const user_name = await User.findOne({ username: newUserName });
      if (user_name) return res.status(400).json({ msg: 'This user name already exists.' });

      const user_email = await User.findOne({ email });
      if (user_email) return res.status(400).json({ msg: 'This email already exists.' });

      if (password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 characters.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      await newUser.save();

      res.status(200).json({
        msg: 'Register Success!',
        access_token,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      // .populate('followers following', 'avatar username fullname followers following');

      if (!user) return res.status(400).json({ msg: 'This email does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Password is incorrect.' });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: 'Login Success!',
        access_token,
        user: {
          ...user._doc,
          password: '',
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.json({ msg: 'Logged out!' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: 'Please login now.' });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (error, result) => {
        if (error) return res.status(400).json({ msg: 'Please login now.' });

        const user = await user
          .findById(result.id)
          .select('-password')
          .populate('followers following', 'avatar username fullname followers following');
        // console.log('user', user);
        if (!user) return res.status(400).json({ msg: 'This user does not exist.' });

        const access_token = createAccessToken({ id: result.id });

        res.json({
          access_token,
          user,
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

export { userController };

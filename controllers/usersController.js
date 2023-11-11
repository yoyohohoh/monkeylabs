const Users = require('../models/User');

const getAllUsers = async (req, res) => {
  var keyword = req.query.name;

  if (keyword == null) {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  else {
    try {
      keyword = keyword.replace('[', '').replace(']', '').trim();
      const users = await Users.find({
        name: { $regex: keyword, $options: 'i' }
      });

      res.status(200).json(users);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while fetching users.' });
    }
  }
};

const getUserById = async (req, res) => {
  const usersId = req.params.id;

    try {
        const users = await Users.findById(usersId);
        
        if (!users) {
            return res.status(404).json({ message: 'Users not found.' });
        }

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching users.' });
    }
};

const createUser = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newUsers = new Users({
          username,
          email,
          password,
        });

        const savedUsers = await newUsers.save();

        res.status(201).json(savedUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while adding users.' });
    }
};

const updateUser = async (req, res) => {
  const usersId = req.params.id;

  try {
      const updatedUsers = await Users.findByIdAndUpdate(usersId, req.body, { new: true, runValidators: true });
      
      if (!updatedUsers) {
          return res.status(404).json({ message: 'Users not found.' });
      }

      res.status(200).json(updatedUsers);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while updating users.' });
  }
};

const deleteUserById = async (req, res) => {
  const usersId = req.params.id;

  try {
      const users = await Users.findByIdAndDelete(usersId);
      
      if (!users) {
          return res.status(404).json({ message: 'Users not found.' });
      }

      res.status(200).json({ message: 'Users successfully deleted.', deletedUsers: users });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting users.' });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
      const users = await Users.deleteMany({});
      res.status(200).json({ message: 'All users successfully deleted.', deletedUsers: users });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error while deleting users.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  deleteAllUsers
}
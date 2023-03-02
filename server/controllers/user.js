import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ msg: "There is something wrong with your User id" });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("friends");
    const friends = await Promise.all(
      user.friends.map((friendId) =>
        User.findById(friendId).select("-password")
      )
    );
    return res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  const { id, friendId } = req.params;
  if (id !== friendId) {
    try {
      const user = await User.findById(id).select("friends");
      const friend = await User.findById(friendId).select("-password");

      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        friend.friends.push(id);
      } else {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((userId) => userId !== id);
      }

      await user.save();
      await friend.save();

      return res.status(200).json(friend);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    res.status(403).json({ msg: "You can Not Follow or UnFollow Yourself" });
  }
};

export const updateUser = async (req, res) => {
  const { password, ...other } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ msg: "User not found" });

    //   Check for duplicate
    const duplicate = await User.findOne({ email: other.email })
      .collation({ locale: "en", strength: 2 }) // check for case sensitive data (lower case or upper case)
      .lean()
      .exec();

    // Allow updates to the original user
    if (duplicate && duplicate._id.toString() !== req.user) {
      return res
        .status(409)
        .json({ msg: "This Email is Used Please Try Another One" });
    }

    let hashedPwd;
    if (password) {
      const salt = await bcrypt.genSalt();
      hashedPwd = await bcrypt.hash(password, salt);
    }

    const data = password ? { ...other, password: hashedPwd } : other;

    const updatedUser = await User.findByIdAndUpdate(req.user, data, {
      new: true,
    });

    const { password: pwd, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUsersBySearch = async (req, res) => {
  const { searchQuery, page } = req.query;
  const Page = +page || 1;
  const Limit = 4;
  const startIndex = (Page - 1) * Limit;

  try {
    const userSearch = new RegExp(searchQuery, "i");
    const usersCount = await User.find({
      $or: [{ firstName: userSearch }, { lastName: userSearch }],
    }).countDocuments();

    const users = await User.find({
      $or: [{ firstName: userSearch }, { lastName: userSearch }],
    })
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex);
    const total = usersCount;
    const hasMore = Page < Math.ceil(total / Limit);

    const userInfo = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });
    res.status(200).json({ users: userInfo, hasMore });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { userId, description, picturePath } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const newPost = await Post.create({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
    });

    if (!newPost) return res.status(404).json({ msg: "Invalid post" });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  const { page } = req.query;
  const Page = +page || 1;
  const Limit = 4;
  const startIndex = (Page - 1) * Limit;
  try {
    const total = await Post.countDocuments({});
    const hasMore = Page < Math.ceil(total / Limit);
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex);
    res.status(200).json({ posts, hasMore });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { page } = req.query;
  const Page = +page || 1;
  const Limit = 4;
  const startIndex = (Page - 1) * Limit;
  try {
    const { userId } = req.params;
    const total = await Post.find({ userId }).countDocuments();
    const hasMore = Page < Math.ceil(total / Limit);
    const posts = await Post.find({ userId })
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex);

    res.status(200).json({ posts, hasMore });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (!isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ msg: "Post has been deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { desc, picPath } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { description: desc, picturePath: picPath },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, page } = req.query;
  const Page = +page || 1;
  const Limit = 4;
  const startIndex = (Page - 1) * Limit;
  try {
    const postSearch = new RegExp(searchQuery, "i");
    const CountedPost = await Post.find({
      description: postSearch,
    }).countDocuments();

    const posts = await Post.find({
      description: postSearch,
    })
      .sort({ _id: -1 })
      .limit(Limit)
      .skip(startIndex);
    const total = CountedPost;
    const hasMore = Page < Math.ceil(total / Limit);

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

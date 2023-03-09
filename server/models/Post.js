import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    description: { type: String, required: true },
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        text: String,
        postedBy: { type: String, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;

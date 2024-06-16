import mongoose from "mongoose";
import { User } from "../model/user.model";

export const retrieveOwnProfile = async (userId: string) => {
  const data = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "follows",
        localField: "_id",
        foreignField: "following",
        as: "followers",
        pipeline: [{ $project: { follower: 1 } }],
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "author",
        as: "posts",
        pipeline: [{ $project: { _id: 1 } }],
      },
    },
    {
      $addFields: {
        postCount: {
          $size: { $ifNull: ["$posts", []] },
        },
      },
    },
    {
      $project: {
        password: 0,
        followers: 0,
        posts: 0,
      },
    },
  ]);

  if (!data) throw null;

  return data[0];
};

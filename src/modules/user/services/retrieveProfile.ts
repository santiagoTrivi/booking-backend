import mongoose from "mongoose";
import { User } from "../model/user.model";

export const retrieveProfile = async (folowerId: string, userId: string) => {
  const data = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(userId), isActive: true },
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
        isFollowed: {
          $in: [
            folowerId,
            {
              $map: {
                input: "$followers.follower",
                as: "id",
                in: {
                  $toString: "$$id",
                },
              },
            },
          ],
        },
        postCount: {
          $size: { $ifNull: ["$posts", []] },
        },
      },
    },
    {
      $project: {
        password: 0,
        balance: 0,
        email: 0,
        followers: 0,
        posts: 0,
        bankNumber: 0,
        role: 0,
      },
    },
  ]);

  if (!data) throw null;

  return data[0];
};

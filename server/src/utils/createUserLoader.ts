import DataLoader from "dataloader";
import { User } from "../entities/User";

export const createUserLoader = () =>
  new DataLoader<string, User>(async (keys) => {
    const users = await User.findByIds(keys as string[]);
    const userIdToUser: Record<string, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });
    return keys.map((userId) => userIdToUser[userId]);
  });

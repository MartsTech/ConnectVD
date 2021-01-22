import { Friend } from "../entities/Friend";
import { User } from "../entities/User";

export const validateFriendRequest = async (
  id: string,
  email: string,
  checkCopy?: boolean
): Promise<
  { message: string; status: "error" | "warning" | "info" | "success" } | string
> => {
  const sender = await User.findOne({ where: { id } });
  if (!sender) {
    return {
      message: "There was an error with the friend request.",
      status: "error",
    };
  }
  const receiver = await User.findOne({ where: { email } });
  if (!receiver) {
    return {
      message: "There is no user with this email.",
      status: "error",
    };
  }
  if (checkCopy) {
    if (sender.email === receiver.email) {
      return {
        message: "There was an error with the friend request.",
        status: "error",
      };
    }
    const requestExist = await Friend.findOne({
      where: { userId: sender.id, friendId: receiver.id, status: "pending" },
    });
    if (requestExist) {
      return { message: "Request is pending.", status: "warning" };
    }
    const friends = await Friend.findOne({
      where: { userId: sender.id, friendId: receiver.id, status: "accepted" },
    });
    if (friends) {
      return { message: "You are already friends.", status: "warning" };
    }
  }

  return receiver!.id;
};

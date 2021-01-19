import { Friend } from "../entities/Friend";
import { User } from "../entities/User";

export const validateFriendRequest = async (
  id: string,
  email: string,
  checkCopy?: boolean
) => {
  const sender = await User.findOne({ id });
  if (!sender) {
    return undefined;
  }
  const receiver = await User.findOne({ email });
  if (!receiver) {
    return undefined;
  }
  if (checkCopy) {
    if (sender.email === receiver.email) {
      return undefined;
    }
    const exist = await Friend.findOne({
      where: { userId: sender.id, friendId: receiver.id },
    });
    if (exist) {
      return undefined;
    }
  }

  return receiver!.id;
};

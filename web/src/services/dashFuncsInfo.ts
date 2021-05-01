import {
  MailIcon,
  PlusCircleIcon,
  UserAddIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";

export default [
  {
    title: "Start Meeting",
    Icon: VideoCameraIcon,
    color: "red",
    id: "start",
  },
  {
    title: "Join Meeting",
    Icon: PlusCircleIcon,
    color: "blue",
    id: "join",
  },
  {
    title: "Send Mail",
    Icon: MailIcon,
    color: "blue",
    id: "send",
  },
  {
    title: "Add Friend",
    Icon: UserAddIcon,
    color: "blue",
    id: "add",
  },
];

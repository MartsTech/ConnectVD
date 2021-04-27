import { Request, Response } from "express";
import { User } from "./entities/User";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  req: Request & { session: { userId: string } };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
};
export type socketPayload = {
  target: string;
  caller: string;
  email: string;
  sdp?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
};

export type NotifyError = {
  message: string;
  status: "error" | "warning" | "info" | "success";
};

export type Users = {
  sender: User;
  receiver: User;
};

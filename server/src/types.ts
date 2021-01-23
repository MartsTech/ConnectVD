import { Request, Response } from "express";
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  req: Request & { session: { userId: string } };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
};
export type socketPayload = {
  target: string;
  caller: string;
  sdp: RTCSessionDescription | undefined;
  candidate: RTCIceCandidate | undefined;
};

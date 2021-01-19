import { createUserLoader } from "./utils/createUserLoader";

export type socketPayload = {
  target: string;
  caller: string;
  sdp: RTCSessionDescription | undefined;
  candidate: RTCIceCandidate | undefined;
};

export type MyContext = {
  userLoader: ReturnType<typeof createUserLoader>;
};

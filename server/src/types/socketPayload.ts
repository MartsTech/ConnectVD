export type socketPayload = {
  target: string;
  caller: string;
  sdp: RTCSessionDescription | undefined;
  candidate: RTCIceCandidate | undefined;
};

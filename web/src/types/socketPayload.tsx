export type socketPayload = {
  target: string;
  caller: string;
  sdp?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
};

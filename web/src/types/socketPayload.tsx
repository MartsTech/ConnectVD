export type socketPayload = {
  target: string;
  caller: string;
  video?: boolean;
  sdp?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
};

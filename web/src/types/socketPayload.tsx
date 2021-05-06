export type socketPayload = {
  target: string;
  caller: string;
  photoUrl?: string;
  status?: string;
  sdp?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
};

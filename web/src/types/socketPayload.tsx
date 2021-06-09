export type socketPayload = {
  target: string;
  caller: string;
  photoUrl?: string;
  status?: string;
  sdp?: RTCSessionDescription | RTCSessionDescriptionInit;
  candidate?: RTCIceCandidate;
};

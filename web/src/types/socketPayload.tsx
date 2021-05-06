export type socketPayload = {
  target: string;
  caller: string;
  photoUrl?: string;
  status?: string;
  video?: boolean;
  sdp?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
};

export type socketPayload = {
  target: string;
  caller: string;
  email: string;
  sdp?: RTCSessionDescription;
  candidate?: RTCIceCandidate;
};

export type peerContext = {
  id: string;
  email: string;
  peer: RTCPeerConnection;
};

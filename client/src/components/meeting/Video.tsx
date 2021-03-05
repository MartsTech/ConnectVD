import { useEffect, useRef } from "react";
import styles from "../../styles/Video.module.css";
import clsx from "clsx";
import { useFriendsQuery } from "../../generated/graphql";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { usePalette } from "react-palette";

interface videoProps {
  peer: RTCPeerConnection;
  state: boolean;
  email: string;
}

export const Video: React.FC<videoProps> = ({ peer, state, email }) => {
  const videoRef = useRef<any>();

  const user = useSelector(selectUser);

  const [{ data }] = useFriendsQuery({ variables: { uid: user!.uid } });

  const friend = data?.friends.find((friend) => friend.id === email);

  const { data: BgData } = usePalette(friend?.user.photoUrl || "");

  useEffect(() => {
    peer.ontrack = handleTrackEvent;
    // eslint-disable-next-line
  }, []);

  const handleTrackEvent = (e: RTCTrackEvent) => {
    videoRef.current.srcObject = e.streams[0];
  };

  return (
    <div className={styles.video}>
      {BgData && (
        <div
          style={{ background: BgData.darkVibrant }}
          className={clsx(styles.cover, {
            [styles.videoOff]: state,
          })}
        >
          <Avatar src={friend?.user.photoUrl} />
          <h4>{friend?.user.displayName}</h4>
        </div>
      )}
      <div></div>
      <video autoPlay playsInline ref={videoRef} />
    </div>
  );
};

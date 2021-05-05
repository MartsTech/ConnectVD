import { auth } from "@config/firebase";
import Invite from "@module/Invite";
import {
  useAcceptFriendRequestMutation,
  useAcceptInviteMutation,
  useDeclineFriendRequestMutation,
  useDeclineInviteMutation,
  useFriendRequestsQuery,
  useInvitesQuery,
} from "generated/graphql";
import { useRouter } from "next/router";
import { useSnackbar, VariantType } from "notistack";
import { useAuthState } from "react-firebase-hooks/auth";
import FlipMove from "react-flip-move";

interface InvitesProps {}

const Invites: React.FC<InvitesProps> = ({}) => {
  const [user, loading] = useAuthState(auth);

  const [friendRequests] = useFriendRequestsQuery({
    pause: loading,
    variables: {
      uid: user?.uid as string,
    },
  });
  const [invites] = useInvitesQuery({
    pause: loading,
    variables: {
      uid: user?.uid as string,
    },
  });

  const [, acceptRequest] = useAcceptFriendRequestMutation();
  const [, declineRequest] = useDeclineFriendRequestMutation();

  const [, acceptInvite] = useAcceptInviteMutation();
  const [, declineInvite] = useDeclineInviteMutation();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const accept = async (
    type: "friend request" | "join meeting",
    email: string
  ) => {
    if (type === "friend request") {
      await acceptRequest({
        uid: user?.uid as string,
        email,
      });
    } else if (type === "join meeting") {
      const response = await acceptInvite({
        uid: user?.uid as string,
        email,
      });

      if (response.data?.acceptInvite.error) {
        enqueueSnackbar(response.data?.acceptInvite.error.message, {
          variant: response.data?.acceptInvite.error.status as VariantType,
          autoHideDuration: 3000,
        });
      } else {
        router.push(`/room/${response.data?.acceptInvite.roomId}`);
      }
    }
  };

  const decline = async (
    type: "friend request" | "join meeting",
    email: string
  ) => {
    if (type === "friend request") {
      await declineRequest({
        uid: user?.uid as string,
        email,
      });
    } else if (type === "join meeting") {
      await declineInvite({
        uid: user?.uid as string,
        email,
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div
        className="flex items-center justify-between mb-5 mt-5
      sm:mt-0 ml-4 h-12"
      >
        <div className="text-primary-100 font-bold text-xl">Your Invites</div>
      </div>
      <FlipMove
        className="flex-grow flex flex-col space-y-3 overflow-y-scroll scrollbar-hide 
      text-primary-100"
      >
        {friendRequests.data?.friendRequests.map((request) => (
          <Invite
            key={request.id}
            data={request.user}
            time={request.createdAt}
            type="friend request"
            onAccept={() => accept("friend request", request.user.email)}
            onDecline={() => decline("friend request", request.user.email)}
          />
        ))}
        {invites.data?.invites.map((invite) => (
          <Invite
            key={invite.id}
            data={invite.user}
            time={invite.createdAt}
            type="join meeting"
            onAccept={() => accept("join meeting", invite.user.email)}
            onDecline={() => decline("join meeting", invite.user.email)}
          />
        ))}
        {friendRequests.data?.friendRequests.length === 0 &&
          invites.data?.invites.length === 0 && (
            <div
              className="text-primary-100 font-semibold text-lg text-center
          w-full px-4 py-6 rounded-lg transition duration-200 ease-in-out bg-primary-700
          hover:bg-primary-600 cursor-pointer"
            >
              You have no available invites
            </div>
          )}
      </FlipMove>
    </div>
  );
};

export default Invites;

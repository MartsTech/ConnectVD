import { MeQuery } from "generated/graphql";
import { ForwardedRef, forwardRef } from "react";
import Avatar from "./Avatar";

interface MessageProps {
  data?: MeQuery;
}

const Message: React.FC<MessageProps> = forwardRef(
  ({ data }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className="flex space-x-2 w-full px-2">
        <div className="">
          <Avatar src={data?.me?.photoUrl} status={data?.me?.status} />
        </div>

        <p className="flex-grow max-w-[240px] break-words">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga? Ipsa laudantium molestias eos sapiente
          officiis modi at sunt excepturi expedita sint? Sed quibusdam
          recusandae alias error harum maxime adipisci amet laborum.
          Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
          cumque velit
        </p>
      </div>
    );
  }
);

export default Message;

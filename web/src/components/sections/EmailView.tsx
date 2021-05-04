import Avatar from "@element/Avatar";

interface EmailViewProps {}

const EmailView: React.FC<EmailViewProps> = ({}) => {
  return (
    <div
      className="flex-grow flex flex-col pb-20 bg-primary-700 rounded-lg
    relative overflow-y-scroll scrollbar-hide"
    >
      <div className="sticky top-0 z-10 bg-primary-700">
        <div
          className="flex p-4 bg-primary-700 rounded-t-8 
      border-b border-primary-600 w-full cursor-pointer text-primary-100"
        >
          <div className="absolute">
            <Avatar size={1.5} />
          </div>
          <div
            className="pl-20 flex text-xl font-bold flex-1 text-left break-all truncate
          whitespace-pre-wrap line-clamp-2 h-14"
          >
            Taking voice conversations to the moon 🚀
          </div>
        </div>
        <div
          className="flex text-primary-200 p-4 border-b 
      border-primary-600 justify-between items-center"
        >
          <p className="truncate mr-5">
            <span className="text-primary-100 mr-2">from:</span>
            martin.e.velkov@gmail.com
          </p>
          <p className="text-sm whitespace-nowrap">Sun Mar 07 2021</p>
        </div>
      </div>

      <div className="text-primary-100 mx-4 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
        nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
        error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
        modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
        error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt
        dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed
        amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat,
        temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores
        labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto
        ab laudantium modi minima sunt esse temporibus sint culpa, recusandae
        aliquam numquam totam ratione voluptas quod exercitationem fuga.
        Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
        nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
        error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
        modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
        error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt
        dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed
        amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat,
        temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores
        labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto
        ab laudantium modi minima sunt esse temporibus sint culpa, recusandae
        aliquam numquam totam ratione voluptas quod exercitationem fuga.
        Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
        molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
        officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
        nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
        error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis
        modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
        error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt
        dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed
        amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat,
        temporibus enim commodi iusto libero magni deleniti quod quam
        consequuntur! Commodi minima excepturi repudiandae velit hic maxime
        doloremque. Quaerat provident commodi consectetur veniam similique ad
        earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
        fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores
        labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto
        ab laudantium modi minima sunt esse temporibus sint culpa, recusandae
        aliquam numquam totam ratione voluptas quod exercitationem fuga.
        Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!
      </div>
    </div>
  );
};

export default EmailView;

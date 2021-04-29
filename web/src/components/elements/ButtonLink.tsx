import Link from "next/link";

interface ButtonLinkProps {
  title: string;
  href: string;
  outlined?: boolean;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  title,
  href,
  outlined = false,
}) => {
  return (
    <Link href={href}>
      <button
        className={`h-9 sm:h-10 px-2 md:px-6 rounded-lg focus:outline-none
        ${outlined ? "border border-gray-400" : "bg-[#3f51b5] text-white"} `}
      >
        {title}
      </button>
    </Link>
  );
};

export default ButtonLink;

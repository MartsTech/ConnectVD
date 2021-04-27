import Link from "next/link";
import Button from "@material-ui/core/Button";

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
      <Button
        className="h-9 sm:h-10 px-1 sm:px-3 md:px-6"
        disableElevation
        variant={outlined ? "outlined" : "contained"}
        color="primary"
      >
        {title}
      </Button>
    </Link>
  );
};

export default ButtonLink;

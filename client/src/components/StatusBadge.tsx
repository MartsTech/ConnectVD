import { Badge, createStyles, Theme, withStyles } from "@material-ui/core";

interface StatusBageProps {
  status: string | undefined;
  className?: string;
  id?: string;
}

export const StatusBadge: React.FC<StatusBageProps> = ({
  status,
  children,
  ...props
}) => {
  let color = "";
  if (status === "available") {
    color = "#44b700";
  } else if (status === "away") {
    color = "orange";
  } else if (status === "busy") {
    color = "red";
  }

  const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
      badge: {
        backgroundColor: color,
        color,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          animation: "$ripple 1.2s infinite ease-in-out",
          border: "1px solid currentColor",
          content: '""',
        },
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    })
  )(Badge);

  return (
    <StyledBadge
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      overlap="circle"
      variant="dot"
      {...props}
    >
      {children}
    </StyledBadge>
  );
};

interface BadgeProps {
  status?: "available" | "away" | "busy";
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const color =
    status === "available"
      ? "bg-green-300"
      : status === "away"
      ? "bg-yellow-300"
      : "bg-red-300";

  return (
    <div
      className={`h-2.5 w-2.5 rounded-full absolute bottom-1 right-1
     animate-bounce ${color}`}
    />
  );
};

export default Badge;

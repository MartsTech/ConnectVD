interface BadgeProps {
  status?: "available" | "away" | "busy";
  size?: number;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, size = 1, className }) => {
  const color =
    status === "available"
      ? "bg-green-300"
      : status === "away"
      ? "bg-yellow-300"
      : "bg-red-600";

  const sizeCss =
    size === 1 ? "h-2.5 w-2.5" : size === 1.5 ? "h-4 w-4" : "h-5 w-5";

  return (
    <div
      className={`rounded-full bottom-1 right-1
     animate-bounce ${color} ${sizeCss} ${className}`}
    />
  );
};

export default Badge;

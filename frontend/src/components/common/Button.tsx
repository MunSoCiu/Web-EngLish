import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  className,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold",
        className
      )}
    >
      {children}
    </button>
  );
}

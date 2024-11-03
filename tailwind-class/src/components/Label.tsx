import clsx from "clsx";

interface LabelProps {
  size?: "small" | "medium" | "large";
  weight?: "bold" | "semi-bold" | "thin";
  color?: "white" | "gray";
  className?: string;
  text: React.ReactNode;
}

const Label = ({
  size = "medium",
  weight = "semi-bold",
  color = "white",
  className,
  text,
}: LabelProps) => {
  const LabelTags = clsx(
    "flex justify-center",

    size === "small" && "text-sm",
    size === "medium" && "text-md",
    size === "large" && "text-3xl",

    weight === "semi-bold" && ["font-semibold"],
    weight === "bold" && ["font-bold"],
    weight === "thin" && ["font-thin"],

    color === "white" && "text-white",
    color === "gray" && "text-gray-200",

    className
  );
  return (
    <div>
      <label className={LabelTags}>{text}</label>
    </div>
  );
};

export default Label;

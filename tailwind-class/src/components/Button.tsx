import { MouseEventHandler } from "react";
import clsx from "clsx";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const Button = ({
  onClick,
  label,
  variant = "primary",
  size = "medium",
  disabled = false,
  isLoading = false,
  className,
}: ButtonProps) => {
  const buttonClasses = clsx(
    {
      "rounded-lg w-full font-semibold transition-colors duration-200": true,

      "bg-gray-500 hover:bg-gray-700 text-white": variant === "primary",
      "bg-gray-200 hover:bg-gray-300 text-gray-800": variant === "secondary",
      "bg-red-500 hover: bg-red-700 text-white": variant === "danger",

      "px-2 py-1 text-sm": size === "small",
      "px-4 py-2": size === "medium",
      "px-6 py-3 text-lg": size === "large",

      "opacity-50 cursor-not-allowed": disabled || isLoading,
      "animate-pulse": isLoading,
    },
    className
  );

  return (
    <div>
      <button
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        {isLoading ? "Loading.." : label}
      </button>
    </div>
  );
};

export default Button;

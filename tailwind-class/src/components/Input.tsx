import clsx from "clsx";
import { ChangeEventHandler } from "react";

interface InputProps {
  type?: "password" | "text";
  placeholder?: string;
  variant?: "outlined" | "filled";
  size?: "small" | "medium" | "large";
  fullWidth: boolean;
  className?: string;
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  type = "text",
  variant = "outlined",
  size = "medium",
  fullWidth = false,
  placeholder,
  className,
  value,
  onChange,
}: InputProps) => {
  const inputClasses = clsx(
    "rounded-lg transition-all duration-200 font-normal bg-blue-700 text-white",
    "focus:outline-none focus:ring-2",

    variant === "outlined" && ["focus:border-white focus:ring-white"],

    variant === "filled" && [
      "bg-gray-100 border border-transparent",
      "focus:bg-white focus:border-blue-500 focus:ring-blue-500/20",
    ],

    size === "small" && "px-3 py-1.5 text-sm",
    size === "medium" && "px-4 py-2",
    size === "large" && "px-4 py-3 text-lg",

    fullWidth && "w-full",

    className
  );

  return (
    <div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className={inputClasses}
        value={value}
      />
    </div>
  );
};

export default Input;

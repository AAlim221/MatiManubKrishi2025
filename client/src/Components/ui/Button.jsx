// src/components/ui/button.jsx
import React from "react";
import classNames from "classnames";

export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium focus:outline-none transition-all";

  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-green-600 text-green-700 hover:bg-green-50",
    ghost: "text-green-700 hover:bg-green-100",
  };

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;



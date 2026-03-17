import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`py-3 px-6 rounded-lg flex items-center justify-center shadow-sm transition-all ${className}`}
    >
      {children}
    </button>
  );
};
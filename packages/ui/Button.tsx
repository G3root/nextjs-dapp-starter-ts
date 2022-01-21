import * as React from "react";
import clsx from "clsx";
export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export function Button({ children, className, ...rest }: IButtonProps) {
  return (
    <button
      className={clsx(
        "bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

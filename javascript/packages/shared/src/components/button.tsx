import { forwardRef } from "react";
import cn from "clsx";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md border shadow-sm px-2 py-1 hover:brightness-90 transition-all",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

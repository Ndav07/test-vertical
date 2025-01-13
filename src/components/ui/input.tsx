import { XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onReset?: () => void;
  noClearButton?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onReset, noClearButton, ...props }, ref) => {
    return (
      <div className="flex">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            noClearButton ? "p-3" : "py-1 pl-3 pr-9",
            className,
          )}
          ref={ref}
          {...props}
        />

        {props.value && !noClearButton && (
          <button
            onClick={onReset}
            className="-ml-9 mt-[2px] flex h-8 w-8 items-center justify-center rounded-lg hover:cursor-pointer hover:bg-primary-foreground"
          >
            <XIcon height={15} width={15} className="text-primary" />
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

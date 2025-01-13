import { XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onReset?: () => void;
  noClearButton?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onReset, noClearButton, ...props }, ref) => {
    return (
      <div className="relative flex">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            noClearButton ? "p-3" : "py-2 pl-3 pr-9",
            className,
          )}
          ref={ref}
          {...props}
        />

        {props.value && !noClearButton && (
          <button
            onClick={onReset}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg hover:cursor-pointer hover:bg-primary-foreground"
          >
            <XIcon height={15} width={15} className="text-primary" />
          </button>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };

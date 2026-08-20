import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-body font-bold text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary hover:bg-primary-dark rounded-full",
        secondary:
          "bg-surface text-primary border-2 border-primary hover:bg-surface-alt hover:text-primary-dark hover:border-primary-dark rounded-full",
        ghost:
          "bg-transparent text-on-surface border border-on-surface/20 hover:bg-on-surface/5 rounded-full",
        accent:
          "bg-accent text-on-accent hover:bg-accent-dark rounded-full",
      },
      size: {
        default: "px-8 py-4",
        sm: "px-5 py-2.5 text-xs",
        lg: "px-10 py-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

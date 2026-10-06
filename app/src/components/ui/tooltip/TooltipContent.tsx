import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Tooltip as TooltipPrimitive } from "radix-ui";

const tooltipContentVariants = cva(
  " z-50 flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md px-3 py-1.5 text-xs has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-foreground [--tooltip-arrow-bg:var(--color-muted)] [--tooltip-arrow-border:var(--color-muted)]",

        dark: "bg-dark text-dark-foreground [--tooltip-arrow-bg:var(--color-dark)] [--tooltip-arrow-border:var(--color-dark)]",

        muted:
          "bg-muted text-foreground opacity-60 [--tooltip-arrow-bg:var(--color-muted)] [--tooltip-arrow-border:var(--color-muted)]",

        primary:
          "bg-primary text-primary-foreground [--tooltip-arrow-bg:var(--color-primary)] [--tooltip-arrow-border:var(--color-primary)]",

        secondary:
          "bg-secondary text-secondary-foreground [--tooltip-arrow-bg:var(--color-secondary)] [--tooltip-arrow-border:var(--color-secondary)]",

        success:
          "bg-success text-success-foreground [--tooltip-arrow-bg:var(--color-success)] [--tooltip-arrow-border:var(--color-success)]",

        warning:
          "bg-warning text-warning-foreground [--tooltip-arrow-bg:var(--color-warning)] [--tooltip-arrow-border:var(--color-warning)]",

        danger:
          "bg-danger text-danger-foreground [--tooltip-arrow-bg:var(--color-danger)] [--tooltip-arrow-border:var(--color-danger)]",

        "dark-bordered":
          "border border-dark bg-background text-dark [--tooltip-arrow-bg:var(--color-background)] [--tooltip-arrow-border:var(--color-dark)]",

        "muted-bordered":
          "border border-muted bg-background text-muted opacity-60 [--tooltip-arrow-bg:var(--color-background)] [--tooltip-arrow-border:var(--color-muted)]",

        "primary-bordered":
          "border border-primary bg-background text-primary [--tooltip-arrow-bg:var(--color-background)] [--tooltip-arrow-border:var(--color-primary)]",

        "secondary-bordered":
          "border border-secondary bg-background text-secondary [--tooltip-arrow-bg:var(--color-background)] [--tooltip-arrow-border:var(--color-secondary)]",

        "success-bordered":
          "border border-success bg-background text-success [--tooltip-arrow-bg:var(--color-background)] [--tooltip-arrow-border:var(--color-success)]",

        "warning-bordered":
          "border border-warning bg-background text-warning [--tooltip-arrow-bg:var(--color-background)] [--tooltip-arrow-border:var(--color-warning)]",

        "danger-bordered":
          "border border-danger bg-background text-danger [--tooltip-arrow-bg:var(--color-background)] [--tooltip-arrow-border:var(--color-danger)]",

        ghost:
          "border border-transparent bg-transparent text-foreground [--tooltip-arrow-bg:transparent] [--tooltip-arrow-border:var(--color-foreground)]",

        "dark-ghost":
          "border border-dark bg-muted text-dark [--tooltip-arrow-bg:var(--color-muted)] [--tooltip-arrow-border:var(--color-dark)]",

        "primary-ghost":
          "border border-primary-800 bg-primary-200 text-primary-800 [--tooltip-arrow-bg:var(--color-primary-200)] [--tooltip-arrow-border:var(--color-primary-800)]",

        "secondary-ghost":
          "border border-secondary-800 bg-secondary-200 text-secondary-800 [--tooltip-arrow-bg:var(--color-secondary-200)] [--tooltip-arrow-border:var(--color-secondary-800)]",

        "success-ghost":
          "border border-success-800 bg-success-200 text-success-800 [--tooltip-arrow-bg:var(--color-success-200)] [--tooltip-arrow-border:var(--color-success-800)]",

        "warning-ghost":
          "border border-warning-800 bg-warning-200 text-warning-800 [--tooltip-arrow-bg:var(--color-warning-200)] [--tooltip-arrow-border:var(--color-warning-800)]",

        "danger-ghost":
          "border border-danger-800 bg-danger-200 text-danger-800 [--tooltip-arrow-bg:var(--color-danger-200)] [--tooltip-arrow-border:var(--color-danger-800)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
> &
  VariantProps<typeof tooltipContentVariants>;

function TooltipContent({
  className,
  variant = "default",
  sideOffset = 0,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants({ variant, className }))}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-(--tooltip-arrow-bg) fill-(--tooltip-arrow-bg) border border-(--tooltip-arrow-border)" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { TooltipContent, tooltipContentVariants };
export type { TooltipContentProps };

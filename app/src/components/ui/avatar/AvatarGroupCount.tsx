import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const avatarGroupCountVariants = cva(
  "relative flex shrink-0 items-center justify-center rounded-full text-sm ring-2 ring-background",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        dark: "bg-dark text-dark-foreground",
        muted: "bg-muted text-foreground opacity-60",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
      },
      size: {
        xl: "w-13 h-13",
        lg: "w-12 h-12",
        md: "w-11 h-11",
        sm: "w-10 h-10",
        xs: "w-9 h-9",
      },
      rounded: {
        full: "rounded-full",
        xl: "rounded-xl",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
        xs: "rounded-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
    },
  },
);

type AvatarGroupCountProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarGroupCountVariants>;

function AvatarGroupCount({
  className,
  variant = "default",
  rounded = "full",
  size = "md",
  ...props
}: AvatarGroupCountProps) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        avatarGroupCountVariants({ variant, rounded, size, className }),
      )}
      {...props}
    />
  );
}

export { AvatarGroupCount, avatarGroupCountVariants };
export type { AvatarGroupCountProps };

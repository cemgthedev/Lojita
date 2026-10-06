import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const avatarBadgeVariants = cva(
  "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full ring-2 ring-background select-none",
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
        xl: "w-4 h-4",
        lg: "w-3 h-3",
        md: "w-2 h-2",
        sm: "w-1.5 h-1.5",
        xs: "w-1 h-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type AvatarBadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof avatarBadgeVariants>;

function AvatarBadge({
  className,
  variant = "success",
  size = "md",
  ...props
}: AvatarBadgeProps) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(avatarBadgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { AvatarBadge, avatarBadgeVariants };
export type { AvatarBadgeProps };

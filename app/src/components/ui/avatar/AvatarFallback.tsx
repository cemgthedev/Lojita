import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar as AvatarPrimitive } from "radix-ui";

const avatarFallbackVariants = cva(
  "flex size-full items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        dark: "bg-dark text-dark-foreground",
        muted: "bg-muted text-foreground",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarPrimitive.Fallback
> &
  VariantProps<typeof avatarFallbackVariants>;

function AvatarFallback({
  variant = "default",
  className,
  ...props
}: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        avatarFallbackVariants({ variant, className }),
        // Avatar text size
        "group-data-[size=xs]/avatar:text-sm",
        "group-data-[size=sm]/avatar:text-sm",
        "group-data-[size=md]/avatar:text-md",
        "group-data-[size=lg]/avatar:text-md",
        "group-data-[size=xl]/avatar:text-md",
        // Avatar rounded variant styles
        "group-data-[rounded=xs]/avatar:rounded-xs",
        "group-data-[rounded=sm]/avatar:rounded-sm",
        "group-data-[rounded=md]/avatar:rounded-md",
        "group-data-[rounded=lg]/avatar:rounded-lg",
        "group-data-[rounded=xl]/avatar:rounded-xl",
        "group-data-[rounded=full]/avatar:rounded-full",
      )}
      {...props}
    />
  );
}

export { AvatarFallback, avatarFallbackVariants };
export type { AvatarFallbackProps };

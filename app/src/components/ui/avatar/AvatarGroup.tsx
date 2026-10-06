import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const avatarGroupVariants = cva(
  "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
);

type AvatarGroupProps = React.ComponentProps<"div"> &
  VariantProps<typeof avatarGroupVariants>;

function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(avatarGroupVariants({ className }))}
      {...props}
    />
  );
}

export { AvatarGroup, avatarGroupVariants };
export type { AvatarGroupProps };

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar as AvatarPrimitive } from "radix-ui";

const avatarImageVariants = cva("aspect-square size-full object-cover");

type AvatarImageProps = React.ComponentProps<typeof AvatarPrimitive.Image> &
  VariantProps<typeof avatarImageVariants>;

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        avatarImageVariants({ className }),
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

export { AvatarImage, avatarImageVariants };
export type { AvatarImageProps };

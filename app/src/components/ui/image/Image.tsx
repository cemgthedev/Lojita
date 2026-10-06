import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

type ImageContextValue = {
  loaded: boolean;
  error: boolean;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageContext = React.createContext<ImageContextValue | null>(null);

function useImageContext() {
  const context = React.useContext(ImageContext);

  if (!context) {
    throw new Error("Image components must be used inside <Image />");
  }

  return context;
}

const imageVariants = cva("relative overflow-hidden select-none border", {
  variants: {
    size: {
      "5xl": "w-44 h-44",
      "4xl": "w-40 h-40",
      "3xl": "w-36 h-36",
      "2xl": "w-32 h-32",
      xl: "w-28 h-28",
      lg: "w-24 h-24",
      md: "w-20 h-20",
      sm: "w-16 h-16",
      xs: "w-12 h-12",
    },
    rounded: {
      full: "rounded-full after:rounded-full",
      xl: "rounded-xl after:rounded-xl",
      lg: "rounded-lg after:rounded-lg",
      md: "rounded-md after:rounded-md",
      sm: "rounded-sm after:rounded-sm",
      xs: "rounded-xs after:rounded-xs",
      none: "rounded-none after:rounded-none",
    },
    aspect: {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-3/4",
      auto: "",
    },
  },
  defaultVariants: {
    size: "md",
    rounded: "md",
    aspect: "square",
  },
});

type ImageProps = React.ComponentProps<"div"> &
  VariantProps<typeof imageVariants>;

function Image({
  className,
  rounded = "md",
  size = "md",
  aspect = "square",
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  return (
    <ImageContext.Provider
      value={{
        loaded,
        error,
        setLoaded,
        setError,
      }}
    >
      <div
        data-slot="image"
        data-loaded={loaded}
        data-error={error}
        className={cn(
          imageVariants({
            rounded,
            size,
            aspect,
            className,
          }),
        )}
        {...props}
      />
    </ImageContext.Provider>
  );
}

export { Image, imageVariants, useImageContext };
export type { ImageProps };

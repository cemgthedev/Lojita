import {
  Button,
  Field,
  FieldLabel,
  Image,
  ImageContent,
  ImageFallback,
  ImageSkeleton,
  Input,
  Message,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { ImagePlusIcon, Trash2Icon } from "lucide-react";
import { useRef } from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

type UploadImageProps = {
  value?: string;
  onChange: (image: string) => void;
  disabled?: boolean;
};

export function UploadImage({
  value,
  onChange,
  disabled = false,
}: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast("Selecione um arquivo de imagem.", { variant: "danger" });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast("A imagem deve ter no máximo 5 MB.", { variant: "danger" });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        toast("Não foi possível carregar a imagem.", { variant: "danger" });
        return;
      }

      onChange(reader.result);
    };
    reader.onerror = () => {
      toast("Não foi possível carregar a imagem.", { variant: "danger" });
    };
    reader.readAsDataURL(file);
  }

  return (
    <Field>
      <div>
        <FieldLabel htmlFor="profile-avatar">Foto de perfil</FieldLabel>
        <Message variant="muted">Formatos de imagem de até 2 MB.</Message>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Image rounded="lg" className="size-46 shrink-0">
          <ImageContent src={value} alt="Pré-visualização da foto de perfil" />
          <ImageSkeleton />
          <ImageFallback>
            <ImagePlusIcon aria-hidden="true" className="size-12" />
          </ImageFallback>
        </Image>
        <div className="space-y-2">
          <Input
            ref={inputRef}
            id="profile-avatar"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
            disabled={disabled}
          />
          {value && (
            <Button
              type="button"
              variant="danger-bordered"
              onClick={() => onChange("")}
              disabled={disabled}
              className="w-full max-w-50"
            >
              <Trash2Icon aria-hidden="true" size={20} />
              Remover imagem
            </Button>
          )}
          <Button
            type="button"
            variant="secondary-bordered"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="w-full max-w-50"
          >
            <ImagePlusIcon aria-hidden="true" size={20} />
            Escolher imagem
          </Button>
        </div>
      </div>
    </Field>
  );
}

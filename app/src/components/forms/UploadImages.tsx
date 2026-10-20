import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  Field,
  FieldLabel,
  Image,
  ImageContent,
  Input,
  Message,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  ImagesIcon,
  ImagePlusIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

type UploadImagesProps = {
  value: string[];
  onChange: (images: string[]) => void;
  disabled?: boolean;
  inputId?: string;
};

function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Não foi possível carregar a imagem."));
        return;
      }

      resolve(reader.result);
    };
    reader.onerror = () => reject(new Error("Não foi possível carregar a imagem."));
    reader.readAsDataURL(file);
  });
}

export function UploadImages({
  value,
  onChange,
  disabled = false,
  inputId = "product-images",
}: UploadImagesProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);

  async function addFiles(fileList: FileList | File[]) {
    if (isReading || disabled) return;
    const files = Array.from(fileList);
    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast(`"${file.name}" não é um arquivo de imagem.`, {
          variant: "danger",
        });
        continue;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        toast(`"${file.name}" ultrapassa o limite de 5 MB.`, {
          variant: "danger",
        });
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setIsReading(true);
    try {
      const images = await Promise.all(validFiles.map(readImage));
      onChange([...value, ...images]);
    } catch {
      toast("Não foi possível carregar uma ou mais imagens.", {
        variant: "danger",
      });
    } finally {
      setIsReading(false);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    event.target.value = "";
    if (files?.length) void addFiles(files);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (!disabled && event.dataTransfer.files.length) {
      void addFiles(event.dataTransfer.files);
    }
  }

  function removeImage(index: number) {
    onChange(value.filter((_, imageIndex) => imageIndex !== index));
  }

  return (
    <Field>
      <div>
        <FieldLabel htmlFor={inputId}>Imagens</FieldLabel>
        <Message variant="muted">
          Adicione imagens de até 5 MB cada.
        </Message>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_15rem]">
        <div
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex min-h-52 flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 text-center ${
            isDragging
              ? "border-primary bg-primary-50"
              : "border-secondary-600"
          }`}
        >
          <UploadIcon aria-hidden="true" className="size-8" />
          <div className="space-y-1">
            <Text>Arraste e solte as imagens aqui</Text>
            <Text size="sm" variant="secondary">
              ou escolha vários arquivos no seu dispositivo
            </Text>
          </div>
          <Input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled || isReading}
          />
          <Button
            type="button"
            variant="secondary-bordered"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || isReading}
          >
            <ImagePlusIcon aria-hidden="true" size={18} />
            Escolher imagens
          </Button>
        </div>

        <Card size="sm" rounded="lg">
          <CardContent className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <Text>Galeria</Text>
              <ImagesIcon aria-hidden="true" size={18} />
            </div>
            <div className="flex min-h-16 flex-1 items-center">
              {value.length > 0 ? (
                <div className="flex -space-x-2">
                  {value.slice(0, 4).map((image, index) => (
                    <Image
                      key={`${image.slice(0, 32)}-${index}`}
                      size="sm"
                      rounded="md"
                      className="size-12 border-2 border-background"
                    >
                      <ImageContent src={image} alt={`Imagem ${index + 1}`} />
                    </Image>
                  ))}
                  {value.length > 4 && (
                    <span className="grid size-12 place-items-center rounded-md border-2 border-background bg-muted text-xs">
                      +{value.length - 4}
                    </span>
                  )}
                </div>
              ) : (
                <Text size="sm" variant="secondary">
                  Nenhuma imagem adicionada.
                </Text>
              )}
            </div>
            <Button
              type="button"
              variant="secondary-bordered"
              className="w-full"
              onClick={() => setIsGalleryOpen(true)}
              disabled={value.length === 0 || isReading}
            >
              Abrir galeria ({value.length})
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogPrimitive.Title className="text-lg font-semibold">
              Galeria de imagens ({value.length})
            </DialogPrimitive.Title>
          </DialogHeader>
          {value.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {value.map((image, index) => (
                <div
                  key={`${image.slice(0, 32)}-${index}`}
                  className="space-y-2"
                >
                  <Image className="aspect-square w-full" rounded="md">
                    <ImageContent
                      src={image}
                      alt={`Imagem ${index + 1} do produto`}
                    />
                  </Image>
                  <Button
                    type="button"
                    variant="danger-bordered"
                    size="sm"
                    className="w-full"
                    onClick={() => removeImage(index)}
                    disabled={disabled || isReading}
                  >
                    <Trash2Icon aria-hidden="true" size={16} />
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <Text>Nenhuma imagem na galeria.</Text>
          )}
        </DialogContent>
      </Dialog>
    </Field>
  );
}

export function productReviewStatusLabel(status: string) {
  const labels: Record<string, string> = {
    active: "Publicada",
    visible: "Publicada",
    published: "Publicada",
    hidden: "Oculta",
    hide_requested: "Ocultação solicitada",
  };
  return labels[status] ?? status;
}

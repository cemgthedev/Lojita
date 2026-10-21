export function productReviewStatusLabel(status: string) {
  const labels: Record<string, string> = {
    active: "Publicada",
    visible: "Publicada",
    hidden: "Oculta",
    hide_requested: "Ocultação solicitada",
  };
  return labels[status] ?? status;
}

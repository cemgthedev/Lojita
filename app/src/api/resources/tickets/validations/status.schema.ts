export const TICKET_STATUS = {
  NEW: "new",
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  WAITING_CUSTOMER: "waiting_customer",
  RESOLVED: "resolved",
  CLOSED: "closed",
} as const;

export const TICKET_STATUS_LABEL = {
  [TICKET_STATUS.NEW]: "Novo",
  [TICKET_STATUS.OPEN]: "Aberto",
  [TICKET_STATUS.IN_PROGRESS]: "Em atendimento",
  [TICKET_STATUS.WAITING_CUSTOMER]: "Aguardando cliente",
  [TICKET_STATUS.RESOLVED]: "Resolvido",
  [TICKET_STATUS.CLOSED]: "Encerrado",
} as const;

export const TICKET_STATUS_VARIANT = {
  [TICKET_STATUS.NEW]: "muted",
  [TICKET_STATUS.OPEN]: "muted",
  [TICKET_STATUS.IN_PROGRESS]: "primary-ghost",
  [TICKET_STATUS.WAITING_CUSTOMER]: "warning-ghost",
  [TICKET_STATUS.RESOLVED]: "success-ghost",
  [TICKET_STATUS.CLOSED]: "success-ghost",
} as const;

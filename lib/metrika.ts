export const METRIKA_COUNTER_ID = 108712700;

export function reachGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as Window & { ym?: (...args: unknown[]) => void }).ym;
  ym?.(METRIKA_COUNTER_ID, "reachGoal", goal);
}

export const metrikaGoals = {
  contactForm: "contact_form_submit",
  telegramClick: "lead_telegram",
  auditClick: "lead_audit_click",
  /** Заявка с посадочной «Директор по маркетингу» — отдельная цель под трафик из Директа. */
  cmoForm: "cmo_form_submit",
} as const;

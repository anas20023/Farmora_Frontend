export type WorkflowStepIcon = "sensor" | "store" | "delivery";

export interface WorkflowBadgeItem {
  icon?: "clock" | "shield" | "qr" | "check";
  text: string;
}

export interface WorkflowStepItem {
  id: string;
  stepNumber: string;
  icon: WorkflowStepIcon;
  title: string;
  description: string;
  footerLeft: WorkflowBadgeItem;
  footerRight: string;
  tooltipDetail?: string;
}

export interface HowItWorksHeader {
  eyebrow: string;
  title: {
    line1: string;
    line2: string;
  };
  description: string;
  activeCycle: string;
}

export interface HowItWorksData {
  header: HowItWorksHeader;
  steps: WorkflowStepItem[];
}

export interface CtaBadge {
  label: string;
  iconName?: "gem" | "sprout" | "sparkles";
}

export interface CtaFeature {
  id: string;
  text: string;
  tooltipText?: string;
}

export interface CtaAction {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface GrowerTermItem {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

export interface CtaTermsModalData {
  title: string;
  subtitle: string;
  terms: GrowerTermItem[];
  escrowNote: string;
}

export interface CtaData {
  badge: CtaBadge;
  headline: string;
  highlightMargin: string; // e.g. "35%"
  description: string;
  features: CtaFeature[];
  primaryAction: CtaAction;
  secondaryAction: CtaAction;
  termsModal: CtaTermsModalData;
}

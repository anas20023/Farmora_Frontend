export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export type FooterBadgeIcon = "check" | "signal" | "escrow";

export interface FooterBadge {
  id: string;
  label: string;
  icon: FooterBadgeIcon;
  tooltip?: string;
  stat?: string;
}

export interface FooterMetadata {
  copyright: string;
  settlementCurrency: string;
  settlementRegions: string;
}

export interface FooterData {
  brand: {
    primaryName: string;
    secondaryName: string;
    description: string;
  };
  badges: FooterBadge[];
  sections: FooterSection[];
  metadata: FooterMetadata;
}

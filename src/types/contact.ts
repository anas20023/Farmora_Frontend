export type InquiryRole = "buyer" | "farmer" | "general";

export interface CustomerAddress {
  division: string;
  district: string;
  upazila: string;
  postalCode: string;
  streetAddress: string;
  area: string;
  country: string;
  landmark?: string;
}

export interface SupportChannelPhone {
  title: string;
  number: string;
  displayNumber: string;
  availability: string;
  badge?: string;
  isPrimary?: boolean;
}

export interface SupportChannelEmail {
  department: string;
  email: string;
  purpose: string;
  responseTime: string;
}

export interface BusinessWorkingHours {
  weekdays: {
    days: string;
    hours: string;
    status: string;
  };
  saturday: {
    days: string;
    hours: string;
    status: string;
  };
  friday: {
    days: string;
    hours: string;
    status: string;
  };
  timezone: string;
  note: string;
}

export interface OfficeLocation {
  id: string;
  name: string;
  hubType: "Headquarters" | "Agro-Cluster Hub" | "Regional Cold-Chain Hub";
  address: CustomerAddress;
  phone: string;
  email: string;
  hours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl: string;
  directionsUrl: string;
  activeSensorsMonitored: number;
}

export type FaqCategory = "all" | "ordering" | "verification" | "delivery" | "payments" | "telemetry";

export interface FaqItem {
  id: string;
  category: "ordering" | "verification" | "delivery" | "payments" | "telemetry";
  question: string;
  answer: string;
  highlight?: string;
}

export interface ContactPageData {
  hero: {
    badge: string;
    headline: {
      line1: string;
      line2: string;
    };
    description: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  phones: SupportChannelPhone[];
  emails: SupportChannelEmail[];
  workingHours: BusinessWorkingHours;
  offices: OfficeLocation[];
  faqs: FaqItem[];
}

export interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  role: InquiryRole;
  subject: string;
  message: string;
  urgency: "normal" | "urgent";
}

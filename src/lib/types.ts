export type DonationFrequency = "one-time" | "monthly";

export interface DonorProfile {
  fullName: string;
  email: string;
  country: string;
  anonymous: boolean;
  marketingOptIn: boolean;
}

export interface DonationIntentRequest {
  amount: number;
  currency: "USD";
  frequency: DonationFrequency;
  campaignId: string;
  donor: DonorProfile;
  note?: string;
}

export interface DonationIntentResponse {
  donationIntentId: string;
  status: "created" | "requires_action";
  checkoutUrl: string;
  message: string;
}

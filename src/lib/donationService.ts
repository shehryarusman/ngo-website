import { apiRequest } from "./apiClient";
import { appConfig } from "./config";
import type { DonationIntentRequest, DonationIntentResponse } from "./types";

function createMockIntent(
  payload: DonationIntentRequest
): Promise<DonationIntentResponse> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        donationIntentId: `demo_${Date.now().toString(36)}`,
        status: "created",
        checkoutUrl: "/donate",
        message: `Online giving is coming soon. To give $${payload.amount} now, please email info@arisegiving.org or mail a check to our headquarters.`,
      });
    }, 700);
  });
}

export async function createDonationIntent(
  payload: DonationIntentRequest
): Promise<DonationIntentResponse> {
  if (!appConfig.apiBaseUrl) {
    return createMockIntent(payload);
  }

  return apiRequest<DonationIntentResponse>("/donations/intents", {
    method: "POST",
    body: payload,
  });
}

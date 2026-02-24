import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BentoCard } from "../components/common/BentoCard";
import { ParallaxImage } from "../components/common/ParallaxImage";
import { createDonationIntent } from "../lib/donationService";
import type {
  DonationFrequency,
  DonationIntentResponse,
  DonorProfile,
} from "../lib/types";

const presetAmounts = [25, 50, 100, 250, 500];

const initialDonor: DonorProfile = {
  fullName: "",
  email: "",
  country: "",
  anonymous: false,
  marketingOptIn: false,
};

export function DonationPage() {
  const [frequency, setFrequency] = useState<DonationFrequency>("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [campaignId, setCampaignId] = useState("healthcare");
  const [note, setNote] = useState("");
  const [donor, setDonor] = useState<DonorProfile>(initialDonor);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DonationIntentResponse | null>(null);

  const activeAmount = useMemo(() => {
    const parsedCustom = Number(customAmount);
    if (Number.isFinite(parsedCustom) && parsedCustom > 0) {
      return parsedCustom;
    }
    return selectedAmount;
  }, [customAmount, selectedAmount]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setResult(null);

    if (activeAmount < 5) {
      setError("Minimum donation amount is $5.");
      return;
    }

    if (!donor.fullName.trim() || !donor.email.trim() || !donor.country.trim()) {
      setError("Please complete all required donor fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createDonationIntent({
        amount: activeAmount,
        currency: "USD",
        frequency,
        campaignId,
        donor,
        note: note.trim() || undefined,
      });
      setResult(response);
    } catch (submissionError) {
      const fallbackMessage = "Unable to create donation intent.";
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : fallbackMessage
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-container donation-page">
      <section className="bento-grid donation-hero">
        <BentoCard className="donation-copy reveal">
          <p className="eyebrow">Donation Center</p>
          <h1>Secure giving, built for real API integration.</h1>
          <p>
            This donation page is ready for backend connection using
            `VITE_API_BASE_URL`. Without it, a realistic mock flow keeps front
            end development moving.
          </p>
          <div className="button-row">
            <Link to="/" className="btn btn-soft">
              Back To Home
            </Link>
            <Link to="/impact" className="btn btn-primary">
              View Impact
            </Link>
          </div>
        </BentoCard>
        <BentoCard className="donation-trust reveal">
          <h3>Trust Signals</h3>
          <ul>
            <li>Quarterly public financial audits</li>
            <li>Campaign-level allocation tracking</li>
            <li>API-ready donation intent architecture</li>
            <li>Secure checkout handoff compatibility</li>
          </ul>
        </BentoCard>
        <BentoCard className="donation-media reveal">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1800&q=88"
            alt="Field healthcare support"
            intensity={14}
          />
        </BentoCard>
      </section>

      <form className="bento-grid donation-layout" onSubmit={handleSubmit}>
        <BentoCard className="donation-panel reveal">
          <p className="eyebrow">1. Frequency</p>
          <div className="toggle-row">
            <button
              type="button"
              className={frequency === "monthly" ? "chip active" : "chip"}
              onClick={() => setFrequency("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={frequency === "one-time" ? "chip active" : "chip"}
              onClick={() => setFrequency("one-time")}
            >
              One-time
            </button>
          </div>
        </BentoCard>

        <BentoCard className="donation-panel reveal">
          <p className="eyebrow">2. Amount (USD)</p>
          <div className="amount-grid">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className={activeAmount === amount ? "chip active" : "chip"}
                onClick={() => {
                  setCustomAmount("");
                  setSelectedAmount(amount);
                }}
              >
                ${amount}
              </button>
            ))}
          </div>
          <label className="input-block">
            Custom amount
            <input
              type="number"
              min="5"
              step="1"
              value={customAmount}
              onChange={(event) => setCustomAmount(event.target.value)}
              placeholder="Enter custom amount"
            />
          </label>
        </BentoCard>

        <BentoCard className="donation-panel reveal">
          <p className="eyebrow">3. Campaign</p>
          <label className="input-block">
            Allocation
            <select
              value={campaignId}
              onChange={(event) => setCampaignId(event.target.value)}
            >
              <option value="healthcare">Healthcare Access</option>
              <option value="education">Education Equity</option>
              <option value="livelihoods">Livelihood Growth</option>
              <option value="water">Clean Water Infrastructure</option>
              <option value="emergency">Emergency Response</option>
            </select>
          </label>
          <label className="input-block">
            Note (optional)
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Share donor note or campaign preference"
              rows={4}
            />
          </label>
        </BentoCard>

        <BentoCard className="donation-panel reveal">
          <p className="eyebrow">4. Donor Profile</p>
          <label className="input-block">
            Full name
            <input
              type="text"
              required
              value={donor.fullName}
              onChange={(event) =>
                setDonor((previous) => ({
                  ...previous,
                  fullName: event.target.value,
                }))
              }
            />
          </label>
          <label className="input-block">
            Email
            <input
              type="email"
              required
              value={donor.email}
              onChange={(event) =>
                setDonor((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
            />
          </label>
          <label className="input-block">
            Country
            <input
              type="text"
              required
              value={donor.country}
              onChange={(event) =>
                setDonor((previous) => ({
                  ...previous,
                  country: event.target.value,
                }))
              }
            />
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={donor.anonymous}
              onChange={(event) =>
                setDonor((previous) => ({
                  ...previous,
                  anonymous: event.target.checked,
                }))
              }
            />
            Donate anonymously
          </label>
          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={donor.marketingOptIn}
              onChange={(event) =>
                setDonor((previous) => ({
                  ...previous,
                  marketingOptIn: event.target.checked,
                }))
              }
            />
            Receive monthly impact updates
          </label>
        </BentoCard>

        <BentoCard className="donation-summary reveal">
          <p className="eyebrow">Summary</p>
          <h2>
            ${activeAmount} / {frequency === "monthly" ? "month" : "one-time"}
          </h2>
          <p>Campaign: {campaignId}</p>
          <p>
            Next step: Create donation intent, then redirect to your secure
            payment processor checkout.
          </p>
          <button className="btn btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Preparing Checkout..." : "Continue To Secure Checkout"}
          </button>
          {error ? <p className="form-feedback error">{error}</p> : null}
          {result ? (
            <p className="form-feedback success">
              {result.message} Intent ID: {result.donationIntentId}
            </p>
          ) : null}
        </BentoCard>
      </form>
    </main>
  );
}

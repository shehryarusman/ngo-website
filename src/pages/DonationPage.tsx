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
  const [campaignId, setCampaignId] = useState("general-support");
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
          <h1>Support science and arts education.</h1>
          <p>
            ARISE Foundation is a 501(c)(3) public charity. Contributions are
            tax-deductible to the extent allowed by law.
          </p>
          <div className="button-row">
            <Link to="/" className="btn btn-soft">
              Back To Home
            </Link>
            <Link to="/impact" className="btn btn-primary">
              View How We Work
            </Link>
          </div>
        </BentoCard>
        <BentoCard className="donation-trust reveal">
          <h3>Other Ways To Give</h3>
          <ul>
            <li>By check to ARISE Foundation, 1427 Byberry Rd, Huntingdon Valley, PA 19006</li>
            <li>Through a donor-advised fund</li>
            <li>Questions and receipts: info@arisegiving.org</li>
          </ul>
        </BentoCard>
        <BentoCard className="donation-media reveal">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=84"
            alt="Science laboratory workspace"
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
              aria-pressed={frequency === "monthly"}
              onClick={() => setFrequency("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={frequency === "one-time" ? "chip active" : "chip"}
              aria-pressed={frequency === "one-time"}
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
                aria-pressed={activeAmount === amount}
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
              <option value="general-support">General Support</option>
              <option value="research-internship">Research Internships</option>
              <option value="fellowships">Graduate and Postdoctoral Fellowships</option>
              <option value="travel-grants">Travel Grants</option>
              <option value="arts-programs">Arts Education and Exhibitions</option>
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
          <p>
            Online giving is coming soon. In the meantime, you can give by
            check or through a donor-advised fund.
          </p>
          <button className="btn btn-primary submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Checking..." : "Continue"}
          </button>
          {error ? <p className="form-feedback error">{error}</p> : null}
          {result ? (
            <p className="form-feedback success">
              {result.message}
            </p>
          ) : null}
        </BentoCard>
      </form>

      <p className="legal-disclosure">
        The official registration and financial information of ARISE
        Foundation may be obtained from the Pennsylvania Department of State by
        calling toll-free, within Pennsylvania, 1 (800) 732-0999. Registration
        does not imply endorsement.
      </p>
    </main>
  );
}

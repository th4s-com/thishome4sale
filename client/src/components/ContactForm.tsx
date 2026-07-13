/**
 * RENOVATION LEDGER CONTACT FORM
 * Quiet, exact, and property-specific: fields follow the site's architectural
 * rule system while the green action is reserved for a confirmed inquiry.
 */

import { listing } from "@/content/listing";
import { AlertTriangle, ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const formReady = listing.contact.web3formsAccessKey.trim().length > 0;

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formReady) {
      setStatus("error");
      setMessage("The inquiry form is being connected. Please check back shortly.");
      return;
    }

    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    try {
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The inquiry could not be sent.");
      }

      form.reset();
      setStatus("success");
      setMessage("Your inquiry was sent to the owner. Thank you.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The inquiry could not be sent. Please try again.");
    }
  };

  return (
    <form className="contact-form" onSubmit={submitInquiry}>
      <input type="hidden" name="access_key" value={listing.contact.web3formsAccessKey} />
      <input type="hidden" name="subject" value={listing.contact.subject} />
      <input type="hidden" name="from_name" value="ThisHome4Sale.com" />
      <div className="contact-form__botcheck" aria-hidden="true">
        <label htmlFor="company-website">Leave this field empty</label>
        <input id="company-website" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__grid">
        <label>
          <span>Name *</span>
          <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Email *</span>
          <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="(314) 555-0123" />
        </label>
        <label>
          <span>I'm interested in</span>
          <select name="interest" defaultValue="Scheduling a private showing">
            <option>Scheduling a private showing</option>
            <option>Submitting an offer</option>
            <option>Asking a property question</option>
            <option>Open house information</option>
          </select>
        </label>
        <label className="contact-form__message">
          <span>Message *</span>
          <textarea name="message" required rows={5} placeholder="Tell the owner how they can help." />
        </label>
      </div>

      <div className="contact-form__footer">
        <p>Your details are used only to respond to this property inquiry.</p>
        <button className="button button--green" type="submit" disabled={status === "submitting" || !formReady}>
          {status === "submitting" ? (
            <>Sending inquiry <LoaderCircle className="contact-form__spinner" size={17} /></>
          ) : !formReady ? (
            <>Form connection pending</>
          ) : (
            <>Send inquiry <ArrowUpRight size={17} /></>
          )}
        </button>
      </div>

      {message && (
        <div className={`contact-form__notice contact-form__notice--${status}`} role="status" aria-live="polite">
          {status === "success" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}

"use client";

import { useState, FormEvent } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="sec-eyebrow">Contact</div>
      <div className="sec-title">Get in touch</div>
      <div className="contact-grid">
        <div>
          <p className="contact-text">
            Looking for junior network engineer, network technician, data centre,
            IT support, or cloud roles. Based in Dublin and open to entry-level positions.
          </p>
          <div className="contact-links">
            <a
              className="clink"
              href="https://linkedin.com/in/kimutai-fredrick"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 linkedin.com/in/kimutai-fredrick
            </a>
            <a
              className="clink"
              href="https://github.com/kkfred202"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐙 github.com/kkfred202
            </a>
            <a className="clink" href="mailto:kkfred202@gmail.com">
              ✉ kkfred202@gmail.com
            </a>
          </div>
        </div>

        <form className="form-stack" onSubmit={handleSubmit} noValidate>
          <input
            className="finput"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Your name"
          />
          <input
            className="finput"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />
          <textarea
            className="finput"
            rows={4}
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            aria-label="Message"
          />
          <button
            className="btn-dark"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send message ↗"}
          </button>
          {status === "success" && (
            <p className="form-status success">Message sent — I&apos;ll be in touch!</p>
          )}
          {status === "error" && (
            <p className="form-status error">Something went wrong. Try emailing directly.</p>
          )}
        </form>
      </div>
    </section>
  );
}

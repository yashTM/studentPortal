"use client";

import { CircleCheck } from "lucide-react";
import { useId, useState } from "react";

/** Mock newsletter signup: validates the format only. The address is never stored or sent. */
export default function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Enter a valid email address.");
    setError("");
    setDone(true);
    setEmail("");
  };

  if (done)
    return (
      <p role="status" className="flex items-center gap-2 text-sm font-medium text-white">
        <CircleCheck aria-hidden className="h-5 w-5 text-accent" />
        Thanks. This is a demo form, so nothing was sent or stored.
      </p>
    );

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-md">
      <label htmlFor={id} className="sr-only">Email address</label>
      <div className="flex gap-2">
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className="h-11 min-w-0 flex-1 rounded-full border border-white/25 bg-white/10 px-4 text-sm text-white placeholder:text-white/55 outline-none focus:border-accent focus:ring-4 focus:ring-accent/25"
        />
        <button type="submit" className="h-11 shrink-0 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground hover:bg-gold-300">Subscribe</button>
      </div>
      {error && <p id={`${id}-err`} role="alert" className="mt-2 text-xs font-medium text-gold-200">{error}</p>}
    </form>
  );
}

"use client";

import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { topics } from "@/data/site/contact";
import { CheckField, SelectField, TextAreaField, TextField } from "@/components/shared/FormControls";
import Button from "@/components/ui/Button";

type Form = { name: string; email: string; phone: string; topic: string; message: string; consent: boolean };
const empty: Form = { name: "", email: "", phone: "", topic: "", message: "", consent: false };

/** Mock contact form: validated on the client, never sent or stored. */
export default function ContactForm() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const set = <K extends keyof Form>(k: K) => (v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!form.name.trim()) err.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) err.email = "Enter a valid email address.";
    if (form.phone.trim() && !/^\+?[0-9 ]{10,14}$/.test(form.phone.trim())) err.phone = "Enter a valid phone number or leave it blank.";
    if (!form.topic) err.topic = "Choose a topic.";
    if (form.message.trim().length < 10) err.message = "Tell us a little more (at least 10 characters).";
    if (!form.consent) err.consent = "Please agree so we can reply to you.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent(true);
      setForm(empty);
    }, 1100);
  };

  if (sent)
    return (
      <div role="status" className="rounded-lg border border-success/30 bg-success-bg/60 p-8">
        <CircleCheck aria-hidden className="h-9 w-9 text-success" strokeWidth={1.5} />
        <h2 className="mt-3 text-2xl">Thanks, we will reply within 2 working days.</h2>
        <p className="mt-2 text-sm text-subtle">This is a demo form and nothing was sent or stored.</p>
        <Button variant="secondary" className="mt-5" onClick={() => setSent(false)}>Send another message</Button>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" value={form.name} onChange={set("name")} autoComplete="name" error={errors.name} />
        <TextField label="Email" type="email" value={form.email} onChange={set("email")} autoComplete="email" error={errors.email} />
        <TextField label="Phone (optional)" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+91 98765 43210" error={errors.phone} />
        <SelectField label="Topic" value={form.topic} onChange={set("topic")} options={topics} error={errors.topic} />
      </div>
      <TextAreaField label="Message" value={form.message} onChange={set("message")} error={errors.message} />
      <CheckField label="I agree to be contacted about my enquiry. (Demo: nothing is stored.)" checked={form.consent} onChange={set("consent")} error={errors.consent} />
      <Button type="submit" size="lg" loading={busy}>{busy ? "Sending" : "Send message"}</Button>
    </form>
  );
}

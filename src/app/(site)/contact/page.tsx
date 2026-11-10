import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { address, faqs, officeHours, offices } from "@/data/site/contact";
import Accordion from "@/components/site/Accordion";
import ContactForm from "@/components/site/ContactForm";
import MapPlaceholder from "@/components/site/MapPlaceholder";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";

export const metadata: Metadata = { title: "Contact", description: "Contact the Horizon University admissions, support and finance offices." };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact" description="Questions about admissions, fees or the portal? We are happy to help." />

      <section aria-labelledby="touch-h" className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Get in touch" title="Send us a message" />
            <span id="touch-h" className="sr-only">Contact form</span>
            <div className="mt-8"><ContactForm /></div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={1}>
              <h2 className="text-2xl">Our offices</h2>
              <ul className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
                {offices.map((o) => (
                  <li key={o.name} className="p-5">
                    <h3 className="text-lg">{o.name}</h3>
                    <p className="text-[13px] text-subtle">{o.note}</p>
                    <p className="mt-3 flex items-center gap-2 text-sm"><Mail aria-hidden className="h-4 w-4 text-gold-700" /><a href={`mailto:${o.email}`} className="text-primary underline-offset-4 hover:underline">{o.email}</a></p>
                    <p className="mt-1.5 flex items-center gap-2 text-sm"><Phone aria-hidden className="h-4 w-4 text-gold-700" />{o.phone}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={2} className="rounded-lg border border-line bg-surface p-5">
              <h2 className="flex items-center gap-2 text-lg"><Clock aria-hidden className="h-5 w-5 text-gold-700" /> Office hours</h2>
              <dl className="mt-3 space-y-1.5 text-sm">
                {officeHours.map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-4"><dt className="text-subtle">{d}</dt><dd className="tnum text-right font-medium">{h}</dd></div>
                ))}
              </dl>
              <h2 className="mt-5 flex items-center gap-2 text-lg"><MapPin aria-hidden className="h-5 w-5 text-gold-700" /> Address</h2>
              <address className="mt-2 text-sm not-italic text-n-700">{address.map((l) => <span key={l} className="block">{l}</span>)}</address>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Campus map" className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5"><Reveal><MapPlaceholder /></Reveal></div>
      </section>

      <section aria-labelledby="faq-h" className="bg-muted/60 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal><SectionHeading eyebrow="FAQ" title="Common admission questions" /></Reveal>
          <span id="faq-h" className="sr-only">Frequently asked questions</span>
          <Reveal delay={1} className="mt-8"><Accordion items={faqs} /></Reveal>
        </div>
      </section>
    </>
  );
}

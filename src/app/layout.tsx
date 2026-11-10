import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Source_Serif_4 } from "next/font/google";
import { branding } from "@/config/branding";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

// Display: Source Serif 4 (a classic serif that sits well beside the logo wordmark). Body: Manrope. Mono: IBM Plex Mono for IDs.
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const display = Source_Serif_4({ variable: "--font-display", subsets: ["latin"], axes: ["opsz"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["500", "600"] });

export const metadata: Metadata = {
  // Placeholder origin for resolving social images. Set the real site URL when this is deployed.
  metadataBase: new URL("http://localhost:3000"),
  title: { default: `${branding.name} ${branding.portalName}`, template: `%s | ${branding.name}` },
  description: `${branding.name}: admissions, enrollment, courses and campus life. ${branding.tagline}`,
  applicationName: `${branding.name} ${branding.portalName}`,
  openGraph: { siteName: branding.name, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${display.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

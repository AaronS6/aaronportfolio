import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";

// Use system fonts instead of next/font/google (which requires network access)
// Geist is the default Next.js font, loaded via CSS variables in globals.css

export const metadata: Metadata = {
  title: "Aaron Shan — Student, builder, designer & coder",
  description:
    "Aaron Shan is a student at Burnaby North who loves building things — design, code, debate, STEM tutoring, and community work.",
  keywords: [
    "Aaron Shan",
    "Burnaby North",
    "student portfolio",
    "designer",
    "developer",
    "STEM",
    "debate",
  ],
  authors: [{ name: "Aaron Shan" }],
  creator: "Aaron Shan",
  openGraph: {
    title: "Aaron Shan — Student, builder, designer & coder",
    description:
      "Student at Burnaby North who loves building things — design, code, debate, STEM, community.",
    type: "website",
    locale: "en_CA",
    siteName: "Aaron Shan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaron Shan — Student, builder, designer & coder",
    description:
      "Student at Burnaby North who loves building things — design, code, debate, STEM, community.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0b0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aaron Shan",
  jobTitle: "Student",
  description:
    "Student at Burnaby North who loves building things — design, code, debate, STEM tutoring, and community work.",
  alumniOf: {
    "@type": "School",
    name: "Burnaby North Secondary",
  },
  knowsAbout: [
    "Design",
    "Web development",
    "Python",
    "STEM education",
    "Debate",
    "Community leadership",
  ],
  sameAs: ["https://www.instagram.com/aaronsrr_/"],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";

import Button from "../layout/Button";
import PageContainer from "../layout/PageContainer";
import Image from "next/legacy/image";
import DashboardImage from "../../public/images/dashboard.png";
import Link from "next/link";

const faqs = [
  {
    q: "Do I need an account?",
    a: "No. Just pick a book and go. No sign-up, no email, no password required.",
  },
  {
    q: "Where does the data come from?",
    a: "Search runs on Open Library, a free, open catalog. Recommendations come from the 2.1 million of its books we've embedded for similarity search.",
  },
  {
    q: "How are recommendations chosen?",
    a: "Each book is turned into an embedding from its title, author, and subjects, and we return the nearest books to your pick. Each card says why: the same author, shared subjects, or how close the match is.",
  },
  {
    q: "Is Book Rec really free?",
    a: "Yes, always. No premium tiers, no trials, no payment details required.",
  },
  {
    q: "How fast are results?",
    a: "Usually a few seconds. The first search after a quiet spell can take longer while the server wakes up.",
  },
  {
    q: "Can I save my picks?",
    a: "Not yet. Your recent picks are remembered in this browser only.",
  },
];

const LandingCTA = () => {
  return (
    <>
      {/* Product walkthrough */}
      <section
        id="how-it-works"
        className="py-16 md:py-24 bg-surface relative overflow-hidden scroll-mt-24"
      >
        <PageContainer className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="lg:w-1/2 relative z-10 md:pr-8">
            <span className="inline-block text-accent-ink text-sm font-semibold uppercase tracking-widest mb-4">
              In action
            </span>
            <h2 className="text-4xl font-semibold text-primary mb-6 leading-tight">
              Find books you&apos;ll actually love
            </h2>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              Search by title or author, pick a book, and see recommendations
              found by similarity search over 2.1 million books. Every suggestion
              says why it came up, so you can judge the fit.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Search any title or author in Open Library",
                "Recommendations ranked by embedding similarity",
                "A reason for every suggestion",
                "Recent picks remembered in your browser",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-baseline">
              <Link href="/recommendations">
                <Button variant="accent">Get book recommendations</Button>
              </Link>
              <Link
                href="/dashboard"
                className="text-muted hover:text-accent font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
              >
                Returning? Go to dashboard
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <p className="text-sm font-medium text-slate-500 mb-3">
              Your reading hub: recent picks and one-click recommendations
            </p>
            <div className="relative group rounded-xl overflow-hidden shadow-xl ring-1 ring-slate-900/10">
              <Image
                src={DashboardImage}
                alt="Book Rec dashboard showing search, recent reads, and links to get similar books"
                className="transform transition-all duration-500 group-hover:scale-[1.02]"
                width={800}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" aria-hidden />
            </div>
          </div>
        </PageContainer>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-surface to-white" />
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-surface border-t border-slate-200">
        <PageContainer>
          <div className="text-center mb-12">
            <span className="inline-block text-accent-ink text-sm font-semibold uppercase tracking-widest mb-3">
              Common questions
            </span>
            <h2 className="text-3xl font-semibold text-primary">
              Everything you need to know
            </h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-l-2 border-accent/30 pl-5">
                <dt className="font-semibold text-primary mb-2">{q}</dt>
                <dd className="text-slate-500 text-sm leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </PageContainer>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(20,184,166,0.12) 0%, transparent 70%)",
          }}
          aria-hidden
        />
        {/* Decorative top edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden />

        <PageContainer className="relative z-10 text-center">
          <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Start now
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
            Ready to discover your<br className="hidden sm:block" /> next favorite book?
          </h2>
          <p className="text-base text-slate-300 mb-2 max-w-md mx-auto leading-relaxed">
            See why each book was chosen—then find your next favorite read in
            minutes.
          </p>
          <p className="text-sm text-slate-500 mb-10">
            No account required. Nothing about you is stored. Free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/recommendations">
              <Button variant="accent" size="large" className="shadow-xl shadow-accent/20">
                Get book recommendations
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="large"
                className="!bg-white !border-2 !border-white text-primary shadow-lg shadow-black/10 hover:!bg-primary hover:!border-primary hover:text-primary-foreground"
              >
                View dashboard
              </Button>
            </Link>
          </div>
          {/* Powered by badge */}
          <p className="mt-10 text-slate-600 text-xs flex items-center justify-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Powered by{" "}
            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-400 transition-colors"
            >
              Open Library
            </a>
          </p>
        </PageContainer>
      </section>
    </>
  );
};

export default LandingCTA;

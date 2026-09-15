import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  Monitor,
  Smartphone,
  Database,
  Plug,
  ArrowRight,
  Code2,
  Send,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  CheckCircle2,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  PenLine,
  Rocket,
  HeartHandshake,
} from "lucide-react";

import { useTheme } from "../lib/use-theme";
import { useLanguage, type Lang } from "../lib/i18n";
import { loadPortfolioData, defaultPortfolioData, type BotProject, type BotMessage } from "../lib/portfolio-store";

import projectFood from "../assets/project-food.jpg";
import projectBarber from "../assets/project-barber.jpg";
import projectCrm from "../assets/project-crm.jpg";
import projectBooking from "../assets/project-booking.jpg";
import projectConstruction from "../assets/project-construction.jpg";
import projectMonolith from "../assets/project-monolith.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Voloshyn — Full-Stack Developer & Automation Expert" },
      {
        name: "description",
        content:
          "I design fast landing pages, engineer complex Telegram Web Apps, and integrate APIs to automate your business processes.",
      },
      {
        property: "og:title",
        content: "Alex Voloshyn — Full-Stack Developer & Automation Expert",
      },
      {
        property: "og:description",
        content:
          "Fast landing pages, complex Telegram Web Apps, and seamless API automation for your business.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TELEGRAM_USERNAME = "tugar1n11";
const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;
const EMAIL_ADDRESS = "hello@example.com";

function telegramLink(message: string) {
  return `${TELEGRAM_URL}?text=${encodeURIComponent(message)}`;
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

const stagger = (i: number, base = 0.08) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: i * base },
});

// ---------------------------------------------------------------------------
// Shared UI
// ---------------------------------------------------------------------------
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-primary"
    />
  );
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "uk", label: "UK" },
  { code: "ru", label: "RU" },
];

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <Globe className="h-4 w-4 text-muted-foreground" />
        {LANG_OPTIONS.map((o) => (
          <button
            key={o.code}
            type="button"
            onClick={() => setLang(o.code)}
            className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
              lang === o.code
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-input px-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">{lang.toUpperCase()}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 min-w-[80px] overflow-hidden rounded-xl border border-border bg-background/95 shadow-lg backdrop-blur-xl">
            {LANG_OPTIONS.map((o) => (
              <button
                key={o.code}
                type="button"
                onClick={() => { setLang(o.code); setOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors hover:bg-secondary hover:text-primary ${
                  lang === o.code ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("navServices"), href: "#services" },
    { label: t("navWork"), href: "#work" },
    { label: t("navCalc"), href: "#calculator" },
    { label: t("navFaq"), href: "#faq" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4">
        <a href="#" className="truncate text-lg font-semibold tracking-tight text-foreground">
          Alex<span className="text-primary">.</span>Voloshyn
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary font-medium"
            >
              {l.label}
            </a>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={telegramLink(t("navPrefill"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03] shadow-sm shadow-primary/10"
          >
            <Send className="h-3.5 w-3.5" />
            {t("navCta")}
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 justify-self-end md:hidden">
          <a
            href={telegramLink(t("navPrefill"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-primary-foreground shadow-sm shadow-primary/20"
          >
            <Send className="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="hidden sm:inline">{t("navCta")}</span>
            <span className="sm:hidden">Telegram</span>
          </a>
          <button className="p-1 text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <ScrollProgress />
      {/* Mobile Burger Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 h-[calc(100vh-72px)] md:hidden"
          >
            <div className="flex flex-col p-6 pb-8 h-full bg-background/95 backdrop-blur-3xl border-b border-border shadow-2xl">
              <div className="flex flex-col gap-6 mt-8">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl font-bold text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-8 flex flex-col gap-6 border-t border-border/50 pt-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Language</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.15] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.75 0.15 92), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.70 0.18 260), transparent 70%)" }}
      />
      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-20">
        <motion.p {...stagger(0)} className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-primary">
          {t("heroTagline")}
        </motion.p>

        <motion.h1
          {...stagger(1)}
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {(() => {
            const heading = t("heroHeading");
            const dotSpace = heading.indexOf(". ");
            if (dotSpace !== -1) {
              return (
                <>
                  {heading.slice(0, dotSpace + 1)}{" "}
                  <span className="text-primary">{heading.slice(dotSpace + 2).trim()}</span>
                </>
              );
            }
            const lastAmp = heading.lastIndexOf("&");
            if (lastAmp !== -1) {
              return (
                <>
                  {heading.slice(0, lastAmp + 1)}{" "}
                  <span className="text-primary">{heading.slice(lastAmp + 2).trim()}</span>
                </>
              );
            }
            const lastComma = heading.lastIndexOf(",");
            if (lastComma !== -1) {
              return (
                <>
                  {heading.slice(0, lastComma + 1)}{" "}
                  <span className="text-primary">{heading.slice(lastComma + 2).trim()}</span>
                </>
              );
            }
            return heading;
          })()}
        </motion.h1>

        <motion.p {...stagger(2)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {t("heroDescription")}
        </motion.p>

        <motion.div {...stagger(3)} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            {t("heroCta1")}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-input px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Send className="h-4 w-4" />
            {t("heroCta2")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// TechTicker
// ---------------------------------------------------------------------------
function TechTicker() {
  const { t } = useLanguage();
  const items = t("techTicker").split(" · ");
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-border bg-secondary/40 py-4 overflow-hidden">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-medium text-muted-foreground shrink-0">
            <span className="mr-10 text-primary">·</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Why Me
// ---------------------------------------------------------------------------
function WhyMe() {
  const { t } = useLanguage();

  const reasons = [
    { emoji: "⚡", title: t("why1Title"), desc: t("why1Desc"), accent: "oklch(0.88 0.08 92)" },
    { emoji: "🧱", title: t("why2Title"), desc: t("why2Desc"), accent: "oklch(0.80 0.12 260)" },
    { emoji: "🎯", title: t("why3Title"), desc: t("why3Desc"), accent: "oklch(0.80 0.14 145)" },
    { emoji: "💰", title: t("why4Title"), desc: t("why4Desc"), accent: "oklch(0.80 0.14 60)" },
    { emoji: "🤖", title: t("why5Title"), desc: t("why5Desc"), accent: "oklch(0.75 0.16 300)" },
    { emoji: "🛟", title: t("why6Title"), desc: t("why6Desc"), accent: "oklch(0.75 0.15 20)" },
  ];

  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <motion.p {...fadeUp} className="mb-3 text-sm font-medium tracking-[0.2em] uppercase text-primary">
          {t("whyLabel")}
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {t("whyHeading")}
        </motion.h2>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              {...stagger(i, 0.08)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_16px_40px_-12px_oklch(0.88_0.08_92/0.18)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
                style={{ background: `radial-gradient(circle, ${r.accent}, transparent 70%)` }}
              />
              <span className="mb-3 sm:mb-4 block text-2xl sm:text-3xl">{r.emoji}</span>
              <h3 className="text-sm sm:text-base font-semibold text-foreground">{r.title}</h3>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Monitor,
      title: t("service1Title"),
      description: t("service1Desc"),
      bullets: [t("service1B1"), t("service1B2"), t("service1B3")],
      color: "oklch(0.88 0.08 92)",
    },
    {
      icon: Smartphone,
      title: t("service2Title"),
      description: t("service2Desc"),
      bullets: [t("service2B1"), t("service2B2"), t("service2B3")],
      color: "oklch(0.80 0.12 260)",
    },
    {
      icon: Database,
      title: t("service3Title"),
      description: t("service3Desc"),
      bullets: [t("service3B1"), t("service3B2"), t("service3B3")],
      color: "oklch(0.80 0.14 145)",
    },
    {
      icon: Plug,
      title: t("service4Title"),
      description: t("service4Desc"),
      bullets: [t("service4B1"), t("service4B2"), t("service4B3")],
      color: "oklch(0.80 0.14 20)",
    },
  ];

  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32">
      <motion.p {...fadeUp} className="mb-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
        {t("servicesLabel")}
      </motion.p>
      <motion.h2
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.05 }}
        className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
      >
        {t("servicesHeading")}
      </motion.h2>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            {...stagger(i, 0.09)}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_oklch(0.88_0.08_92/0.2)]"
          >
            {/* Glow blob on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
              style={{ background: `radial-gradient(circle, ${s.color}, transparent 70%)` }}
            />
            <div className="mb-5 inline-flex rounded-xl bg-secondary p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------
function Process() {
  const { t, lang } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { icon: ClipboardList, title: t("step1Title"), desc: t("step1Desc"), num: "01", deliv: t("proc1Deliv") },
    { icon: PenLine,       title: t("step2Title"), desc: t("step2Desc"), num: "02", deliv: t("proc2Deliv") },
    { icon: Code2,         title: t("step3Title"), desc: t("step3Desc"), num: "03", deliv: t("proc3Deliv") },
    { icon: Rocket,        title: t("step4Title"), desc: t("step4Desc"), num: "04", deliv: t("proc4Deliv") },
  ];

  return (
    <section id="process" className="scroll-mt-24 border-t border-border bg-secondary/20">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <motion.p {...fadeUp} className="mb-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
          {t("processLabel")}
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
        >
          {t("processHeading")}
        </motion.h2>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute top-8 left-8 right-8 hidden h-px bg-border lg:block"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.88 0.08 92 / 0.4) 20%, oklch(0.88 0.08 92 / 0.4) 80%, transparent)",
            }}
          />

          <div className="grid gap-10 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                {...stagger(i, 0.12)}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className="relative flex flex-col items-start lg:items-center p-4 rounded-2xl border border-transparent hover:border-border hover:bg-secondary/40 transition-all duration-300 cursor-pointer hover:scale-[1.02] group select-none"
              >
                {/* Step circle */}
                <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-[0_0_20px_oklch(0.88_0.08_92/0.25)] group-hover:border-primary group-hover:shadow-[0_0_25px_oklch(0.88_0.08_92/0.45)] transition-all">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground lg:text-center group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground lg:text-center">{s.desc}</p>
                
                <span className="mt-3 text-[10px] font-bold text-primary/70 uppercase tracking-widest transition-colors group-hover:text-primary">
                  {activeStep === i
                    ? (lang === "uk" ? "Приховати ▲" : lang === "ru" ? "Скрыть ▲" : "Hide ▲")
                    : (lang === "uk" ? "Деталі результату ▼" : lang === "ru" ? "Детали результата ▼" : "Deliverables ▼")
                  }
                </span>

                <AnimatePresence initial={false}>
                  {activeStep === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="mt-4 w-full rounded-xl bg-primary/5 border border-primary/15 p-3 text-xs text-primary leading-relaxed lg:text-center overflow-hidden"
                    >
                      <p className="font-bold mb-1 uppercase tracking-wider text-[9px] text-primary/65">
                        {lang === "uk" ? "Що ви отримуєте:" : lang === "ru" ? "Что вы получаете:" : "What you get:"}
                      </p>
                      {s.deliv}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// PhoneMockup Sandbox
// ---------------------------------------------------------------------------
interface PhoneMockupProps {
  bot: BotProject;
  getVal: (field: any) => string;
  lang: string;
  t: (key: any) => string;
}

function PhoneMockup({ bot, getVal, lang, t }: PhoneMockupProps) {
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setMessages(bot.messages || []);
    setIsTyping(false);
  }, [bot.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getFallbackReply = (btnText: string) => {
    const text = btnText.toLowerCase();
    if (text.includes("menu") || text.includes("меню")) {
      return {
        en: "Here is our menu: 🍔 Burgers - $10, 🍕 Pizza - $12, 🥤 Drinks - $3. Anything else?",
        uk: "Ось наше menu: 🍔 Бургери — $10, 🍕 Піца — $12, 🥤 Напої — $3. Бажаєте щось обрати?",
        ru: "Вот наше меню: 🍔 Бургеры — $10, 🍕 Пицца — $12, 🥤 Напитки — $3. Желаете что-то заказать?",
      };
    }
    if (text.includes("book") || text.includes("запис") || text.includes("урок") || text.includes("lesson")) {
      return {
        en: "Great! I've sent a link to calendar. Pick your time slot here: calendly.com/python-school",
        uk: "Чудово! Я надіслав посилання на календар. Оберіть зручний час: calendly.com/python-school",
        ru: "Отлично! Я отправил ссылку на календарь. Выберите удобное время: calendly.com/python-school",
      };
    }
    if (text.includes("curriculum") || text.includes("програм")) {
      return {
        en: "Python Basics, Databases, Web frameworks (FastAPI/Django), AI integration, and Final Project. Full list: school.com/python",
        uk: "Основи Python, Бази даних, Веб-фреймворки (FastAPI/Django), ШІ-інтеграція та фінальний проєкт. Повний список: school.com/python",
        ru: "Основы Python, Базы данных, Веб-фреймворки (FastAPI/Django), ИИ-интеграция и финальный проект. Полный список: school.com/python",
      };
    }
    return {
      en: "You have 1 active booking: Tomorrow at 19:00, Table 4. See you there!",
      uk: "У вас 1 активне бронювання: Завтра о 19:00, Столик 4. Чекаємо на вас!",
      ru: "У вас 1 активное бронирование: Завтра в 19:00, Столик 4. Ждем вас!",
    };
  };

  const handleButtonClick = (btn: any) => {
    if (isTyping) return;

    const buttonLabel = btn && btn.label ? btn.label : btn;
    const resolvedLabelText = getVal(buttonLabel);
    
    // Check if the reply is a generic placeholder from the migration
    const genericMsg = "разработчик";
    const hasGenericReply = btn && btn.botReply && (
      getVal(btn.botReply).includes(genericMsg) || 
      getVal(btn.botReply).includes("registered your request")
    );

    const buttonReply = (btn && btn.botReply && !hasGenericReply)
      ? btn.botReply
      : getFallbackReply(resolvedLabelText);

    // Append User's Message
    const userMsg: BotMessage = {
      isBot: false,
      text: buttonLabel,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Typing delay
    setTimeout(() => {
      setIsTyping(true);
    }, 400);

    // Bot Response delay
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: BotMessage = {
        isBot: true,
        text: buttonReply,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <div className="relative mx-auto w-full max-w-[300px] rounded-[48px] border-[8px] border-neutral-900 bg-neutral-950 p-0 shadow-2xl ring-1 ring-white/15 overflow-hidden flex flex-col select-none">
      {/* Dynamic Island */}
      <div className="absolute left-1/2 top-2.5 z-40 h-5 w-20 -translate-x-1/2 rounded-full bg-black shadow-inner" />
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .typing-dot {
          animation: typing 1.4s infinite;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>

      {/* iOS Status Bar */}
      <div className="z-30 flex h-10 items-end justify-between bg-card/85 px-6 pb-1.5 text-[9px] font-bold text-foreground/80 tracking-tight backdrop-blur select-none">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-end gap-[1px]">
            <span className="h-1.5 w-[2px] rounded-full bg-foreground/60" />
            <span className="h-2 w-[2px] rounded-full bg-foreground/60" />
            <span className="h-2.5 w-[2px] rounded-full bg-foreground/60" />
            <span className="h-3 w-[2px] rounded-full bg-foreground" />
          </div>
          <span>LTE</span>
          <div className="relative h-2.5 w-5 rounded-[4px] border border-foreground/60 p-[1px] flex items-center">
            <div className="h-full w-3/4 rounded-[2px] bg-foreground" />
            <span className="absolute -right-[3px] top-[3px] h-1 w-[2px] rounded-r bg-foreground/60" />
          </div>
        </div>
      </div>

      {/* Telegram UI simulation */}
      <div className="flex h-[420px] flex-col bg-secondary/35 overflow-hidden pb-4 relative">
        {/* Telegram Header */}
        <div className="border-b border-border bg-card/85 px-4 py-2.5 backdrop-blur flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-sm">
            🤖
          </div>
          <div>
            <p className="text-xs font-bold leading-tight text-foreground">{getVal(bot.title).split(" ")[0] + " Bot"}</p>
            <p className="text-[9px] font-medium text-primary">bot</p>
          </div>
        </div>

        {/* Telegram Messages Area (Scroll hidden) */}
        <div ref={chatContainerRef} className="flex-1 p-3 flex flex-col gap-2.5 overflow-y-auto text-xs no-scrollbar">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] rounded-2xl px-3 py-2 leading-snug shadow-sm border ${
                m.isBot
                  ? "bg-card text-foreground align-self-start rounded-tl-none border-border/80"
                  : "bg-primary text-primary-foreground self-end rounded-tr-none border-primary/25"
              }`}
            >
              {getVal(m.text)}
            </div>
          ))}

          {isTyping && (
            <div className="bg-card text-foreground align-self-start rounded-2xl rounded-tl-none border border-border/80 px-4 py-3 leading-none shadow-sm flex gap-1 items-center self-start">
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-foreground/60" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-foreground/60" />
              <span className="typing-dot h-1.5 w-1.5 rounded-full bg-foreground/60" />
            </div>
          )}
        </div>

        {/* Quick Action Keyboard simulation */}
        <div className="border-t border-border/85 bg-card/85 p-2 backdrop-blur flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            {bot.buttons.map((btn, btnIdx) => (
              <button
                key={btnIdx}
                disabled={isTyping}
                onClick={() => handleButtonClick(btn)}
                className="rounded-lg border border-border bg-secondary py-2 text-center text-[10px] font-semibold text-muted-foreground shadow-sm hover:bg-secondary/70 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {getVal(btn && btn.label ? btn.label : btn)}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between border border-border bg-background rounded-full px-3 py-1.5 mt-1 text-[10px] text-muted-foreground/60 shadow-inner">
            <span>Message...</span>
            <Send className="h-3 w-3 text-primary" />
          </div>
        </div>

        {/* iOS Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-28 rounded-full bg-foreground/20 z-40" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// B2B ROI Calculator
// ---------------------------------------------------------------------------
function RoiCalculator() {
  const { t, lang } = useLanguage();
  
  const isUaMarket = lang === "uk" || lang === "ru";
  const defaultWage = isUaMarket ? 150 : 8;
  const minWage = isUaMarket ? 50 : 5;
  const maxWage = isUaMarket ? 400 : 50;

  const [orders, setOrders] = useState(30);
  const [time, setTime] = useState(10);
  const [wage, setWage] = useState(defaultWage);

  // Sync wage slider range on language change
  useEffect(() => {
    setWage(isUaMarket ? 150 : 8);
  }, [lang]);

  const monthlyOrders = orders * 30;
  const hoursSaved = Math.round((monthlyOrders * time) / 60);
  const moneySaved = Math.round(hoursSaved * wage);

  const formatCurrency = (amount: number) => {
    if (isUaMarket) {
      return `${amount.toLocaleString()} ₴`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const wageLabel = isUaMarket ? `${wage} ₴ / ${lang === "uk" ? "год" : "час"}` : `$${wage} / hr`;
  const perMonthLabel = lang === "uk" ? "на місяць" : lang === "ru" ? "в месяц" : "per month";

  return (
    <section id="calculator" className="scroll-mt-24 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-32">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.p {...fadeUp} className="mb-3 text-sm font-medium tracking-[0.2em] uppercase text-primary">
            {t("calcLabel")}
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {t("calcHeading")}
          </motion.h2>
          <motion.p {...fadeUp} className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
            {t("calcDesc")}
          </motion.p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Inputs Sliders */}
          <div className="flex flex-col gap-6 sm:gap-8 rounded-3xl border border-border bg-background p-5 sm:p-8 shadow-xl">
            {/* Slider 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase">
                <span>{t("calcSlider1")}</span>
                <span className="text-primary font-bold text-xs sm:text-sm">{orders}</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Slider 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase">
                <span>{t("calcSlider2")}</span>
                <span className="text-primary font-bold text-xs sm:text-sm">
                  {time} {t("calcUnitMin")}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Slider 3 */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] sm:text-xs font-semibold text-muted-foreground uppercase">
                <span>{t("calcSlider3")}</span>
                <span className="text-primary font-bold text-xs sm:text-sm">
                  {wageLabel}
                </span>
              </div>
              <input
                type="range"
                min={minWage}
                max={maxWage}
                value={wage}
                onChange={(e) => setWage(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>

          {/* Outputs Dashboard */}
          <div className="grid gap-4 sm:gap-6 grid-cols-2">
            {/* Box 1 */}
            <div className="rounded-3xl border border-border bg-background p-5 sm:p-8 flex flex-col justify-center text-center shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors" />
              <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {t("calcOutput1")}
              </span>
              <span className="text-3xl sm:text-5xl font-bold text-foreground mt-3 sm:mt-4 tracking-tight">
                {hoursSaved}
              </span>
              <span className="text-[10px] text-primary font-bold mt-1.5 sm:mt-2 uppercase tracking-widest">
                {t("calcUnitHrs")}
              </span>
            </div>

            {/* Box 2 */}
            <div className="rounded-3xl border border-border bg-background p-5 sm:p-8 flex flex-col justify-center text-center shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors" />
              <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {t("calcOutput2")}
              </span>
              <span className="text-3xl sm:text-5xl font-bold text-primary mt-3 sm:mt-4 tracking-tight">
                {formatCurrency(moneySaved)}
              </span>
              <span className="text-[10px] text-primary font-bold mt-1.5 sm:mt-2 uppercase tracking-widest">
                {perMonthLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Integrations Ecosystem
// ---------------------------------------------------------------------------
function Integrations() {
  const { t } = useLanguage();

  const tools = [
    {
      name: "Stripe",
      desc: t("intStripe"),
      shadow: "hover:shadow-[0_8px_30px_rgba(99,91,255,0.32)] hover:border-[#635bff]/60 dark:hover:shadow-[0_8px_30px_rgba(99,91,255,0.18)] dark:hover:border-[#635bff]/40",
      svg: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#635bff]" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.929 11.238c0-1.13-.53-1.63-1.6-1.63-1.07 0-1.66.42-1.66 1.05 0 1.25 1.77 1.62 3.03 2.05 1.54.52 2.76 1.34 2.76 3.19 0 2.51-2.12 3.48-4.48 3.48-2.6 0-4.66-1.12-4.66-3.13h2.64c0 1.15.77 1.63 1.95 1.63 1.15 0 1.83-.49 1.83-1.14 0-1.39-1.92-1.8-3.18-2.22-1.4-.46-2.6-1.28-2.6-3.05 0-2.3 2-3.33 4.2-3.33 2.37 0 4.19.98 4.19 2.95h-2.68z" />
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z" className="opacity-10" />
        </svg>
      )
    },
    {
      name: "Airtable",
      desc: t("intAirtable"),
      shadow: "hover:shadow-[0_8px_30px_rgba(242,74,114,0.32)] hover:border-[#f24a72]/60 dark:hover:shadow-[0_8px_30px_rgba(242,74,114,0.18)] dark:hover:border-[#f24a72]/40",
      svg: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#f24a72]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5v-6l-10 5-10-5v6z" />
        </svg>
      )
    },
    {
      name: "OpenAI",
      desc: t("intOpenai"),
      shadow: "hover:shadow-[0_8px_30px_rgba(16,163,127,0.32)] hover:border-[#10a37f]/60 dark:hover:shadow-[0_8px_30px_rgba(16,163,127,0.18)] dark:hover:border-[#10a37f]/40",
      svg: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#10a37f]" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.3 11.2c.1-.4.1-.7.1-1.1 0-2.4-2-4.4-4.5-4.4-.6 0-1.2.1-1.8.4-.5-.9-1.4-1.6-2.5-1.9-1.9-.5-3.9.3-4.8 2-.6-.3-1.2-.4-1.9-.4-2.4 0-4.4 2-4.4 4.4 0 .4 0 .7.1 1.1-.9.5-1.5 1.4-1.7 2.5-.5 1.9.3 3.9 2 4.8-.3.6-.4 1.2-.4 1.9 0 2.4 2 4.4 4.4 4.4.6 0 1.2-.1 1.8-.4.5.9 1.4 1.6 2.5 1.9.4.1.7.1 1.1.1 1.5 0 2.9-.8 3.7-2 .6.3 1.2.4 1.9.4 2.4 0 4.4-2 4.4-4.4 0-.4 0-.7-.1-1.1.9-.5 1.5-1.4 1.7-2.5.5-1.9-.3-3.9-2-4.8zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
        </svg>
      )
    },
    {
      name: "Make",
      desc: t("intMake"),
      shadow: "hover:shadow-[0_8px_30px_rgba(154,80,255,0.32)] hover:border-[#9a50ff]/60 dark:hover:shadow-[0_8px_30px_rgba(154,80,255,0.18)] dark:hover:border-[#9a50ff]/40",
      svg: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#9a50ff]" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="5" r="3" />
          <circle cx="6" cy="15" r="3" />
          <circle cx="18" cy="15" r="3" />
          <path d="M12 8v4M9 14.5l-3 1M15 14.5l3 1" stroke="#9a50ff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Supabase",
      desc: t("intSupabase"),
      shadow: "hover:shadow-[0_8px_30px_rgba(62,207,142,0.32)] hover:border-[#3ecf8e]/60 dark:hover:shadow-[0_8px_30px_rgba(62,207,142,0.18)] dark:hover:border-[#3ecf8e]/40",
      svg: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#3ecf8e]" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.4 10.6l-8.6-8.6c-.4-.4-1.1-.4-1.5 0L2.6 10.6c-.4.4-.4 1.1 0 1.5l8.6 8.6c.4.4 1.1.4 1.5 0l8.6-8.6c.5-.4.5-1.1.1-1.5zm-9.4 6.9V6.5l5.5 5.5-5.5 5.5z" />
        </svg>
      )
    },
    {
      name: "Google Sheets",
      desc: t("intSheets"),
      shadow: "hover:shadow-[0_8px_30px_rgba(15,157,88,0.32)] hover:border-[#0f9d58]/60 dark:hover:shadow-[0_8px_30px_rgba(15,157,88,0.18)] dark:hover:border-[#0f9d58]/40",
      svg: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#0f9d58]" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm6-4H6v-2h12v2zm0-4H6V7h12v2z" />
        </svg>
      )
    },
    {
      name: "Telegram API",
      desc: t("intTelegram"),
      shadow: "hover:shadow-[0_8px_30px_rgba(0,136,204,0.32)] hover:border-[#0088cc]/60 dark:hover:shadow-[0_8px_30px_rgba(0,136,204,0.18)] dark:hover:border-[#0088cc]/40",
      svg: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#0088cc]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.6 1.5-1.55 2.75-2.97 2.87-3.47.02-.1-.01-.2-.1-.23-.1-.03-.23.01-.33.05-.14.05-2.38 1.53-6.73 4.46-.64.44-1.22.65-1.74.64-.57-.01-1.67-.32-2.49-.59-1-.33-1.8-.5-1.73-1.06.03-.3.45-.6 1.25-.92 4.9-2.13 8.17-3.53 9.8-4.2 4.67-1.92 5.64-2.26 6.28-2.27.14 0 .45.03.65.2.17.14.22.33.24.47.02.08.03.24.01.32z" />
        </svg>
      )
    },
    {
      name: "CRMs / HubSpot",
      desc: t("intHubspot"),
      shadow: "hover:shadow-[0_8px_30px_rgba(255,122,89,0.32)] hover:border-[#ff7a59]/60 dark:hover:shadow-[0_8px_30px_rgba(255,122,89,0.18)] dark:hover:border-[#ff7a59]/40",
      svg: (
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#ff7a59]" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM12 9a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      )
    }
  ];

  return (
    <section className="border-t border-border bg-secondary/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p {...fadeUp} className="mb-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
            {t("intTitle")}
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("intHeading")}
          </motion.h2>
          <motion.p {...fadeUp} className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
            {t("intDesc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {tools.map((t, idx) => (
            <motion.div
              key={t.name}
              {...stagger(idx, 0.08)}
              className={`border border-border/50 bg-background/50 hover:bg-background/85 rounded-2xl p-4 sm:p-6 shadow-sm transition-all duration-300 flex flex-col items-center text-center group cursor-default hover:-translate-y-1 select-none ${t.shadow}`}
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-secondary/50 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-inner">
                {t.svg}
              </div>
              <h3 className="text-[13px] sm:text-sm font-bold text-foreground mb-1 tracking-tight leading-tight">{t.name}</h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-normal">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Work
// ---------------------------------------------------------------------------
function Work() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"landings" | "bots" | "automations">("landings");
  const [showAllLandings, setShowAllLandings] = useState(false);
  const [portfolio, setPortfolio] = useState(defaultPortfolioData);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setHasMounted(true);
    setPortfolio(loadPortfolioData());
    
    const updateData = () => setPortfolio(loadPortfolioData());
    window.addEventListener("storage", updateData);
    const interval = setInterval(updateData, 2000);
    return () => {
      window.removeEventListener("storage", updateData);
      clearInterval(interval);
    };
  }, []);

  const imageMap: Record<string, string> = {
    projectFood,
    projectBooking,
    projectConstruction,
      projectMonolith,
  };

  const stepIconMap = {
    list: ClipboardList,
    plug: Plug,
    database: Database,
    send: Send,
    check: CheckCircle2,
    mail: Mail,
    rocket: Rocket,
  };

  const getVal = (field: any) => {
    if (typeof field === "object" && field !== null) {
      return (field as any)[lang] || (field as any)["en"] || "";
    }
    return field || "";
  };

  const limit = isMobile ? 2 : 4;
  const visibleLandings = showAllLandings ? portfolio.landings : portfolio.landings.slice(0, limit);

  return (
    <section id="work" className="scroll-mt-24 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <motion.p {...fadeUp} className="mb-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
          {t("workLabel")}
        </motion.p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("workHeading")}
          </motion.h2>

          {/* Custom Tabs */}
          <div className="flex w-full sm:w-auto flex-nowrap items-center justify-between gap-0 rounded-full border border-border bg-background p-1 self-start overflow-hidden">
            <button
              onClick={() => { setActiveTab("landings"); setShowAllLandings(false); }}
              className={`flex-1 sm:flex-none rounded-full px-2 py-2 text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "landings" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("workTab1")}
            </button>
            <button
              onClick={() => setActiveTab("bots")}
              className={`flex-1 sm:flex-none rounded-full px-2 py-2 text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "bots" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("workTab2")}
            </button>
            <button
              onClick={() => setActiveTab("automations")}
              className={`flex-1 sm:flex-none rounded-full px-2 py-2 text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "automations" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("workTab3")}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {/* LANDINGS TAB */}
            {activeTab === "landings" && (
                <motion.div
                  key="landings"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="mx-auto max-w-4xl w-full"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                      {visibleLandings.map((p, i) => (
                        <motion.a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={p.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_12px_30px_-10px_oklch(0.88_0.08_92/0.15)] flex flex-col justify-between cursor-pointer"
                        >
                          <div>
                            <div className="overflow-hidden">
                              <img
                                src={p.previewImage || imageMap[p.imageKey] || projectFood}
                                alt={getVal(p.title)}
                                loading="lazy"
                                width={800}
                                height={450}
                                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-5 sm:p-6">
                              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{getVal(p.title)}</h3>
                              <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">{getVal(p.description)}</p>
                              <div className="mt-4 flex flex-wrap gap-1.5">
                                {p.tags.map((tag) => (
                                  <span key={tag} className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {portfolio.landings.length > limit && (
                    <motion.div layout className="mt-10 flex justify-center">
                      <button
                        onClick={() => setShowAllLandings(!showAllLandings)}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-secondary hover:text-primary cursor-pointer"
                      >
                        {showAllLandings ? t("showLess") : `${t("showMore")} (${portfolio.landings.length})`}
                        <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showAllLandings ? "-rotate-90" : "rotate-90"}`} />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              )}

            {/* BOTS TAB */}
            {activeTab === "bots" && (
              <motion.div
                key="bots"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-12"
              >
                {portfolio.bots.map((bot, i) => (
                  <div
                    key={bot.id}
                    className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-center w-full"
                  >
                    {/* Project details */}
                    <div className="flex flex-col items-start">
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {bot.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">{getVal(bot.title)}</h3>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">{getVal(bot.description)}</p>
                    </div>

                    {/* Smartphone Mockup (iPhone Style) */}
                    <div className="flex justify-center w-full">
                      <div className="scale-[0.9] origin-center sm:scale-100">
                        <PhoneMockup bot={bot} getVal={getVal} lang={lang} t={t} />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* AUTOMATIONS TAB */}
            {activeTab === "automations" && (
              <motion.div
                key="automations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-12"
              >
                {portfolio.automations.map((auto, i) => (
                  <div
                    key={auto.id}
                    className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-center w-full"
                  >
                    {/* Left: details */}
                    <div className="flex flex-col items-start">
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {auto.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-foreground">{getVal(auto.title)}</h3>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">{getVal(auto.description)}</p>
                      
                      {/* Metric/Result badge */}
                      <div className="mt-5 flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2 text-xs font-semibold text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{getVal(auto.result)}</span>
                      </div>
                    </div>

                    {/* Right: Pipeline Visual Flow */}
                    <div className="rounded-xl border border-border bg-card p-5 shadow-md relative overflow-hidden w-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
                      <div className="relative flex flex-col gap-5">
                        {auto.steps.map((s, sIdx) => {
                          const IconComp = stepIconMap[s.iconType] || Plug;
                          const isLast = sIdx === auto.steps.length - 1;
                          return (
                            <div key={sIdx} className="relative flex items-center gap-3.5">
                              {/* Step Connection Line */}
                              {!isLast && (
                                <div
                                  className="absolute left-[18px] top-10 bottom-[-16px] w-[2px] bg-border"
                                  style={{
                                    backgroundImage: "linear-gradient(to bottom, var(--color-border) 50%, transparent 50%)",
                                    backgroundSize: "2px 8px"
                                  }}
                                />
                              )}
                              
                              {/* Step circle */}
                              <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-primary shadow-sm">
                                <IconComp className="h-4.5 w-4.5" />
                              </div>

                              <div className="min-w-0">
                                <h4 className="text-xs font-semibold text-foreground leading-snug truncate">{getVal(s.name)}</h4>
                                <p className="text-[10px] text-muted-foreground truncate">{getVal(s.source)}</p>
                              </div>

                              {/* Sequence number */}
                              <span className="ml-auto text-[10px] font-bold text-muted-foreground/20">
                                0{sIdx + 1}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

function Testimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const testimonials = [
    { name: t("t1Name"), role: t("t1Role"), text: t("t1Text") },
    { name: t("t2Name"), role: t("t2Role"), text: t("t2Text") },
    { name: t("t3Name"), role: t("t3Role"), text: t("t3Text") },
    { name: t("t4Name"), role: t("t4Role"), text: t("t4Text") },
    { name: t("t5Name"), role: t("t5Role"), text: t("t5Text") },
    { name: t("t6Name"), role: t("t6Role"), text: t("t6Text") },
    { name: t("t7Name"), role: t("t7Role"), text: t("t7Text") },
  ];

  const initials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("");

  const palette = [
    "bg-violet-500",
    "bg-sky-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  return (
    <section className="scroll-mt-24 border-t border-border bg-secondary/15">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <div className="text-center mb-12">
          <motion.p {...fadeUp} className="mb-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
            {t("testimonialsLabel")}
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {t("testimonialsHeading")}
          </motion.h2>
        </div>

        <div className="relative flex items-center justify-between gap-2 sm:gap-6">
          {/* Left Button */}
          <button
            onClick={() => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="rounded-full border border-border bg-card p-2.5 sm:p-3 text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors shadow-sm cursor-pointer shrink-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Testimonial Display Area */}
          <div className="flex-1 min-w-0 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-border bg-card p-6 sm:p-9 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Stars />
                    <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                      {index + 1} / {testimonials.length}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    "{testimonials[index].text}"
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-inner ${palette[index % palette.length]}`}
                  >
                    {initials(testimonials[index].name)}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-foreground">{testimonials[index].name}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{testimonials[index].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Button */}
          <button
            onClick={() => setIndex((prev) => (prev + 1) % testimonials.length)}
            className="rounded-full border border-border bg-card p-2.5 sm:p-3 text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors shadow-sm cursor-pointer shrink-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/35"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
function FAQ() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
    { q: t("faq6Q"), a: t("faq6A") },
  ];

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <motion.p {...fadeUp} className="text-center mb-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
          {t("faqLabel")}
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
        >
          {t("faqHeading")}
        </motion.h2>

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                {...stagger(i, 0.06)}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

function Contact() {
  const { t, lang } = useLanguage();
  const [mode, setMode] = useState<"quiz" | "message">("quiz");
  const [quizStep, setQuizStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState({
    projectType: "",
    goal: "",
    timeline: "",
    name: "",
    contact: ""
  });

  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  const getSchema = () =>
    z.object({
      name: z.string().trim().min(2, { message: t("valNameMin") }).max(100, { message: t("valNameMax") }),
      email: z.string().trim().email({ message: t("valEmailInvalid") }).max(255, { message: t("valEmailMax") }),
      message: z.string().trim().min(10, { message: t("valMessageMin") }).max(1000, { message: t("valMessageMax") }),
    });

  const update = (field: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setSent(false);
  };

  const updateQuiz = (field: keyof typeof quizAnswers, value: string) => {
    setQuizAnswers((qa) => ({ ...qa, [field]: value }));
  };

  const composeMessage = (data: { name: string; email: string; message: string }) =>
    `${t("contactInquiry")}\n\nName: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;

  const handleSubmitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = getSchema().safeParse(values);
    if (!result.success) {
      const next: ContactErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    window.open(telegramLink(composeMessage(result.data)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const handleSubmitQuiz = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!quizAnswers.name || !quizAnswers.contact) return;

    let detail2Label = "Цель";
    let detail3Label = "Детали";
    if (quizAnswers.projectType === "Landing / Website") {
      detail2Label = "Дизайн/Стиль";
      detail3Label = "Интеграции";
    } else if (quizAnswers.projectType === "Telegram Bot / Web App") {
      detail2Label = "Функция бота";
      detail3Label = "Админ-панель";
    } else if (quizAnswers.projectType === "Process Automation / CRM") {
      detail2Label = "Подключение";
      detail3Label = "Объем запросов";
    }

    const formattedBrief = `👋 Привет! Я заполнил бриф на твоем сайте:

💻 Проект: ${quizAnswers.projectType}
🎯 ${detail2Label}: ${quizAnswers.goal}
⚙️ ${detail3Label}: ${quizAnswers.timeline}

👤 Имя: ${quizAnswers.name}
📞 Контакты: ${quizAnswers.contact}`;

    window.open(telegramLink(formattedBrief), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const isStepValid = () => {
    if (quizStep === 1) return !!quizAnswers.projectType;
    if (quizStep === 2) return !!quizAnswers.goal;
    if (quizStep === 3) return !!quizAnswers.timeline;
    if (quizStep === 4) return !!quizAnswers.name && !!quizAnswers.contact;
    return false;
  };

  const handleProjectTypeSelect = (val: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      projectType: val,
      goal: "",
      timeline: "",
    }));
  };

  const getStep2Title = () => {
    if (quizAnswers.projectType === "Landing / Website") return t("quizStep2Landing");
    if (quizAnswers.projectType === "Telegram Bot / Web App") return t("quizStep2Bot");
    return t("quizStep2Auto");
  };

  const getStep2Options = () => {
    if (quizAnswers.projectType === "Landing / Website") {
      return [
        { label: t("qOptL1"), val: "Minimal & Premium (Apple Style)" },
        { label: t("qOptL2"), val: "Bright & Conversion-focused (Sales hook)" },
        { label: t("qOptL3"), val: "Strict Corporate / Webflow Interactive" }
      ];
    }
    if (quizAnswers.projectType === "Telegram Bot / Web App") {
      return [
        { label: t("qOptB1"), val: "Lead Gen, Sales Pipeline & CRM sync" },
        { label: t("qOptB2"), val: "Support, Auto-responder & AI FAQ Assistant" },
        { label: t("qOptB3"), val: "Interactive Telegram Web App / Mini App" }
      ];
    }
    return [
      { label: t("qOptA1"), val: "Website forms to CRM (HubSpot/Bitrix)" },
      { label: t("qOptA2"), val: "Databases sync (Airtable / Google Sheets)" },
      { label: t("qOptA3"), val: "AI agents integration (GPT auto-replies)" }
    ];
  };

  const getStep3Title = () => {
    if (quizAnswers.projectType === "Landing / Website") return t("quizStep3Landing");
    if (quizAnswers.projectType === "Telegram Bot / Web App") return t("quizStep3Bot");
    return t("quizStep3Auto");
  };

  const getStep3Options = () => {
    if (quizAnswers.projectType === "Landing / Website") {
      return [
        { label: t("qOptL4"), val: "Payments (Stripe) & Spreadsheet sync" },
        { label: t("qOptL5"), val: "Simple email / CRM lead forms" },
        { label: t("qOptL6"), val: "No integrations needed" }
      ];
    }
    if (quizAnswers.projectType === "Telegram Bot / Web App") {
      return [
        { label: t("qOptB4"), val: "Web panel to edit buttons & content" },
        { label: t("qOptB5"), val: "No, static bot logic is fine" },
        { label: t("qOptB6"), val: "Need to consult first" }
      ];
    }
    return [
      { label: t("qOptA4"), val: "Up to 50 requests per day" },
      { label: t("qOptA5"), val: "50 to 200 requests per day" },
      { label: t("qOptA6"), val: "More than 200 requests per day" }
    ];
  };

  const field =
    "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-secondary/5">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div {...fadeUp}>
          <p className="mb-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
            {t("contactLabel")}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {t("contactHeading")}
          </h2>
          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
            {t("contactDescription")}
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm">
            <a
              href={telegramLink(t("navPrefill"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
            >
              <Send className="h-4 w-4 text-primary" />@{TELEGRAM_USERNAME}
            </a>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" />
              {EMAIL_ADDRESS}
            </a>
          </div>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {mode === "quiz" ? (
              <motion.form
                key="quiz"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmitQuiz}
                className="rounded-2xl border border-border bg-card p-6 sm:p-9 shadow-lg flex flex-col min-h-[420px]"
              >
                {/* Header step indication */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
                    <span className="uppercase tracking-widest text-primary/75">{t("quizHeading")}</span>
                    <span>{quizStep} / 4</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      animate={{ width: `${(quizStep / 4) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Steps Content wrapper */}
                <div className="flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {quizStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-3"
                      >
                        <h3 className="text-sm font-semibold text-foreground mb-1">{t("quizStep1")}</h3>
                        {[
                          { label: t("qOptLanding"), val: "Landing / Website" },
                          { label: t("qOptBot"), val: "Telegram Bot / Web App" },
                          { label: t("qOptAuto"), val: "Process Automation / CRM" }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => handleProjectTypeSelect(opt.val)}
                            className={`rounded-xl border p-3.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                              quizAnswers.projectType === opt.val
                                ? "bg-primary/10 border-primary text-primary shadow-sm"
                                : "border-border hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {quizStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-3"
                      >
                        <h3 className="text-sm font-semibold text-foreground mb-1">{getStep2Title()}</h3>
                        {getStep2Options().map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => updateQuiz("goal", opt.val)}
                            className={`rounded-xl border p-3.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                              quizAnswers.goal === opt.val
                                ? "bg-primary/10 border-primary text-primary shadow-sm"
                                : "border-border hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {quizStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-3"
                      >
                        <h3 className="text-sm font-semibold text-foreground mb-1">{getStep3Title()}</h3>
                        {getStep3Options().map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => updateQuiz("timeline", opt.val)}
                            className={`rounded-xl border p-3.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                              quizAnswers.timeline === opt.val
                                ? "bg-primary/10 border-primary text-primary shadow-sm"
                                : "border-border hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {quizStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-4"
                      >
                        <h3 className="text-sm font-semibold text-foreground mb-1">{t("quizStep4")}</h3>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-muted-foreground">{t("qName")}</label>
                          <input
                            required
                            value={quizAnswers.name}
                            onChange={(e) => updateQuiz("name", e.target.value)}
                            placeholder="Alex Voloshyn"
                            className={field}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold text-muted-foreground">{t("qUsername")}</label>
                          <input
                            required
                            value={quizAnswers.contact}
                            onChange={(e) => updateQuiz("contact", e.target.value)}
                            placeholder="@telegram_nick / name@email.com"
                            className={field}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer buttons of quiz card */}
                <div className="flex items-center justify-between mt-8 border-t border-border pt-4">
                  {quizStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setQuizStep(quizStep - 1)}
                      className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      {lang === "uk" ? "Назад" : lang === "ru" ? "Назад" : "Back"}
                    </button>
                  ) : (
                    <div />
                  )}

                  {quizStep < 4 ? (
                    <button
                      type="button"
                      disabled={!isStepValid()}
                      onClick={() => setQuizStep(quizStep + 1)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                    >
                      {lang === "uk" ? "Далі" : lang === "ru" ? "Далее" : "Next"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {t("qSendTg")}
                    </button>
                  )}
                </div>

                {sent && (
                  <p className="mt-4 text-center text-xs font-semibold text-green-500">
                    {t("contactSuccess")}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setMode("message")}
                  className="text-[10px] text-muted-foreground/50 hover:text-primary transition-colors text-center w-full mt-4 font-bold uppercase tracking-wider cursor-pointer"
                >
                  {t("qWriteMsg")}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="message"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmitMessage}
                noValidate
                className="rounded-2xl border border-border bg-card p-6 sm:p-9 shadow-lg flex flex-col min-h-[420px]"
              >
                <div className="flex flex-col gap-4 flex-1 justify-center">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-xs font-semibold text-muted-foreground">
                      {t("formName")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      maxLength={100}
                      placeholder={t("formNamePlaceholder")}
                      className={field}
                    />
                    {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-xs font-semibold text-muted-foreground">
                      {t("formEmail")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      maxLength={255}
                      placeholder={t("formEmailPlaceholder")}
                      className={field}
                    />
                    {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-xs font-semibold text-muted-foreground">
                      {t("formMessage")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => update("message", e.target.value)}
                      maxLength={1000}
                      placeholder={t("formMessagePlaceholder")}
                      className={`${field} resize-none`}
                    />
                    {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 border-t border-border pt-4">
                  <div />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {t("formSubmit")}
                  </button>
                </div>

                {sent && (
                  <p className="mt-4 text-center text-xs font-semibold text-green-500">
                    {t("contactSuccess")}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setMode("quiz")}
                  className="text-[10px] text-muted-foreground/50 hover:text-primary transition-colors text-center w-full mt-4 font-bold uppercase tracking-wider cursor-pointer"
                >
                  {lang === "uk" ? "◀ Заповнити інтерактивний бриф" : lang === "ru" ? "◀ Заполнить интерактивный бриф" : "◀ Fill interactive brief"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t("navServices"), href: "#services" },
    { label: t("navWork"),     href: "#work" },
    { label: t("navCalc"),     href: "#calculator" },
    { label: t("navFaq"),      href: "#faq" },
  ];

  return (
    <footer className="border-t border-border bg-secondary/5">
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        {/* Bottom bar */}
        <div className="grid grid-cols-2 gap-8 pt-6 sm:grid-cols-3">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-lg font-semibold text-foreground">
              Alex<span className="text-primary">.</span>Voloshyn
            </p>
            <p className="mt-2 text-sm text-muted-foreground max-w-[200px]">
              {t("footerDescription")}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footerLinks")}
            </p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footerContact")}
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Send className="h-4 w-4" />@{TELEGRAM_USERNAME}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />{EMAIL_ADDRESS}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Code2 className="h-4 w-4" />GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground border-t border-border pt-6">
          © {new Date().getFullYear()} Alex Voloshyn. {t("footerRights")}
        </p>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Floating CTA
// ---------------------------------------------------------------------------
function FloatingCTA() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
        >
          {/* Pulse ring */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full animate-ping bg-primary opacity-30"
            style={{ animationDuration: "2s" }}
          />
          <Send className="relative h-4 w-4" />
          <span className="relative">{t("floatingCta")}</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function Index() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <TechTicker />
        <WhyMe />
        <Services />
        <Process />
        <Work />
        <RoiCalculator />
        <Integrations />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}



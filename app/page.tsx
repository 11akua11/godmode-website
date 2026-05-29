"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";

const navItems = ["Protocols", "Apparel", "Supplements", "Journal", "About", "Community"];

const protocolCheckoutUrl = "https://buy.stripe.com/cNiaER3eh0BK3htfUs0Ba02";
const activationCheckoutUrl = "https://buy.stripe.com/cNiaER3eh0BK3htfUs0Ba02";

const protocols = [
  {
    title: "Body",
    text: "Strength, endurance and movement calibrated into daily physical command."
  },
  {
    title: "Mind",
    text: "Discipline, focus and awareness returned to the seat of governance."
  },
  {
    title: "Spirit",
    text: "Breathwork, meditation and transcendence stripped of performance theater."
  }
];

const resetDays = ["Hydrate", "Breathe", "Train", "Fast", "Move", "Stillness", "Integrate"];

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-visual",
        { scale: 1.04, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" }
      );

      gsap.to(".light-sweep", {
        xPercent: 16,
        opacity: 0.38,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateHeroDepth = () => {
      const shift = Math.min(window.scrollY * 0.16, 96);
      heroLayerRef.current?.style.setProperty("--hero-shift", `${shift}px`);
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(updateHeroDepth);
    };

    updateHeroDepth();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen overflow-hidden bg-obsidian text-bone">
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_62%_18%,rgba(199,176,122,0.13),transparent_28%),linear-gradient(180deg,rgba(11,11,11,0.12),#0B0B0B_82%)]" />
      <div className="noise fixed inset-0 pointer-events-none z-0 opacity-[0.055]" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-bone/10 bg-obsidian/52 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-[1760px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="group flex items-center gap-3" aria-label="GODMODE home">
            <Image
              src="/godmode-wordmark-transparent.png"
              alt="GODMODE"
              width={1080}
              height={250}
              className="h-auto w-36 object-contain opacity-90 transition duration-500 group-hover:opacity-100 sm:w-44"
              priority
            />
          </a>
          <div className="hidden items-center gap-8 xl:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#protocol" className="hidden text-[0.72rem] uppercase tracking-ritual text-bone/70 sm:block">
              Log in
            </a>
            <a href={protocolCheckoutUrl} className="join-button">
              Join
            </a>
          </div>
        </nav>
      </header>

      <section id="top" className="relative z-10 min-h-screen overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/godmode-hero-clean.png"
            alt="GODMODE athlete in a cinematic brutalist concrete environment"
            fill
            className="hero-visual hero-visual-mobile object-cover object-[50%_78%] md:hidden"
            priority
            sizes="100vw"
          />
          <Image
            src="/godmode-hero.png"
            alt="GODMODE athlete in a cinematic brutalist concrete environment"
            fill
            className="hero-visual hero-visual-desktop hidden object-cover md:block"
            priority
            sizes="100vw"
          />
          <div className="hero-vignette absolute inset-0" />
          <div className="hero-side-shade absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-obsidian to-transparent" />
          <div className="light-sweep absolute -left-1/4 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-champagne/10 to-transparent blur-2xl" />
        </div>

        <div className="relative z-10 min-h-[calc(100vh-5rem)]">
          <a href={protocolCheckoutUrl} className="hero-hotspot hidden md:block" aria-label="Initiate 7 Day Reset" />
          <div ref={heroLayerRef} className="hero-brand-layer md:hidden">
            <Image
              src="/godmode-sigil-transparent.png"
              alt="GODMODE sovereign sigil"
              width={900}
              height={1080}
              className="hero-sigil"
              priority
            />
            <Image
              src="/godmode-wordmark-transparent.png"
              alt="GODMODE"
              width={1080}
              height={250}
              className="hero-wordmark"
              priority
            />
            <p className="hero-tagline">Demon hand. Buddha heart.</p>
            <div className="hero-divider" />
            <p className="hero-subtext">A modern movement of discipline, alignment and transcendence.</p>
            <a href={protocolCheckoutUrl} className="primary-cta hero-cta">
              Initiate 7 Day Reset
            </a>
          </div>
        </div>
      </section>

      <section id="protocol" className="section-shell border-t border-bone/10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="eyebrow">The 7 Day Reset Protocol</p>
            <h1 className="headline statement-stack">
              <span>The body obeys.</span>
              <span>The mind governs.</span>
              <span>The soul leads.</span>
            </h1>
          </div>
          <div className="self-end">
            <p className="support-copy max-w-2xl">
              A stripped, sovereign reset for those ready to leave distraction behind, restore inner order, and move
              with clarity and purpose. No spectacle. No guru theatre. Just the protocol.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px border border-bone/10 bg-bone/10 sm:grid-cols-7">
              {resetDays.map((day, index) => (
                <div key={day} className="bg-titanium/80 p-4">
                  <span className="block font-display text-xs uppercase tracking-ritual text-champagne/70">
                    0{index + 1}
                  </span>
                  <span className="mt-8 block font-display text-sm uppercase tracking-widebody text-bone">{day}</span>
                </div>
              ))}
              <div className="reset-mark-tile bg-titanium/80 p-4 sm:hidden" aria-hidden="true">
                <Image
                  src="/godmode-wordmark-transparent.png"
                  alt=""
                  width={1080}
                  height={250}
                  className="w-32 opacity-18"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="protocols" className="section-shell">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Protocols</p>
            <h2 className="section-title">Built on three commands.</h2>
          </div>
          <p className="support-copy max-w-md">
            Strength without stillness is noise. Stillness without action is illusion.
          </p>
        </div>
        <div className="grid gap-px border border-bone/10 bg-bone/10 lg:grid-cols-3">
          {protocols.map((protocol) => (
            <article key={protocol.title} className="protocol-card group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(199,176,122,0.16),transparent_38%)] opacity-0 transition duration-700 group-hover:opacity-100" />
              <span className="relative z-10 font-display text-xs uppercase tracking-ritual text-champagne/60">
                Protocol
              </span>
              <h3 className="relative z-10 mt-24 font-display text-6xl font-bold uppercase tracking-widebody text-bone sm:text-7xl">
                {protocol.title}
              </h3>
              <p className="support-copy relative z-10 mt-8 max-w-sm">{protocol.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="apparel" className="section-shell grid gap-12 border-y border-bone/10 lg:grid-cols-[0.74fr_1.26fr] lg:items-center">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[290px] overflow-hidden border border-bone/10 bg-titanium sm:max-w-[330px] lg:max-w-[360px]">
          <Image
            src="/godmode-apparel.png"
            alt="GODMODE apparel campaign portrait showing the Demon Hand Buddha Heart shirt text"
            fill
            className="apparel-image object-cover object-[50%_56%] opacity-95 transition duration-1000 hover:scale-[1.025]"
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 330px, 290px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.02),rgba(11,11,11,0.01)_58%,rgba(11,11,11,0.16))]" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <p className="font-display text-[0.64rem] uppercase tracking-ritual text-bone/68">
              Forged uniform
            </p>
            <span className="status-tag">Coming soon</span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">Apparel / Coming soon</p>
          <h2 className="section-title">Uniforms for the inward campaign.</h2>
          <p className="support-copy mt-8 max-w-xl">
            Monochrome layers, architectural cuts, and ritual-grade essentials designed for movement, recovery, and
            quiet dominance.
          </p>
          <div className="mt-12 grid gap-px border border-bone/10 bg-bone/10 sm:grid-cols-3">
            {["Obsidian cotton", "Metallic mark", "Limited first drop"].map((item) => (
              <div key={item} className="bg-obsidian/80 p-5">
                <span className="font-display text-xs uppercase tracking-widebody text-bone/62">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="section-shell">
        <div className="community-panel">
          <Image
            src="/godmode-hero-clean.png"
            alt="Dark GODMODE community atmosphere"
            fill
            className="community-image community-image-mobile object-cover object-right opacity-45 md:hidden"
            sizes="100vw"
          />
          <Image
            src="/godmode-hero.png"
            alt="Dark GODMODE community atmosphere"
            fill
            className="community-image community-image-desktop hidden object-cover opacity-55 md:block"
            sizes="100vw"
          />
          <div className="community-overlay absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/78 to-obsidian/20" />
          <div className="community-content relative z-10 max-w-3xl">
            <p className="eyebrow">Community</p>
            <h2 className="headline">Join the movement.</h2>
            <p className="support-copy mt-8 max-w-xl">
              A global order of disciplined individuals committed to transcendence.
            </p>
          </div>
        </div>
      </section>

      <section id="purchase" className="section-shell border-t border-bone/10">
        <motion.div
          initial={{ opacity: 0.86, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 border border-bone/10 bg-[linear-gradient(135deg,rgba(26,26,26,0.92),rgba(11,11,11,0.96))] p-5 sm:p-10 lg:grid-cols-[1fr_0.72fr] lg:p-14"
        >
          <div>
            <p className="eyebrow">Enter the protocol</p>
            <h2 className="section-title">Purchase the 7 Day Reset.</h2>
            <p className="support-copy mt-8 max-w-2xl">
              Seven days of disciplined calibration across body, mind and spirit. Built to clear noise, restore command,
              and initiate the next standard.
            </p>
          </div>
          <div className="grid gap-px border-t border-bone/10 bg-bone/10 pt-px lg:border-l lg:border-t-0 lg:pl-10">
            <article className="flex flex-col justify-between bg-obsidian/90 p-6">
              <div>
                <span className="font-display text-xs uppercase tracking-ritual text-champagne/70">Protocol access</span>
                <p className="mt-7 font-display text-4xl font-bold uppercase text-bone sm:text-5xl">A$47</p>
                <p className="support-copy mt-5">Complete 7 day reset protocol.</p>
              </div>
              <a href={protocolCheckoutUrl} className="primary-cta mt-9">
                Enter Protocol
              </a>
            </article>
            <article className="flex flex-col justify-between bg-obsidian/90 p-6">
              <div>
                <span className="font-display text-xs uppercase tracking-ritual text-champagne/70">Activation tier</span>
                <p className="mt-7 font-display text-4xl font-bold uppercase text-bone sm:text-5xl">A$144</p>
                <p className="support-copy mt-5">Protocol plus one 30 minute 1:1 activation call.</p>
              </div>
              <a href={activationCheckoutUrl} className="primary-cta mt-9">
                Add Activation Call
              </a>
            </article>
          </div>
        </motion.div>
      </section>

      <section className="section-shell py-28 sm:py-36">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Image
            src="/godmode-sigil-transparent.png"
            alt="GODMODE sovereign sigil"
            width={900}
            height={1080}
            className="mb-12 h-32 w-32 object-contain opacity-95 drop-shadow-[0_18px_45px_rgba(199,176,122,0.18)]"
          />
          <h2 className="headline final-statement">
            <span>We don&apos;t follow paths.</span>
            <span>We forge them.</span>
          </h2>
          <a href={protocolCheckoutUrl} className="primary-cta mt-12">
            Enter GODMODE
          </a>
        </div>
      </section>
    </main>
  );
}

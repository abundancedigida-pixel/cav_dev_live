"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  motion,
  animate,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

// Fonts mapped directly from app/layout.js
export const SERIF = "font-[family-name:var(--font-noto-serif)]";
export const SANS = "font-[family-name:var(--font-manrope)]";

export const EASE = [0.22, 1, 0.36, 1];

/**
 * Global Lenis smooth scroll. Wrap content inside app/layout.js.
 */
export function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}

/**
 * Shared width + horizontal padding.
 */
export function Container({ children, className = "", as: Tag = "div" }) {
  return (
    <Tag
      className={`w-full min-w-0 mx-auto max-w-[1500px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1220px] 2xl:max-w-[1500px] mx-auto px-3 sm:px-3 lg:px-4 xl:px-10 ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Fade + rise on scroll into view.
 */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  x = 0,
  duration = 0.9,
  className = "",
  as = "div",
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/**
 * Masked word-by-word headline reveal.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.07,
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.05,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {word}
            {"\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * Image with curtain (clip-path) reveal + Lenis-friendly scroll parallax.
 */
export function ParallaxImage({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  strength = 8,
  reveal = true,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`],
  );

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reveal ? { clipPath: "inset(0 0 100% 0)" } : false}
      whileInView={reveal ? { clipPath: "inset(0 0 0% 0)" } : undefined}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div
        style={{ y, top: `-${strength}%`, bottom: `-${strength}%` }}
        className="absolute left-0 right-0 will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Number that counts up when scrolled into view.
 */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#164A7A] ${className}`}
    >
      {children}
    </p>
  );
}

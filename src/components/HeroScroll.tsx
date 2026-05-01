"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";

export const HeroScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animation: Scale down slightly and fade out as user scrolls
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const scrollToCTA = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("cta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBrands = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("brands");
    if (el) {
      const navHeight = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - navHeight, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="h-[200vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          style={{ scale, opacity, y }}
          className="relative w-full max-w-5xl"
        >
          {/* Hero Text */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-accent border border-accent/30 mb-8 animate-pulse-soft">
                Now Live in Delhi/NCR
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.95]"
            >
              Your Brand.
              <br />
              <span className="font-serif italic text-accent">
                In Motion.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Turn every delivery vehicle into a moving billboard. Reach millions
              of eyeballs across the city with zero extra effort.
            </motion.p>

            {/* Hero CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={scrollToCTA}
                className="px-8 py-4 rounded-full bg-accent text-white font-bold text-lg hover:bg-accent-light transition-all duration-300 glow-blue hover:scale-105 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToBrands}
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Learn How It Works
              </button>
            </motion.div>
          </div>

          {/* Hero Image Container */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-black shadow-2xl glow-blue-soft"
          >
            <Image
              src="/hero-vehicle.png"
              alt="Branded delivery vehicle with RideNEarn advertising"
              fill
              className="object-cover opacity-70"
              priority
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-transparent" />

            {/* Live Tracking Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-strong px-6 py-3 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-soft" />
                  <p className="text-white font-mono text-xs uppercase tracking-widest">
                    Tracking Live in Delhi/NCR
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="glass px-4 py-2 rounded-xl">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider">Active Vehicles</p>
                <p className="text-white font-bold text-lg">127</p>
              </div>
              <div className="glass px-4 py-2 rounded-xl">
                <p className="text-gray-400 text-[10px] uppercase tracking-wider">Impressions Today</p>
                <p className="text-white font-bold text-lg">2.4M</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToBrands}
        >
          <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4 text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

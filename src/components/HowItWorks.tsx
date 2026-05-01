"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Sticker, IndianRupee, BarChart3 } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Sign Up",
    desc: "Brands or riders register in under 2 minutes. Simple KYC, instant onboarding.",
    icon: <UserPlus className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Get Matched",
    desc: "Our algorithm matches brands with riders in optimal high-traffic routes.",
    icon: <Sticker className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Earn & Track",
    desc: "Riders earn monthly. Brands get real-time GPS analytics and impression reports.",
    icon: <IndianRupee className="w-6 h-6" />,
  },
  {
    step: "04",
    title: "Scale",
    desc: "Grow from 10 to 10,000 vehicles. Our platform scales with your ambition.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-32 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-accent border border-accent/30 mb-6">
            How It Works
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Simple as{" "}
            <span className="font-serif italic text-accent">1-2-3-4</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From sign-up to your first payout — it takes less than a week.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative group"
            >
              {/* Connector line (between cards) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 w-6 h-px bg-gradient-to-r from-accent/40 to-transparent translate-x-full z-10" />
              )}

              <div className="glass rounded-3xl p-8 h-full hover:bg-white/[0.08] transition-all duration-500 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="text-5xl font-black text-white/5 mb-4 tracking-tighter">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 transition-transform duration-500 group-hover:scale-110">
                  {step.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

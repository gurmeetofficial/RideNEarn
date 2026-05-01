"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Wallet, Users, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "For Brands",
    desc: "Unmatched visibility in high-traffic zones. Your brand reaches millions of commuters daily across the busiest city routes.",
    stats: "₹3,000/mo per vehicle",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    gradient: "from-blue-500/20 to-transparent",
    ctaText: "Advertise Now",
    sectionId: "brands",
  },
  {
    title: "For Riders",
    desc: "Aap roz chalate ho, ad lagake extra kamao. Earn passive income just by doing what you already do — ride.",
    stats: "Extra ₹2,000/mo",
    icon: <Wallet className="w-8 h-8" />,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    gradient: "from-green-500/20 to-transparent",
    ctaText: "Start Earning",
    sectionId: "riders",
  },
  {
    title: "The Tech",
    desc: "Transparent tracking and GPS verified proof of every impression. Real analytics, real results.",
    stats: "Real-time Analytics",
    icon: <Users className="w-8 h-8" />,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    gradient: "from-purple-500/20 to-transparent",
    ctaText: "See How It Works",
    sectionId: "how-it-works",
  },
];

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCardAction = (sectionId: string) => {
    if (sectionId === "how-it-works") {
      const el = document.getElementById("how-it-works");
      if (el) {
        const navHeight = 80;
        const pos = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: pos - navHeight, behavior: "smooth" });
      }
    } else {
      const el = document.getElementById("cta");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="brands" className="py-32 bg-white text-black relative overflow-hidden">
      {/* Anchor for "For Riders" link */}
      <div id="riders" className="absolute" style={{ top: "-80px" }} />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 mb-6">
            The Marketplace
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Three sides.
            <br />
            <span className="text-gray-400">One platform.</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            RideNEarn connects brands, riders, and technology into a seamless mobile advertising ecosystem.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              onClick={() => handleCardAction(step.sectionId)}
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-[2.5rem] bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center mb-8 ${step.color} transition-transform duration-500 group-hover:scale-110`}>
                {step.icon}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{step.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{step.desc}</p>

              <div className="flex items-center justify-between">
                <span className="inline-block px-5 py-2.5 rounded-full bg-black text-white text-sm font-bold tracking-wide">
                  {step.stats}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardAction(step.sectionId);
                  }}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-black transition-colors group/btn"
                >
                  {step.ctaText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

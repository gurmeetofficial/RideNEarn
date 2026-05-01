"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Bike, Building2, TrendingUp, Sparkles } from "lucide-react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  isInView: boolean;
}

const AnimatedCounter = ({ target, prefix = "", suffix = "", duration = 2, isInView }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span>{prefix}{count.toLocaleString("en-IN")}{suffix}</span>;
};

const metrics = [
  { label: "Fleet Size", value: 100, suffix: " Vehicles", icon: <Bike className="w-6 h-6" />, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { label: "Monthly Revenue", value: 300000, prefix: "₹", icon: <Building2 className="w-6 h-6" />, color: "text-green-400", bgColor: "bg-green-500/10", desc: "Charge brands ₹3,000 each" },
  { label: "Rider Payouts", value: 150000, prefix: "₹", icon: <TrendingUp className="w-6 h-6" />, color: "text-yellow-400", bgColor: "bg-yellow-500/10", desc: "Pay riders ₹1,500 each" },
  { label: "Gross Margin", value: 150000, prefix: "₹", suffix: "/mo", icon: <Sparkles className="w-6 h-6" />, color: "text-purple-400", bgColor: "bg-purple-500/10", desc: "Pure profit, every month" },
];

export const Revenue = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="revenue" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-accent border border-accent/30 mb-6">The Numbers</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Built for <span className="gradient-text">profitability</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">With just 100 vehicles, the unit economics are clear and compelling.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.12 }} className="glass rounded-3xl p-8 text-center group hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-2">
              <div className={`w-14 h-14 rounded-2xl ${metric.bgColor} flex items-center justify-center ${metric.color} mx-auto mb-6 transition-transform duration-500 group-hover:scale-110`}>
                {metric.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                <AnimatedCounter target={metric.value} prefix={metric.prefix} suffix={metric.suffix} isInView={isInView} />
              </div>
              <div className="text-sm font-semibold text-gray-300 mb-1">{metric.label}</div>
              {metric.desc && <div className="text-xs text-gray-500">{metric.desc}</div>}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-white text-center mb-8">Monthly P&amp;L Snapshot</h3>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Revenue from Brands</span>
              <span className="text-green-400 font-bold">₹3,00,000</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={isInView ? { width: "100%" } : {}} transition={{ duration: 1.5, delay: 0.8 }} className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Rider Payouts</span>
              <span className="text-yellow-400 font-bold">₹1,50,000</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={isInView ? { width: "50%" } : {}} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" />
            </div>
          </div>
          <div className="pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white font-semibold">Net Gross Margin</span>
              <span className="text-accent font-black text-lg">₹1,50,000/mo</span>
            </div>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={isInView ? { width: "50%" } : {}} transition={{ duration: 1.5, delay: 1.2 }} className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full glow-blue-soft" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

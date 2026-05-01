"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Rocket, User, Building2 } from "lucide-react";

export const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [userType, setUserType] = useState<"brand" | "rider" | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email";
    if (!city) newErrors.city = "Please select a city";
    if (!userType) newErrors.userType = "Please select your role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setCity("");
    setUserType("");
    setErrors({});
  };

  return (
    <section id="cta" className="py-32 bg-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-accent border border-accent/30 mb-8">
            <Rocket className="w-3 h-3" />
            Launching Soon
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Launching in{" "}
            <span className="font-serif italic text-accent">your city</span>
          </h2>

          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-4">
            Be the first to know when RideNEarn arrives. Early adopters get priority fleet access and exclusive rates.
          </p>

          {/* 7-day teaser */}
          <div className="glass inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-12">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
            <span className="text-sm text-gray-300">
              <span className="font-semibold text-white">7-Day Action Plan:</span>{" "}
              Sign up → Onboard → First ad live in a week
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12 max-w-xl mx-auto">
              <div className="space-y-5">
                {/* User Type Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => { setUserType("brand"); setErrors((prev) => ({ ...prev, userType: "" })); }}
                      className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                        userType === "brand"
                          ? "bg-accent/10 border-accent/50 text-accent"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">Brand</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setUserType("rider"); setErrors((prev) => ({ ...prev, userType: "" })); }}
                      className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border transition-all duration-300 ${
                        userType === "rider"
                          ? "bg-green-500/10 border-green-500/50 text-green-400"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">Rider</span>
                    </button>
                  </div>
                  {errors.userType && <p className="text-red-400 text-xs mt-1">{errors.userType}</p>}
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: "" })); }}
                    placeholder="John Doe"
                    className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all ${
                      errors.name ? "border-red-400/50" : "border-white/10"
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
                    placeholder="you@company.com"
                    className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all ${
                      errors.email ? "border-red-400/50" : "border-white/10"
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-400 mb-2">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    Your City
                  </label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => { setCity(e.target.value); setErrors((prev) => ({ ...prev, city: "" })); }}
                    className={`w-full px-5 py-3.5 rounded-xl bg-white/5 border text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all appearance-none ${
                      errors.city ? "border-red-400/50" : "border-white/10"
                    }`}
                  >
                    <option value="" className="bg-gray-900">Select your city</option>
                    <option value="delhi" className="bg-gray-900">Delhi/NCR</option>
                    <option value="mumbai" className="bg-gray-900">Mumbai</option>
                    <option value="bangalore" className="bg-gray-900">Bangalore</option>
                    <option value="hyderabad" className="bg-gray-900">Hyderabad</option>
                    <option value="pune" className="bg-gray-900">Pune</option>
                    <option value="chennai" className="bg-gray-900">Chennai</option>
                    <option value="other" className="bg-gray-900">Other</option>
                  </select>
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-bold text-lg hover:bg-accent-light transition-all duration-300 glow-blue hover:scale-[1.02] mt-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {userType === "rider" ? "Start Earning" : userType === "brand" ? "Advertise With Us" : "Join the Waitlist"}
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-12 max-w-xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {userType === "rider" ? "Welcome aboard, rider! 🏍️" : "Welcome aboard! 🚀"}
              </h3>
              <p className="text-gray-400 mb-2">
                Hey {name.split(" ")[0]}, we&apos;ll reach out at <span className="text-white font-medium">{email}</span> as soon as we launch in your city.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                {userType === "rider"
                  ? "You'll be among the first riders to start earning passive income."
                  : "Your brand will be among the first to hit the streets."}
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm"
              >
                Submit another response
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

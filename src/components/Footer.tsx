"use client";

import { Zap, Globe, ExternalLink, Mail } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "For Brands", href: "#brands" },
    { label: "For Riders", href: "#riders" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Get Started", href: "#cta" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Revenue Model", href: "#revenue" },
    { label: "Contact Us", href: "#cta" },
    { label: "Careers", href: "#cta" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: <Globe className="w-4 h-4" />, href: "#", label: "Website" },
  { icon: <ExternalLink className="w-4 h-4" />, href: "#", label: "LinkedIn" },
  { icon: <Mail className="w-4 h-4" />, href: "mailto:hello@ridenearn.com", label: "Email" },
];

export const Footer = () => {
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#") || href === "#") return;
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 80;
      const pos = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - navHeight, behavior: "smooth" });
    }
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" onClick={scrollToTop} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                RideN<span className="text-accent">Earn</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              India&apos;s first mobile OOH advertising network. Turning every delivery ride into a brand impression and a rider&apos;s payday.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => smoothScroll(e, link.href)}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} RideNEarn. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs text-gray-600 hover:text-white transition-colors cursor-pointer"
          >
            ↑ Back to top
          </button>
          <p className="text-xs text-gray-600">
            A moving advertisement network + earning platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

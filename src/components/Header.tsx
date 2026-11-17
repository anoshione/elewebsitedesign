import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Search,
  User,
  X,
  Youtube,
} from 'lucide-react';
import { BrandLogo } from './Graphics';

interface HeaderProps {
  onEnrollClick: () => void;
  onSearchClick: () => void;
  onLoginClick: () => void;
}

/** Nav labels + anchors per the reference mockup; chevron marks dropdown-style items. */
const NAV_LINKS = [
  { label: 'Courses', href: '#courses', chevron: true },
  { label: 'Departments', href: '#departments', chevron: true },
  { label: 'Success Stories', href: '#success-story', chevron: true },
  { label: 'Blog & FAQ', href: '#blog', chevron: true },
  { label: 'Trust & Stats', href: '#trust', chevron: false },
  { label: 'Contact', href: '#footer', chevron: false },
];

export const Header: React.FC<HeaderProps> = ({
  onEnrollClick,
  onSearchClick,
  onLoginClick,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onSearchClick();
      }
    };
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, [onSearchClick]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 w-full">
      {/* Top Utility Bar — deep green, smoothly hides on scroll */}
      <div
        className={`bg-[#0A3D1E] text-emerald-50/90 text-xs overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? 'h-0 opacity-0 -translate-y-full pointer-events-none' : 'h-8 opacity-100 translate-y-0'
        }`}
      >
        <div className="container-1520 h-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 min-w-0">
            <a
              href="tel:01550666900"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" strokeWidth={1.75} />
              <span>01550-666900</span>
            </a>
            <a
              href="mailto:info@e-laeltd.com"
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-300 shrink-0" strokeWidth={1.75} />
              <span>info@e-laeltd.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline text-[11px] text-emerald-100/80">Follow Us</span>
            <div className="flex items-center gap-1">
              <a
                href="#footer"
                aria-label="Facebook"
                className="w-6 h-6 flex items-center justify-center text-emerald-50/90 hover:text-white transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
              <a
                href="#footer"
                aria-label="YouTube"
                className="w-6 h-6 flex items-center justify-center text-emerald-50/90 hover:text-white transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
              <a
                href="#footer"
                aria-label="LinkedIn"
                className="w-6 h-6 flex items-center justify-center text-emerald-50/90 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
              <a
                href="#footer"
                aria-label="Instagram"
                className="w-6 h-6 flex items-center justify-center text-emerald-50/90 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Translucent glass navbar with permanent .glass-nav effect even while scrolled */}
      <header
        className={`w-full transition-all duration-300 glass-nav ${
          scrolled || mobileOpen
            ? 'text-slate-900 border-b border-white/20'
            : 'text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.17)',
          backdropFilter: 'blur(19px) saturate(100%)',
          WebkitBackdropFilter: 'blur(19px) saturate(100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        <div className="container-1520 h-[68px] flex items-center justify-between gap-6">
          <a
            href="#top"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl whitespace-nowrap shrink-0"
            aria-label="e-Learning & Earning Ltd. Home"
          >
            <BrandLogo light={!scrolled && !mobileOpen} />
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm ${
                  scrolled || mobileOpen
                    ? 'text-slate-800 hover:text-emerald-700'
                    : 'text-white hover:text-emerald-300'
                }`}
              >
                {item.label}
                {item.chevron && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-colors ${
                      scrolled || mobileOpen ? 'text-slate-500' : 'text-white/80'
                    }`}
                    strokeWidth={2}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onSearchClick}
              aria-label="Search courses and departments"
              title="Search courses (Ctrl+K)"
              className={`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full shrink-0 ${
                scrolled || mobileOpen
                  ? 'text-slate-700 hover:text-emerald-700'
                  : 'text-white hover:text-emerald-300'
              }`}
            >
              <Search className="w-5 h-5" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={onLoginClick}
              aria-label="Student portal login"
              className={`w-9 h-9 hidden sm:flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full shrink-0 ${
                scrolled || mobileOpen
                  ? 'text-slate-700 hover:text-emerald-700'
                  : 'text-white hover:text-emerald-300'
              }`}
            >
              <User className="w-5 h-5" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={onEnrollClick}
              className="hidden sm:inline-flex items-center justify-center h-10 px-6 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Enroll Now
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                scrolled || mobileOpen
                  ? 'text-slate-800 hover:bg-slate-900/5'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" strokeWidth={1.75} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl">
            <div className="container-1520 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-800 hover:text-emerald-700 hover:bg-emerald-50 rounded-2xl transition-colors inline-flex items-center gap-1"
                >
                  {item.label}
                  {item.chevron && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                  )}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-200/70 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onLoginClick();
                  }}
                  className="py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4 text-slate-600" strokeWidth={1.75} />
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onEnrollClick();
                  }}
                  className="py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-colors cursor-pointer"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

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
  onVerifyClick?: () => void;
}

interface SubNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  chevron: boolean;
  onClick?: () => void;
  subItems?: SubNavItem[];
}

export const Header: React.FC<HeaderProps> = ({
  onEnrollClick,
  onSearchClick,
  onLoginClick,
  onVerifyClick,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  const navLinks: NavItem[] = [
    {
      label: 'Course',
      href: '#courses',
      chevron: true,
      subItems: [
        { label: 'All Popular Courses', href: '#courses' },
        { label: 'Career Track Departments', href: '#departments' },
        { label: 'Interactive Course Finder', href: '#course-finder' },
      ],
    },
    {
      label: 'About',
      href: '#departments',
      chevron: true,
      subItems: [
        { label: 'ELE at a Glance & Stats', href: '#trust' },
        { label: 'Academic Departments', href: '#departments' },
        { label: 'Active Industry Mentors', href: '#trainers' },
        { label: 'Success Stories', href: '#success-story' },
        { label: 'Partners & Clients', href: '#partners' },
      ],
    },
    {
      label: 'Career',
      href: '#career-consultation',
      chevron: true,
      subItems: [
        { label: 'Free 1:1 Career Counseling', href: '#career-consultation' },
        { label: 'Course Finder Quiz', href: '#course-finder' },
        { label: 'Student Testimonials', href: '#student-testimonials' },
        { label: 'Job Fairs & Campus Updates', href: '#news-feed' },
      ],
    },
    {
      label: 'Verify',
      href: '#verify',
      chevron: true,
      onClick: onVerifyClick,
      subItems: [
        { label: 'Verify Certificate', onClick: onVerifyClick },
        { label: 'Student Portal Login', onClick: onLoginClick },
        { label: 'Accreditation (NSDA & ISO)', href: '#trust' },
      ],
    },
    {
      label: 'Branch',
      href: '#branches',
      chevron: false,
    },
    {
      label: 'Contact',
      href: '#footer',
      chevron: false,
    },
  ];

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const hero = document.getElementById('top');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // The hero is scrolled past when its bottom edge reaches or passes the navbar height (~72px)
        setPastHero(rect.bottom <= 80);
      } else {
        setPastHero(scrollY > 600);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
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
        className={`bg-[#0A3D1E] text-[#f8f8f8] text-xs overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled ? 'h-0 opacity-0 -translate-y-full pointer-events-none' : 'h-8 opacity-100 translate-y-0'
        }`}
      >
        <div className="container-1520 h-8 flex items-center justify-between gap-4 text-[#f8f8f8]">
          <div className="flex items-center gap-5 min-w-0">
            <a
              href="tel:01550666900"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap tabular-nums text-[#f8f8f8]"
            >
              <Phone className="w-3.5 h-3.5 text-[#f8f8f8] shrink-0" strokeWidth={1.75} />
              <span className="text-[#f8f8f8]">01550-666900</span>
            </a>
            <a
              href="mailto:info@e-laeltd.com"
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap text-[#f8f8f8]"
            >
              <Mail className="w-3.5 h-3.5 text-[#f8f8f8] shrink-0" strokeWidth={1.75} />
              <span className="text-[#f8f8f8]">info@e-laeltd.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline text-[11px] text-[#f8f8f8]">Follow Us</span>
            <div className="flex items-center gap-1">
              <a
                href="#footer"
                aria-label="Facebook"
                className="w-6 h-6 flex items-center justify-center text-[#f8f8f8] hover:text-white transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
              <a
                href="#footer"
                aria-label="YouTube"
                className="w-6 h-6 flex items-center justify-center text-[#f8f8f8] hover:text-white transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
              <a
                href="#footer"
                aria-label="LinkedIn"
                className="w-6 h-6 flex items-center justify-center text-[#f8f8f8] hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
              <a
                href="#footer"
                aria-label="Instagram"
                className="w-6 h-6 flex items-center justify-center text-[#f8f8f8] hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Translucent glass navbar with permanent .glass-nav effect */}
      <header
        className={`w-full transition-all duration-300 glass-nav ${
          pastHero || mobileOpen
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
        <div className="container-1520 h-[72px] flex items-center justify-between gap-6">
          <a
            href="#top"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl whitespace-nowrap shrink-0"
            aria-label="e-Learning & Earning Ltd. Home"
          >
            <BrandLogo light={!pastHero && !mobileOpen} />
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
            {navLinks.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 py-2 text-sm font-normal transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm ${
                    pastHero || mobileOpen
                      ? 'text-slate-800 hover:text-emerald-700'
                      : 'text-white hover:text-emerald-300'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.chevron && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-all duration-200 group-hover:rotate-180 ${
                        pastHero || mobileOpen
                          ? 'text-slate-500 group-hover:text-emerald-700'
                          : 'text-white/80 group-hover:text-emerald-300'
                      }`}
                      strokeWidth={1.75}
                    />
                  )}
                </a>

                {item.subItems && item.subItems.length > 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50 min-w-[230px]">
                    <div className="rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/70 p-2 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.12)] ring-1 ring-black/5 flex flex-col gap-0.5">
                      {item.subItems.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href || '#'}
                          onClick={(e) => {
                            if (sub.onClick) {
                              e.preventDefault();
                              sub.onClick();
                            }
                          }}
                          className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-white/80 transition-all flex items-center justify-between"
                        >
                          <span>{sub.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onSearchClick}
              aria-label="Search courses and departments"
              title="Search courses (Ctrl+K)"
              className={`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full shrink-0 ${
                pastHero || mobileOpen
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
                pastHero || mobileOpen
                  ? 'text-slate-700 hover:text-emerald-700'
                  : 'text-white hover:text-emerald-300'
              }`}
            >
              <User className="w-5 h-5" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={onEnrollClick}
              className="hidden sm:inline-flex items-center justify-center h-[48px] px-7 text-[15px] font-semibold text-white btn-gradient-green rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Enroll Now
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                pastHero || mobileOpen
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
          <div className="lg:hidden border-t border-white/60 bg-white/85 backdrop-blur-2xl shadow-xl">
            <div className="container-1520 py-4 flex flex-col gap-1 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navLinks.map((item) => (
                <div key={item.label} className="border-b border-slate-100 last:border-0 pb-1 mb-1">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                      setMobileOpen(false);
                    }}
                    className="px-4 py-2.5 text-sm font-normal text-slate-800 hover:text-emerald-700 hover:bg-emerald-50 rounded-2xl transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    {item.chevron && (
                      <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
                    )}
                  </a>
                  {item.subItems && (
                    <div className="pl-6 pr-4 pb-1.5 flex flex-col gap-0.5">
                      {item.subItems.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href || '#'}
                          onClick={(e) => {
                            if (sub.onClick) {
                              e.preventDefault();
                              sub.onClick();
                            }
                            setMobileOpen(false);
                          }}
                          className="py-1.5 px-3 rounded-lg text-xs font-normal text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-200/70 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onLoginClick();
                  }}
                  className="h-[52px] text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2"
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
                  className="h-[48px] text-sm font-semibold text-white btn-gradient-green rounded-full transition-colors cursor-pointer flex items-center justify-center"
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

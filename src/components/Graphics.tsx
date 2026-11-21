import React, { useState } from 'react';
import {
  Award,
  Database,
  Megaphone,
  Network,
  Palette,
  ShieldCheck,
} from 'lucide-react';
import { DepartmentId } from '../data/homeData';
import heroStudentsImg from '../assets/images/hero_students_studio_1794815462444.jpg';
import campusLabImg from '../assets/images/campus_lab_training_1794815462732.jpg';
import campusSeminarImg from '../assets/images/campus_seminar_news_1794815464341.jpg';
import mentorMaleImg from '../assets/images/mentor_male_portrait_1794815463790.jpg';
import mentorFemaleImg from '../assets/images/mentor_female_portrait_1794815463875.jpg';

export const GENERATED_ASSETS = {
  heroStudents: heroStudentsImg,
  campusLab: campusLabImg,
  campusSeminar: campusSeminarImg,
  mentorMale: mentorMaleImg,
  mentorFemale: mentorFemaleImg,
};

export const ResilientPhoto: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = 'w-full h-full object-cover' }) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-[#072617] via-[#0B3B24] to-[#0D1E3D] flex items-center justify-center p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs font-medium text-emerald-200/80">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export const DepartmentGlassBadge: React.FC<{
  id: DepartmentId;
  dark?: boolean;
}> = ({ id, dark = false }) => {
  const iconMap = {
    'cyber-security': ShieldCheck,
    database: Database,
    graphics: Palette,
    networking: Network,
    marketing: Megaphone,
    government: Award,
    'web-dev': Database,
  };
  const Icon = iconMap[id] || ShieldCheck;

  return (
    <div
      className={`w-12 h-12 rounded-[24px] flex items-center justify-center shrink-0 ${dark
          ? 'glass-icon-badge text-emerald-300'
          : 'bg-emerald-500/12 border border-emerald-500/25 text-emerald-700'
        }`}
    >
      <Icon className="w-6 h-6" strokeWidth={1.75} />
    </div>
  );
};

export const SilkWaveOverlay: React.FC = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
    viewBox="0 0 1920 680"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0 490C360 360 720 580 1120 430C1460 300 1710 210 1920 290V680H0V490Z"
      fill="#10B981"
      fillOpacity="0.14"
    />
    <path
      d="M0 560C440 460 880 620 1340 480C1620 390 1790 340 1920 370V680H0V560Z"
      fill="#34D399"
      fillOpacity="0.08"
    />
  </svg>
);

/**
 * Bespoke vector & graphic compositions so every visual slot renders crisply
 * with zero external image URL dependencies.
 */

/**
 * Soft, silky light-green fabric backdrop.
 * Restores the original light-green palette (from-[#F2FAF0] via-[#DFEECF] to-[#C8E4BB])
 * with a progressive angled transition that begins just before the contents end
 * (cutting diagonally across the lower cards) so the frosted glass blur and specular
 * refraction effect are distinctly visible.
 */
export const SilkBackdrop: React.FC<{
  topFade?: boolean;
  bottomFade?: boolean;
}> = ({ topFade = true, bottomFade = true }) => (
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden bg-[#FBFCF8]" aria-hidden="true">
    {/* Masked Texture Container: Guarantees that the entire green papercut texture and all green tints 
        fade to 100% transparent well before reaching the top and bottom borders, completely eliminating any hard cutoff */}
    <div
      className="absolute inset-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50px, black 150px, black calc(100% - 160px), rgba(0,0,0,0.3) calc(100% - 50px), transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50px, black 150px, black calc(100% - 160px), rgba(0,0,0,0.3) calc(100% - 50px), transparent 100%)',
      }}
    >
      {/* 3D Layered Papercut Texture: Distinct pastel green, soft blue, and white/cream sculpted ribbons */}
      <img
        src="/assets/section_papercut_pastel_green_blue_white.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
      />
    </div>

    {/* Subtle soft light overlay: preserves the authentic green ribbons while ensuring smooth text contrast */}
    <div className="absolute inset-0 bg-white/10 pointer-events-none" />

    {/* Top blend overlay: generous progressive ease from #FBFCF8 melting into the section */}
    {topFade && (
      <div
        className="absolute top-0 inset-x-0 h-32 sm:h-44 lg:h-56 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, #FBFCF8 0%, #FBFCF8 15%, rgba(251, 252, 248, 0.85) 45%, rgba(251, 252, 248, 0.4) 75%, transparent 100%)',
        }}
      />
    )}

    {/* Bottom blend overlay: generous progressive ease melting out cleanly into the following section */}
    {bottomFade && (
      <div
        className="absolute bottom-0 inset-x-0 h-36 sm:h-48 lg:h-64 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #FBFCF8 0%, #FBFCF8 18%, rgba(251, 252, 248, 0.88) 48%, rgba(251, 252, 248, 0.4) 75%, transparent 100%)',
        }}
      />
    )}
  </div>
);

export const BrandLogo: React.FC<{ light?: boolean }> = () => (
  <div className="inline-flex items-center shrink-0">
    <img
      src="/assets/logo.png"
      alt="e-Learning & Earning Ltd. - Excellence in Learning"
      className="h-7 sm:h-8 w-auto object-contain select-none"
    />
  </div>
);

export const HeroStudioVisual: React.FC = () => (
  <div className="relative w-full h-full min-h-[380px] lg:min-h-[450px] rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0D4A25] via-[#0B3B1E] to-[#062211] border border-white/15 p-6 flex flex-col justify-between">
    {/* Subtle technical circuit grid backdrop */}
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      viewBox="0 0 600 480"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 90H220L260 130H600" stroke="#4ADE80" strokeWidth="1" />
      <path d="M0 240H140L180 200H420L460 240H600" stroke="#4ADE80" strokeWidth="1" />
      <path d="M120 0V160L160 200V480" stroke="#4ADE80" strokeWidth="1" />
      <path d="M440 0V120L400 160V480" stroke="#4ADE80" strokeWidth="1" />
      <circle cx="260" cy="130" r="4" fill="#4ADE80" />
      <circle cx="420" cy="200" r="4" fill="#4ADE80" />
      <circle cx="160" cy="200" r="4" fill="#4ADE80" />
    </svg>

    {/* Top Right Bangladesh No. 1 Emblem (inspired by screenshot) */}
    <div className="relative z-10 flex items-start justify-between gap-4">
      <div className="text-left">
        <p className="text-xs font-medium text-emerald-300/90 tracking-wide">
          Live Campus &amp; Remote Studio
        </p>
        <p className="text-sm text-white/80 mt-0.5">Dhaka · 42+ District Branches</p>
      </div>
      <div className="text-right select-none">
        <div className="inline-flex items-baseline gap-1.5 text-white/90">
          <span className="text-xs font-medium text-emerald-200">Bangladesh No.</span>
          <span className="font-display text-5xl font-extrabold leading-none text-emerald-300 tabular-nums">
            1
          </span>
        </div>
      </div>
    </div>

    {/* Collaborative Bangladeshi Students & Mentor Vector Illustration */}
    <div className="relative z-10 my-4 flex-1 flex items-center justify-center">
      <svg
        viewBox="0 0 560 270"
        className="w-full max-w-[520px] h-auto drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Students collaborating on laptops in a modern IT training studio"
      >
        {/* Studio Window Light & Greenery */}
        <rect x="24" y="14" width="512" height="240" rx="20" fill="#0B331A" stroke="#22C55E" strokeOpacity="0.25" />
        <rect x="44" y="28" width="150" height="110" rx="12" fill="#14532D" opacity="0.65" />
        <rect x="206" y="28" width="150" height="110" rx="12" fill="#14532D" opacity="0.55" />
        <rect x="368" y="28" width="148" height="110" rx="12" fill="#14532D" opacity="0.45" />

        {/* Beanbags / Studio Seating */}
        <ellipse cx="165" cy="222" rx="95" ry="26" fill="#15803D" />
        <ellipse cx="395" cy="222" rx="95" ry="26" fill="#166534" />

        {/* Student 1 (Left, Female Designer) */}
        <circle cx="145" cy="112" r="22" fill="#FDBA74" />
        <path d="M123 110C123 95 135 86 146 86C159 86 168 95 168 112C162 104 152 100 144 100C134 100 128 105 123 110Z" fill="#1E293B" />
        <path d="M114 148C114 136 128 130 145 130C162 130 176 136 176 148L182 212H108L114 148Z" fill="#0F766E" />
        <path d="M124 136L166 190" stroke="#99F6E4" strokeWidth="6" strokeLinecap="round" opacity="0.7" />

        {/* Student 2 (Center, Lead Coder with Laptop) */}
        <circle cx="280" cy="100" r="24" fill="#F59E0B" fillOpacity="0.45" />
        <circle cx="280" cy="100" r="22" fill="#FDBA74" />
        <path d="M258 98C258 82 269 74 282 74C295 74 303 83 303 98C296 90 266 90 258 98Z" fill="#0F172A" />
        <path d="M244 140C244 128 260 122 280 122C300 122 316 128 316 140L324 214H236L244 140Z" fill="#16A34A" />

        {/* Student 3 (Right, Female Security / Marketing Specialist) */}
        <circle cx="412" cy="110" r="22" fill="#FDBA74" />
        <path d="M384 114C384 92 397 82 412 82C427 82 440 92 440 116V142H384V114Z" fill="#1E3A8A" />
        <circle cx="412" cy="112" r="17" fill="#FDBA74" />
        <path d="M380 150C380 138 394 132 412 132C430 132 444 138 444 150L450 212H374L380 150Z" fill="#2563EB" />

        {/* Shared Center Laptop */}
        <path d="M235 162H325L335 204H225L235 162Z" fill="#E2E8F0" />
        <rect x="242" y="168" width="76" height="30" rx="4" fill="#0F172A" />
        <rect x="248" y="174" width="38" height="4" rx="2" fill="#4ADE80" />
        <rect x="248" y="182" width="54" height="3" rx="1.5" fill="#94A3B8" />
        <rect x="248" y="188" width="28" height="3" rx="1.5" fill="#38BDF8" />
        <rect x="218" y="204" width="124" height="8" rx="4" fill="#CBD5E1" />

        {/* Floating UI Code / Analytics Window */}
        <rect x="46" y="42" width="132" height="72" rx="10" fill="#0F172A" fillOpacity="0.85" stroke="#4ADE80" strokeOpacity="0.4" />
        <rect x="58" y="54" width="46" height="5" rx="2.5" fill="#4ADE80" />
        <rect x="58" y="66" width="96" height="4" rx="2" fill="#64748B" />
        <rect x="58" y="76" width="78" height="4" rx="2" fill="#64748B" />
        <rect x="58" y="90" width="24" height="12" rx="3" fill="#16A34A" />
        <rect x="88" y="90" width="36" height="12" rx="3" fill="#1E293B" />

        {/* Right Analytics Preview */}
        <rect x="382" y="42" width="122" height="72" rx="10" fill="#0F172A" fillOpacity="0.85" stroke="#38BDF8" strokeOpacity="0.35" />
        <path d="M396 96L418 80L438 86L464 62L488 70" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="464" cy="62" r="4" fill="#86EFAC" />
      </svg>
    </div>

    {/* Bottom Studio Metrics Strip */}
    <div className="relative z-10 grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
      <div>
        <div className="font-display text-lg font-bold text-white tabular-nums">104+ Classes</div>
        <div className="text-xs text-emerald-200/80">Hands-on Lab Tracks</div>
      </div>
      <div>
        <div className="font-display text-lg font-bold text-white tabular-nums">150+ Mentors</div>
        <div className="text-xs text-emerald-200/80">Active Industry Leads</div>
      </div>
      <div>
        <div className="font-display text-lg font-bold text-white tabular-nums">24/7 Support</div>
        <div className="text-xs text-emerald-200/80">Marketplace &amp; Career Help</div>
      </div>
    </div>
  </div>
);

export const TrustCampusScene: React.FC<{ variant: 'lab' | 'seminar' | 'convocation' }> = ({
  variant,
}) => {
  if (variant === 'lab') {
    return (
      <div className="relative w-full h-full min-h-[168px] rounded-[32px] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-5 flex flex-col justify-between">
        <svg viewBox="0 0 360 150" className="w-full h-28 opacity-95" fill="none">
          <rect x="12" y="16" width="96" height="62" rx="8" fill="#0F172A" stroke="#22C55E" strokeOpacity="0.5" />
          <rect x="20" y="24" width="80" height="40" rx="4" fill="#1E293B" />
          <path d="M28 52L46 38L62 46L88 30" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="126" y="16" width="96" height="62" rx="8" fill="#0F172A" stroke="#38BDF8" strokeOpacity="0.5" />
          <rect x="134" y="24" width="80" height="40" rx="4" fill="#1E293B" />
          <rect x="142" y="32" width="46" height="5" rx="2.5" fill="#38BDF8" />
          <rect x="142" y="42" width="62" height="4" rx="2" fill="#64748B" />
          <rect x="240" y="16" width="106" height="62" rx="8" fill="#0F172A" stroke="#22C55E" strokeOpacity="0.4" />
          <circle cx="293" cy="47" r="18" stroke="#4ADE80" strokeWidth="2.5" />
          <path d="M287 47L292 52L302 41" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="10" y="96" width="336" height="36" rx="10" fill="#14532D" fillOpacity="0.5" />
          <circle cx="58" cy="114" r="10" fill="#FDBA74" />
          <circle cx="174" cy="114" r="10" fill="#FDBA74" />
          <circle cx="293" cy="114" r="10" fill="#FDBA74" />
        </svg>
        <div className="flex items-center justify-between text-xs text-white/90 font-medium">
          <span>Modern Computer Workstations</span>
          <span className="text-emerald-300 font-mono tabular-nums">Dhaka Lab 01–08</span>
        </div>
      </div>
    );
  }

  if (variant === 'seminar') {
    return (
      <div className="relative w-full h-full min-h-[156px] rounded-[32px] overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-4 flex flex-col justify-between">
        <svg viewBox="0 0 240 110" className="w-full h-24" fill="none">
          <rect x="12" y="12" width="216" height="58" rx="8" fill="#064E3B" stroke="#6EE7B7" strokeOpacity="0.35" />
          <rect x="26" y="24" width="90" height="8" rx="4" fill="#A7F3D0" />
          <rect x="26" y="38" width="142" height="5" rx="2.5" fill="#6EE7B7" fillOpacity="0.5" />
          <circle cx="48" cy="92" r="10" fill="#FDBA74" />
          <circle cx="96" cy="92" r="10" fill="#FDBA74" />
          <circle cx="144" cy="92" r="10" fill="#FDBA74" />
          <circle cx="192" cy="92" r="10" fill="#FDBA74" />
        </svg>
        <div className="text-xs font-medium text-white/90">Weekly Free Freelancing Seminars</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[156px] rounded-[32px] overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-emerald-950 p-4 flex flex-col justify-between">
      <svg viewBox="0 0 240 110" className="w-full h-24" fill="none">
        <rect x="22" y="14" width="196" height="54" rx="8" fill="#1C1917" stroke="#FBBF24" strokeOpacity="0.4" />
        <path d="M120 26L146 38L120 50L94 38L120 26Z" fill="#F59E0B" />
        <rect x="108" y="48" width="24" height="10" rx="2" fill="#D97706" />
        <rect x="78" y="78" width="84" height="22" rx="6" fill="#292524" />
        <circle cx="120" cy="70" r="11" fill="#FDBA74" />
      </svg>
      <div className="text-xs font-medium text-white/90">NSDA &amp; Govt. Project Convocations</div>
    </div>
  );
};

export const DepartmentIllustration: React.FC<{ id: DepartmentId }> = ({ id }) => {
  switch (id) {
    case 'cyber-security':
      return (
        <svg viewBox="0 0 110 90" className="w-24 h-20" fill="none">
          <path d="M55 10L86 22V45C86 64 72 78 55 84C38 78 24 64 24 45V22L55 10Z" fill="#16A34A" fillOpacity="0.18" stroke="#15803D" strokeWidth="2.5" />
          <rect x="42" y="40" width="26" height="22" rx="5" fill="#0F172A" />
          <path d="M47 40V34C47 29.5817 50.5817 26 55 26C59.4183 26 63 29.5817 63 34V40" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <circle cx="55" cy="50" r="3" fill="#4ADE80" />
        </svg>
      );
    case 'database':
      return (
        <svg viewBox="0 0 110 90" className="w-24 h-20" fill="none">
          <ellipse cx="55" cy="24" rx="28" ry="10" fill="#7C3AED" fillOpacity="0.22" stroke="#6D28D9" strokeWidth="2" />
          <path d="M27 24V42C27 47.5 39.5 52 55 52C70.5 52 83 47.5 83 42V24" fill="#8B5CF6" fillOpacity="0.14" stroke="#6D28D9" strokeWidth="2" />
          <path d="M27 42V60C27 65.5 39.5 70 55 70C70.5 70 83 65.5 83 60V42" fill="#8B5CF6" fillOpacity="0.2" stroke="#6D28D9" strokeWidth="2" />
          <circle cx="71" cy="36" r="2.5" fill="#4ADE80" />
          <circle cx="71" cy="54" r="2.5" fill="#4ADE80" />
        </svg>
      );
    case 'graphics':
      return (
        <svg viewBox="0 0 110 90" className="w-24 h-20" fill="none">
          <rect x="22" y="18" width="66" height="52" rx="12" fill="#EC4899" fillOpacity="0.14" stroke="#DB2777" strokeWidth="2" />
          <circle cx="44" cy="40" r="12" fill="#F472B6" fillOpacity="0.45" />
          <circle cx="64" cy="48" r="12" fill="#38BDF8" fillOpacity="0.45" />
          <path d="M68 16L82 30L56 56L42 42L68 16Z" fill="#0F172A" />
        </svg>
      );
    case 'networking':
      return (
        <svg viewBox="0 0 110 90" className="w-24 h-20" fill="none">
          <circle cx="55" cy="45" r="24" fill="#0284C7" fillOpacity="0.16" stroke="#0369A1" strokeWidth="2" />
          <ellipse cx="55" cy="45" rx="11" ry="24" stroke="#0369A1" strokeWidth="1.8" />
          <path d="M31 45H79" stroke="#0369A1" strokeWidth="1.8" />
          <circle cx="31" cy="30" r="5" fill="#16A34A" />
          <circle cx="80" cy="58" r="5" fill="#0284C7" />
        </svg>
      );
    case 'marketing':
      return (
        <svg viewBox="0 0 110 90" className="w-24 h-20" fill="none">
          <path d="M30 48L72 26V64L30 48Z" fill="#F97316" fillOpacity="0.22" stroke="#EA580C" strokeWidth="2.2" strokeLinejoin="round" />
          <rect x="22" y="42" width="12" height="14" rx="3" fill="#0F172A" />
          <path d="M78 36C83 40 83 50 78 54" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M85 30C93 38 93 52 85 60" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 110 90" className="w-24 h-20" fill="none">
          <path d="M55 18L90 34L55 50L20 34L55 18Z" fill="#16A34A" fillOpacity="0.22" stroke="#15803D" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M35 42V60C35 66 44 71 55 71C66 71 75 66 75 60V42" stroke="#15803D" strokeWidth="2.2" />
          <path d="M86 36V56" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
};

export const CoursePosterBanner: React.FC<{
  theme: 'purple' | 'navy' | 'cyan' | 'cobalt' | 'crimson' | 'indigo';
  title: string;
  highlight: string;
  sub: string;
}> = ({ theme, title, highlight, sub }) => {
  const palettes = {
    purple: 'from-[#3B0764] via-[#6B21A8] to-[#1E1B4B]',
    navy: 'from-[#062E39] via-[#0F172A] to-[#1E3A8A]',
    cyan: 'from-[#0284C7] via-[#0EA5E9] to-[#0F766E]',
    cobalt: 'from-[#0B1F4B] via-[#1D4ED8] to-[#0E7490]',
    crimson: 'from-[#7F1D1D] via-[#B91C1C] to-[#0F172A]',
    indigo: 'from-[#31105E] via-[#4338CA] to-[#1E1B4B]',
  };

  return (
    <div
      className={`relative w-full aspect-[16/9] rounded-[24px] overflow-hidden bg-gradient-to-br ${palettes[theme]} p-5 flex items-center justify-between text-white`}
    >
      {/* Subtle geometric accent */}
      <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="relative z-10 max-w-[65%]">
        <p className="text-xs font-medium text-emerald-300 tracking-wide">{title}</p>
        <h4 className="font-display text-xl xl:text-2xl font-extrabold leading-tight tracking-tight mt-0.5 text-white !text-white">
          {highlight}
        </h4>
        <p className="text-xs text-white/80 mt-1.5">{sub}</p>
      </div>
      {/* Right miniature UI / Device Graphic */}
      <div className="relative z-10 w-24 h-20 rounded-[24px] bg-white/10 border border-white/20 backdrop-blur-sm p-2.5 flex flex-col justify-between shrink-0">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
          <span className="w-8 h-1.5 rounded-full bg-white/30 ml-auto" />
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-full rounded bg-white/25" />
          <div className="h-2 w-3/4 rounded bg-emerald-300/60" />
          <div className="h-2 w-1/2 rounded bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export const PortraitAvatar: React.FC<{
  name: string;
  hue: 'emerald' | 'sky' | 'amber' | 'violet' | 'teal' | 'rose' | 'indigo';
  variant?: 'card' | 'story';
  className?: string;
  imageSrc?: string;
}> = ({ name, hue, variant = 'card', className = '', imageSrc }) => {
  const bgMap = {
    emerald: 'from-emerald-100 to-emerald-200',
    sky: 'from-sky-100 to-blue-200',
    amber: 'from-amber-100 to-orange-200',
    violet: 'from-violet-100 to-purple-200',
    teal: 'from-teal-100 to-emerald-200',
    rose: 'from-rose-100 to-pink-200',
    indigo: 'from-indigo-100 to-slate-200',
  };
  const shirtMap = {
    emerald: '#0F5132',
    sky: '#1E3A8A',
    amber: '#92400E',
    violet: '#4C1D95',
    teal: '#115E59',
    rose: '#881337',
    indigo: '#1E293B',
  };

  const defaultHeight = variant === 'story' ? 'h-full min-h-[300px]' : 'h-full min-h-[220px]';

  if (imageSrc) {
    return (
      <div
        className={`relative w-full ${className || defaultHeight} rounded-[24px] overflow-hidden bg-slate-100 flex items-center justify-center`}
        role="img"
        aria-label={`Portrait of ${name}`}
      >
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-top select-none transition-transform duration-500 hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${className || defaultHeight} rounded-[24px] overflow-hidden bg-gradient-to-br ${bgMap[hue]} flex items-end justify-center`}
      role="img"
      aria-label={`Portrait of ${name}`}
    >
      <svg viewBox="0 0 200 240" className="w-4/5 max-h-[88%] h-auto drop-shadow-sm" fill="none">
        <circle cx="100" cy="82" r="36" fill="#FDBA74" />
        <path
          d="M64 78C64 56 80 42 100 42C120 42 136 56 136 78C128 66 114 62 100 62C86 62 72 66 64 78Z"
          fill="#1E293B"
        />
        <path
          d="M36 240C36 176 62 146 100 146C138 146 164 176 164 240H36Z"
          fill={shirtMap[hue]}
        />
        <path d="M84 148L100 176L116 148" fill="#FFFFFF" fillOpacity="0.85" />
      </svg>
    </div>
  );
};

export const EditorialVisual: React.FC<{
  tone: 'emerald' | 'teal' | 'slate' | 'amber' | 'indigo' | 'analytics' | 'freelance' | 'fullstack';
  large?: boolean;
}> = ({ tone, large = false }) => {
  const toneStyles: Record<string, string> = {
    emerald: 'from-emerald-900 via-emerald-800 to-teal-900',
    teal: 'from-teal-900 via-slate-800 to-emerald-950',
    slate: 'from-slate-900 via-slate-800 to-emerald-900',
    amber: 'from-amber-900 via-stone-900 to-emerald-950',
    indigo: 'from-indigo-950 via-slate-900 to-emerald-950',
    analytics: 'from-sky-50 via-white to-emerald-50 border border-slate-200',
    freelance: 'from-emerald-50 via-white to-teal-50 border border-slate-200',
    fullstack: 'from-indigo-50 via-white to-sky-50 border border-slate-200',
  };

  const isLight = tone === 'analytics' || tone === 'freelance' || tone === 'fullstack';

  return (
    <div
      className={`relative w-full ${large ? 'h-72 lg:h-80' : 'h-40'
        } rounded-[24px] overflow-hidden bg-gradient-to-br ${toneStyles[tone]} p-5 flex flex-col justify-between`}
    >
      {isLight ? (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">ELE Insights</span>
            <span className="font-mono text-[11px] text-slate-500">2026 Edition</span>
          </div>
          <svg viewBox="0 0 280 90" className="w-full h-24" fill="none">
            <rect x="8" y="10" width="264" height="72" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />
            <rect x="22" y="24" width="70" height="8" rx="4" fill="#0F172A" />
            <rect x="22" y="38" width="110" height="5" rx="2.5" fill="#94A3B8" />
            <rect x="22" y="54" width="44" height="14" rx="4" fill="#16A34A" />
            <path d="M168 64L194 44L214 52L248 26" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
            <circle cx="248" cy="26" r="4" fill="#16A34A" />
          </svg>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-300">ELE Newsroom</span>
            <span className="text-xs font-mono text-white/60">BD-2026</span>
          </div>
          <svg viewBox="0 0 320 110" className="w-full h-auto opacity-90" fill="none">
            <rect x="0" y="18" width="190" height="74" rx="12" fill="white" fillOpacity="0.08" />
            <rect x="16" y="34" width="110" height="8" rx="4" fill="#4ADE80" />
            <rect x="16" y="50" width="150" height="5" rx="2.5" fill="white" fillOpacity="0.45" />
            <rect x="16" y="62" width="120" height="5" rx="2.5" fill="white" fillOpacity="0.3" />
            <circle cx="256" cy="55" r="34" fill="#16A34A" fillOpacity="0.35" stroke="#86EFAC" strokeOpacity="0.45" />
            <path d="M244 55L253 64L270 46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </>
      )}
    </div>
  );
};

export const CircleStudentAvatar: React.FC<{
  name: string;
  hue: 'emerald' | 'sky' | 'amber' | 'violet' | 'teal' | 'rose' | 'indigo';
  className?: string;
  imageSrc?: string;
}> = ({ name, hue, className = 'w-24 h-24 mx-auto', imageSrc }) => {
  const bgMap = {
    emerald: 'from-emerald-100 to-emerald-300',
    sky: 'from-sky-100 to-blue-300',
    amber: 'from-amber-100 to-orange-200',
    violet: 'from-violet-100 to-purple-300',
    teal: 'from-teal-100 to-emerald-200',
    rose: 'from-rose-100 to-pink-200',
    indigo: 'from-indigo-100 to-slate-300',
  };
  const shirtMap = {
    emerald: '#064E3B',
    sky: '#1E3A8A',
    amber: '#92400E',
    violet: '#4C1D95',
    teal: '#115E59',
    rose: '#881337',
    indigo: '#1E293B',
  };

  if (imageSrc) {
    return (
      <div
        className={`rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 ${className}`}
        role="img"
        aria-label={`Student portrait of ${name}`}
      >
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover select-none"
        />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full overflow-hidden bg-gradient-to-br ${bgMap[hue]} ring-2 ring-emerald-400/35 flex items-end justify-center shrink-0 ${className}`}
      role="img"
      aria-label={`Student portrait of ${name}`}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
        <circle cx="60" cy="44" r="20" fill="#FDBA74" />
        <path
          d="M40 41C40 29 49 21 60 21C71 21 80 29 80 41C75 35 68 33 60 33C52 33 45 35 40 41Z"
          fill="#0F172A"
        />
        <path
          d="M22 120C22 88 38 72 60 72C82 72 98 88 98 120H22Z"
          fill={shirtMap[hue]}
        />
        <path d="M51 73L60 88L69 73" fill="#FFFFFF" fillOpacity="0.85" />
      </svg>
    </div>
  );
};


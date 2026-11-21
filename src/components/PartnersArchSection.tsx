import React, { useState, useEffect, useRef } from 'react';
import {
  PARTNERS_AND_CLIENTS,
  PartnerClientItem,
} from '../data/homeData';
import { Check, Sparkles, Shield } from 'lucide-react';

// Featured 6 partners matching the requested arch layout
const FEATURED_PARTNER_IDS = [
  'ict-division', // ICT Division Govt
  'edge',         // EDGE Project
  'army',         // Bangladesh Army
  'du-crest',     // University of Dhaka
  'bitm',         // BITM BASIS
  'swisscontact', // Swisscontact
];

interface PartnersArchSectionProps {
  onPartnerClick?: (partner: PartnerClientItem) => void;
}

export const PartnersArchSection: React.FC<PartnersArchSectionProps> = ({
  onPartnerClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  // IntersectionObserver to trigger animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // 6 Featured Partners
  const featuredPartners = FEATURED_PARTNER_IDS.map(
    (id) => PARTNERS_AND_CLIENTS.find((p) => p.id === id) || PARTNERS_AND_CLIENTS[0]
  );

  // Middle-aligned arch positions in percentage of 1100x320 viewBox
  // Symmetrical around 50% midpoint:
  // Card 0 & 5: 23.82% and 76.18% (midpoint = 50%)
  // Card 1 & 4: 34.27% and 65.73% (midpoint = 50%)
  // Card 2 & 3: 44.73% and 55.27% (midpoint = 50%)
  const cardLayout = [
    { xPct: 23.82, yPct: 54.69, delay: 0.15 }, // Card 0: ICT Division
    { xPct: 34.27, yPct: 60.00, delay: 0.38 }, // Card 1: EDGE
    { xPct: 44.73, yPct: 63.13, delay: 0.61 }, // Card 2: Bangladesh Army
    { xPct: 55.27, yPct: 63.13, delay: 0.84 }, // Card 3: Dhaka University
    { xPct: 65.73, yPct: 60.00, delay: 1.07 }, // Card 4: BITM
    { xPct: 76.18, yPct: 54.69, delay: 1.30 }, // Card 5: Swisscontact
  ];

  // SVG Arch Path: flows through centered cards, swoops around on the right, and points directly to the 3D handshake
  const archPathD =
    'M 130,158 C 170,164 215,170 262,175 C 300,180 340,188 377,192 C 415,196 455,202 492,202 C 530,202 570,202 608,202 C 645,202 685,196 723,192 C 760,188 800,180 838,175 C 875,170 915,185 945,210 C 980,235 1030,230 1045,185 C 1055,145 1015,115 965,105';

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="section-band bg-[#FBFCF8] text-slate-900 overflow-hidden relative"
    >
      {/* Background Ambient Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Title Block - Kept exactly as requested */}
      <div className="container-1520 mb-6 sm:mb-9 text-left">
        <p className="section-tag">PARTNERS</p>
        <h2 className="heading-gradient-green">
          Our Trusted Partners &amp; Clients
        </h2>
        <p className="section-subtitle-max2 mt-2">
          We&apos;re proud to collaborate with leading government divisions, international NGOs, and technology enterprises.
        </p>
      </div>

      {/* Main Arch Visual Stage */}
      <div className="container-1520 relative">
        {/* Scrollable Container on Mobile, Fluid on Desktop */}
        <div className="w-full overflow-x-auto lg:overflow-visible pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className="relative min-w-[920px] lg:min-w-0 w-full aspect-[1100/320]">
            {/* SVG Background: The Arch Line that draws smoothly on scroll */}
            <svg
              viewBox="0 0 1100 320"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                {/* Luminous emerald-to-cyan gradient */}
                <linearGradient id="archLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#008F2F" stopOpacity="0.15" />
                  <stop offset="15%" stopColor="#008F2F" stopOpacity="0.75" />
                  <stop offset="55%" stopColor="#10B981" stopOpacity="0.95" />
                  <stop offset="85%" stopColor="#059669" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
                </linearGradient>

                {/* Soft glow filter */}
                <filter id="archLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Faint Background Guide Line */}
              <path
                d={archPathD}
                stroke="#E2E8F0"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.65"
              />

              {/* Animated Foreground Drawing Line */}
              <path
                d={archPathD}
                stroke="url(#archLineGradient)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#archLineGlow)"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={isInView ? 0 : 1}
                style={{
                  transition: 'stroke-dashoffset 2.0s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'stroke-dashoffset',
                }}
              />

              {/* Pulsing Signal Dot at the Tip of the Line */}
              <g
                className="transition-all duration-700"
                style={{
                  opacity: isInView ? 1 : 0,
                  transitionDelay: '1.95s',
                }}
              >
                <circle cx="965" cy="105" r="7" fill="#10B981" opacity="0.35" className="animate-ping" />
                <circle cx="965" cy="105" r="4" fill="#008F2F" />
                <circle cx="965" cy="105" r="1.5" fill="#FFFFFF" />
              </g>
            </svg>

            {/* Decorative Floating Trust Badges along the Arch */}
            {/* Badge 1: Above EDGE card */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500"
              style={{
                left: '34.27%',
                top: '41%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '0.6s',
              }}
            >
              <div
                className="w-6 h-6 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_3px_10px_rgba(0,0,0,0.07)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
                title="Accredited Partner"
              >
                <Check className="w-3 h-3 text-emerald-600" strokeWidth={2.6} />
              </div>
            </div>

            {/* Badge 2: Below DU card */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500"
              style={{
                left: '55.27%',
                top: '79%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '1.05s',
              }}
            >
              <div
                className="w-6 h-6 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_3px_10px_rgba(0,0,0,0.07)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
                title="Official MoU"
              >
                <Sparkles className="w-3 h-3 text-amber-500" strokeWidth={2.2} />
              </div>
            </div>

            {/* Badge 3: Above Swisscontact card */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500"
              style={{
                left: '65.73%',
                top: '39%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '1.35s',
              }}
            >
              <div
                className="w-6 h-6 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_3px_10px_rgba(0,0,0,0.07)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
                title="International Trust"
              >
                <Shield className="w-3 h-3 text-emerald-600" strokeWidth={2.2} />
              </div>
            </div>

            {/* 6 Middle-Aligned Transparent Blur Cards (Refined Compact Sizing) */}
            {featuredPartners.map((partner, idx) => {
              const layout = cardLayout[idx];
              return (
                <div
                  key={partner.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    left: `${layout.xPct}%`,
                    top: `${layout.yPct}%`,
                  }}
                >
                  <div
                    onClick={() => onPartnerClick?.(partner)}
                    className={`
                      w-[86px] sm:w-[96px] lg:w-[104px]
                      h-[66px] sm:h-[74px] lg:h-[80px]
                      rounded-[18px] sm:rounded-[22px]
                      p-2.5 sm:p-3
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-500 ease-out
                      group relative select-none
                    `}
                    style={{
                      background: 'rgba(255, 255, 255, 0.65)',
                      backdropFilter: 'blur(18px) saturate(135%)',
                      WebkitBackdropFilter: 'blur(18px) saturate(135%)',
                      border: '1.5px solid rgba(255, 255, 255, 0.9)',
                      boxShadow:
                        '0 10px 24px -5px rgba(0, 35, 15, 0.07), 0 3px 8px -2px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 1)',
                      opacity: isInView ? 1 : 0,
                      transform: isInView
                        ? 'translateY(0) scale(1)'
                        : 'translateY(20px) scale(0.85)',
                      transitionDelay: `${layout.delay}s`,
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={partner.name}
                  >
                    {/* Hover Specular Light Sweep */}
                    <div
                      className="absolute inset-0 rounded-[18px] sm:rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 60%)',
                        boxShadow:
                          '0 14px 28px -6px rgba(0, 143, 47, 0.2), inset 0 0 0 1.5px rgba(0, 143, 47, 0.3)',
                      }}
                    />

                    {/* Partner Logo */}
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      loading="lazy"
                      draggable={false}
                      className="max-h-[30px] sm:max-h-[35px] lg:max-h-[38px] max-w-[62px] sm:max-w-[72px] lg:max-w-[80px] w-auto h-auto object-contain select-none transition-transform duration-300 group-hover:scale-108"
                    />

                    {/* Tooltip on Hover */}
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-30 whitespace-nowrap bg-slate-900/90 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full shadow-lg">
                      {partner.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Futuristic 3D Glass Handshake Visual: Minimal, Pure Transparent Graphic, No Card */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
              style={{
                left: '87.73%',
                top: '23.44%',
              }}
            >
              <div
                className="w-20 sm:w-24 lg:w-28 flex items-center justify-center transition-all duration-700 ease-out group select-none cursor-pointer"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView
                    ? 'translateY(0) scale(1) rotate(-4deg)'
                    : 'translateY(20px) scale(0.75) rotate(0deg)',
                  transitionDelay: '1.65s',
                }}
                title="Strategic Trust &amp; Institutional Partnership"
              >
                {/* Pure Transparent 3D Glass Handshake Visual - Minimal without card */}
                <img
                  src="/assets/partners/handshake_glass_3d.png"
                  alt="3D Glass Futuristic Handshake - Trust &amp; Partnership"
                  className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:scale-112 group-hover:-rotate-3"
                  style={{
                    filter: 'drop-shadow(0 6px 14px rgba(0, 143, 47, 0.14))',
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

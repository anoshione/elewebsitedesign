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

  // IntersectionObserver to trigger animation once when scrolled into view
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Disconnect once triggered so it never re-fires or causes layout thrashing
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 6 Featured Partners
  const featuredPartners = FEATURED_PARTNER_IDS.map(
    (id) => PARTNERS_AND_CLIENTS.find((p) => p.id === id) || PARTNERS_AND_CLIENTS[0]
  );

  // Shifted UP coordinates in 1100x210 viewBox to remove empty blank vertical space
  const cardLayout = [
    { xPct: 23.82, yPct: 49.0, delay: 0.15 }, // Card 0: ICT Division
    { xPct: 34.27, yPct: 56.5, delay: 0.38 }, // Card 1: EDGE
    { xPct: 44.73, yPct: 61.0, delay: 0.61 }, // Card 2: Bangladesh Army
    { xPct: 55.27, yPct: 61.0, delay: 0.84 }, // Card 3: Dhaka University
    { xPct: 65.73, yPct: 56.5, delay: 1.07 }, // Card 4: BITM
    { xPct: 76.18, yPct: 49.0, delay: 1.30 }, // Card 5: Swisscontact
  ];

  // SVG Arch Path shifted up to match tighter vertical spacing
  const archPathD =
    'M 130,90 C 170,96 215,100 262,103 C 300,106 340,114 377,118 C 415,122 455,128 492,128 C 530,128 570,128 608,128 C 645,128 685,122 723,118 C 760,114 800,106 838,103 C 875,98 915,112 945,134 C 980,160 1030,154 1045,116 C 1055,82 1015,60 965,65';

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="py-12 sm:py-16 bg-[#FBFCF8] text-slate-900 overflow-hidden relative"
    >
      {/* Background Soft Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[260px] bg-emerald-500/6 rounded-full blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Title Block - Kept text exactly as requested with tightened vertical spacing */}
      <div className="container-1520 mb-4 sm:mb-6 text-left">
        <p className="section-tag">PARTNERS</p>
        <h2 className="heading-gradient-green">
          Our Trusted Partners &amp; Clients
        </h2>
        <p className="section-subtitle-max2 mt-1.5">
          We&apos;re proud to collaborate with leading government divisions, international NGOs, and technology enterprises.
        </p>
      </div>

      {/* Main Arch Visual Stage - Shifted up, eliminating blank space */}
      <div className="container-1520 relative">
        <div className="w-full overflow-x-auto lg:overflow-visible pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className="relative min-w-[900px] lg:min-w-0 w-full aspect-[1100/210]">
            {/* SVG Background: The Arch Line that draws smoothly on scroll */}
            <svg
              viewBox="0 0 1100 210"
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
                  <feGaussianBlur stdDeviation="2.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Animated Foreground Drawing Line (Invisible/Blank until drawn) */}
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

              {/* Glowing Signal Dot at the Tip of the Line */}
              <g
                className="transition-opacity duration-500"
                style={{
                  opacity: isInView ? 1 : 0,
                  transitionDelay: '1.95s',
                }}
              >
                <circle cx="965" cy="65" r="7" fill="#10B981" opacity="0.3" />
                <circle cx="965" cy="65" r="4" fill="#008F2F" />
                <circle cx="965" cy="65" r="1.5" fill="#FFFFFF" />
              </g>
            </svg>

            {/* Decorative Floating Trust Badges along the Arch */}
            {/* Badge 1: Above EDGE card */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500"
              style={{
                left: '34.27%',
                top: '32%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '0.6s',
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
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
                top: '84%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '1.05s',
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
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
                top: '30%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '1.35s',
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
                title="International Trust"
              >
                <Shield className="w-3 h-3 text-emerald-600" strokeWidth={2.2} />
              </div>
            </div>

            {/* 6 Middle-Aligned Transparent Blur Cards (Shifted UP) */}
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
                      w-[84px] sm:w-[94px] lg:w-[102px]
                      h-[64px] sm:h-[72px] lg:h-[78px]
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
                        : 'translateY(16px) scale(0.85)',
                      transitionDelay: `${layout.delay}s`,
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
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
                      decoding="async"
                      draggable={false}
                      className="max-h-[28px] sm:max-h-[34px] lg:max-h-[36px] max-w-[60px] sm:max-w-[70px] lg:max-w-[78px] w-auto h-auto object-contain select-none transition-transform duration-300 group-hover:scale-108"
                    />

                    {/* Tooltip on Hover */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-30 whitespace-nowrap bg-slate-900/90 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full shadow-lg">
                      {partner.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Futuristic 3D Handshake Visual: Dual Material (Solid Soft Green + Translucent Glass) */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
              style={{
                left: '87.73%',
                top: '28.0%',
              }}
            >
              <div
                className="w-22 sm:w-26 lg:w-30 flex items-center justify-center transition-all duration-700 ease-out group select-none cursor-pointer"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView
                    ? 'translateY(0) scale(1) rotate(-3deg)'
                    : 'translateY(16px) scale(0.75) rotate(0deg)',
                  transitionDelay: '1.60s',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                }}
                title="Strategic Trust &amp; Institutional Partnership"
              >
                {/* 3D Handshake: Static cached URL, decoding async, hardware-accelerated */}
                <img
                  src="/assets/partners/handshake_glass_3d.png"
                  alt="3D Futuristic Handshake - Solid Soft Green &amp; Transparent Glass"
                  className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:scale-112 group-hover:-rotate-2"
                  style={{
                    filter: 'drop-shadow(0 6px 14px rgba(0, 143, 47, 0.12))',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                  }}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

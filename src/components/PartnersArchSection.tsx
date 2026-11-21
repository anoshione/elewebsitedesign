import React, { useState, useEffect, useRef } from 'react';
import {
  PARTNERS_AND_CLIENTS,
  PartnerClientItem,
} from '../data/homeData';
import { Check, Sparkles, Shield, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [showAllDrawer, setShowAllDrawer] = useState(false);
  const [activePartner, setActivePartner] = useState<PartnerClientItem | null>(null);

  // IntersectionObserver to trigger animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.2,
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

  // Balanced arch positions in percentage of 1200x420 viewBox
  // Cards curve down in the center with clear spacing between each card
  const cardLayout = [
    { xPct: 7.0,  yPct: 52.0, delay: 0.15 }, // Card 0: ICT Division
    { xPct: 18.2, yPct: 57.5, delay: 0.42 }, // Card 1: EDGE
    { xPct: 29.5, yPct: 61.5, delay: 0.70 }, // Card 2: Bangladesh Army
    { xPct: 40.8, yPct: 61.5, delay: 0.98 }, // Card 3: Dhaka University
    { xPct: 52.0, yPct: 57.5, delay: 1.25 }, // Card 4: BITM
    { xPct: 63.2, yPct: 52.0, delay: 1.52 }, // Card 5: Swisscontact
  ];

  // SVG Arch Path through the 6 card centers swooping under and looping to the 3D handshake
  const archPathD =
    'M 10,195 C 35,206 58,214 84,218 C 130,227 172,236 218,241 C 265,247 308,258 354,258 C 400,258 444,258 490,258 C 536,258 578,247 624,241 C 670,236 712,227 758,218 C 804,208 845,218 880,236 C 925,260 985,275 1045,260 C 1110,242 1145,195 1115,150 C 1085,120 1030,125 985,142';

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="section-band bg-[#FBFCF8] text-slate-900 overflow-hidden relative"
    >
      {/* Background Ambient Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-emerald-500/5 rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Title Block - Kept exactly as requested */}
      <div className="container-1520 mb-6 sm:mb-10 text-left">
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
        <div className="w-full overflow-x-auto lg:overflow-visible pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className="relative min-w-[960px] lg:min-w-0 w-full aspect-[1200/420]">
            {/* SVG Background: The Arch Line that draws smoothly on scroll */}
            <svg
              viewBox="0 0 1200 420"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                {/* Luminous emerald-to-cyan gradient */}
                <linearGradient id="archLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#008F2F" stopOpacity="0.15" />
                  <stop offset="20%" stopColor="#008F2F" stopOpacity="0.75" />
                  <stop offset="60%" stopColor="#10B981" stopOpacity="0.95" />
                  <stop offset="85%" stopColor="#059669" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
                </linearGradient>

                {/* Soft glow filter */}
                <filter id="archLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
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
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#archLineGlow)"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={isInView ? 0 : 1}
                style={{
                  transition: 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'stroke-dashoffset',
                }}
              />

              {/* Pulsing Signal Dot at the Tip of the Line */}
              <g
                className="transition-all duration-700"
                style={{
                  opacity: isInView ? 1 : 0,
                  transitionDelay: '2.1s',
                }}
              >
                <circle cx="985" cy="142" r="9" fill="#10B981" opacity="0.3" className="animate-ping" />
                <circle cx="985" cy="142" r="5" fill="#008F2F" />
                <circle cx="985" cy="142" r="2" fill="#FFFFFF" />
              </g>
            </svg>

            {/* Decorative Floating Trust Badges along the Arch */}
            {/* Badge 1: Above EDGE card */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500"
              style={{
                left: '18.2%',
                top: '38%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '0.65s',
              }}
            >
              <div
                className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
                title="Accredited Partner"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2.6} />
              </div>
            </div>

            {/* Badge 2: Below DU card */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500"
              style={{
                left: '40.8%',
                top: '80%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '1.15s',
              }}
            >
              <div
                className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
                title="Official MoU"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.2} />
              </div>
            </div>

            {/* Badge 3: Above Swisscontact card */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500"
              style={{
                left: '63.2%',
                top: '33%',
                opacity: isInView ? 1 : 0,
                transform: `translate(-50%, -50%) scale(${isInView ? 1 : 0.6})`,
                transitionDelay: '1.65s',
              }}
            >
              <div
                className="w-7 h-7 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:scale-110 transition-all cursor-default"
                title="International Trust"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2.2} />
              </div>
            </div>

            {/* 6 Transparent Blur Cards positioned along the arch */}
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
                    onClick={() => {
                      setActivePartner(partner);
                      onPartnerClick?.(partner);
                    }}
                    className={`
                      w-[105px] sm:w-[122px] lg:w-[130px]
                      h-[80px] sm:h-[90px] lg:h-[96px]
                      rounded-[24px] sm:rounded-[28px]
                      p-3 sm:p-3.5
                      flex items-center justify-center
                      cursor-pointer
                      transition-all duration-500 ease-out
                      group relative select-none
                    `}
                    style={{
                      background: 'rgba(255, 255, 255, 0.65)',
                      backdropFilter: 'blur(20px) saturate(140%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                      border: '1.5px solid rgba(255, 255, 255, 0.9)',
                      boxShadow:
                        '0 12px 30px -6px rgba(0, 35, 15, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04), inset 0 1.5px 1px rgba(255, 255, 255, 1)',
                      opacity: isInView ? 1 : 0,
                      transform: isInView
                        ? 'translateY(0) scale(1)'
                        : 'translateY(24px) scale(0.85)',
                      transitionDelay: `${layout.delay}s`,
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={partner.name}
                  >
                    {/* Hover Specular Light Sweep */}
                    <div
                      className="absolute inset-0 rounded-[24px] sm:rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 60%)',
                        boxShadow:
                          '0 18px 36px -8px rgba(0, 143, 47, 0.22), inset 0 0 0 1.5px rgba(0, 143, 47, 0.35)',
                      }}
                    />

                    {/* Partner Logo */}
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      loading="lazy"
                      draggable={false}
                      className="max-h-[40px] sm:max-h-[46px] lg:max-h-[50px] max-w-[78px] sm:max-w-[96px] lg:max-w-[104px] w-auto h-auto object-contain select-none transition-transform duration-300 group-hover:scale-108"
                    />

                    {/* Tooltip on Hover */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-30 whitespace-nowrap bg-slate-900/90 text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-lg">
                      {partner.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Futuristic 3D Glass Handshake Visual at the end of the line */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: '84.5%',
                top: '32%',
              }}
            >
              <div
                className="w-[205px] sm:w-[235px] lg:w-[255px] rounded-[32px] p-4 relative transition-all duration-700 ease-out group select-none hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.72)',
                  backdropFilter: 'blur(24px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(140%)',
                  border: '1.5px solid rgba(255, 255, 255, 0.95)',
                  boxShadow:
                    '0 20px 48px -10px rgba(0, 45, 18, 0.16), 0 8px 24px -4px rgba(6, 182, 212, 0.14), inset 0 2px 2px rgba(255, 255, 255, 1)',
                  opacity: isInView ? 1 : 0,
                  transform: isInView
                    ? 'translateY(0) scale(1)'
                    : 'translateY(28px) scale(0.85)',
                  transitionDelay: '1.85s',
                }}
              >
                {/* Luminous Glow aura behind the 3D handshake */}
                <div
                  className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/25 via-cyan-400/20 to-transparent rounded-[36px] blur-xl opacity-80 pointer-events-none group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                />

                {/* 3D Glass Futuristic Handshake Transparent PNG */}
                <div className="relative w-full h-24 sm:h-28 flex items-center justify-center">
                  <img
                    src="/assets/partners/handshake_glass_3d.png"
                    alt="3D Glass Futuristic Handshake - Institutional Trust &amp; Partnership"
                    className="w-full h-full object-contain select-none drop-shadow-md transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                </div>

                {/* Trust Label Pill */}
                <div className="mt-2.5 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Strategic Trust &amp; MoU</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: See All 14 Partners Toggle */}
        <div className="mt-4 sm:mt-6 flex flex-col items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowAllDrawer((prev) => !prev)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-800 glass-btn transition-all duration-200 hover:text-emerald-800 hover:border-emerald-500/40 cursor-pointer shadow-sm"
          >
            <span>{showAllDrawer ? 'Hide Extended List' : 'View All 14 Partners & Government Clients'}</span>
            {showAllDrawer ? (
              <ChevronUp className="w-4 h-4 text-emerald-700" />
            ) : (
              <ChevronDown className="w-4 h-4 text-emerald-700" />
            )}
          </button>

          {/* Smooth Collapsible Drawer for All 14 Partners */}
          {showAllDrawer && (
            <div className="w-full max-w-5xl mt-3 p-5 sm:p-7 rounded-[32px] bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_16px_40px_-8px_rgba(0,35,15,0.08)] animate-in fade-in zoom-in-95 duration-300">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 text-center">
                All Accredited Government, Academic &amp; Industry Collaborators
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                {PARTNERS_AND_CLIENTS.map((partner) => (
                  <div
                    key={`all-${partner.id}`}
                    onClick={() => {
                      setActivePartner(partner);
                      onPartnerClick?.(partner);
                    }}
                    className="rounded-[22px] bg-white border border-slate-200/80 p-3 flex flex-col items-center justify-center gap-2 h-24 hover:-translate-y-1 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
                    title={partner.name}
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-9 max-w-[85px] w-auto h-auto object-contain transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="text-[10px] text-slate-600 font-medium text-center line-clamp-1">
                      {partner.name.split('-')[0].trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

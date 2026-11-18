import React, { useEffect, useRef, useState } from 'react';
import { Youtube } from 'lucide-react';
import { GENERATED_ASSETS, ResilientPhoto } from './Graphics';
import heroImage from '../assets/images/hero_1920x1080.png';

interface HeroAndTrustProps {
  onJoinSeminar: () => void;
  onWatchVideo: () => void;
}

/** Hook for smooth, tangible count-up on scroll */
function useCountUp(end: number, isVisible: boolean, duration: number = 2800): string {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic for a satisfying, visible deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return `${count.toLocaleString()}+`;
}

/* ---------- Trust Section building blocks (reference-matched grid) ---------- */

const TRUST_TILE_MIN_H = 'min-h-[230px] lg:min-h-[250px]';

const TrustStatTile: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div
    className={`rounded-[20px] ${TRUST_TILE_MIN_H} flex flex-col items-center justify-center text-center px-6 py-8 bg-[#F1F2F4]/85 backdrop-blur-md border border-white/85 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.18)] transition-transform duration-200 hover:-translate-y-1`}
  >
    <span className="font-display text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-[#008F2F] leading-none tabular-nums">
      {value}
    </span>
    <span className="mt-2.5 font-display text-base lg:text-lg font-bold uppercase tracking-[0.02em] text-slate-800">
      {label}
    </span>
  </div>
);

const TrustFeaturedTile: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div
    className={`relative rounded-[22px] ${TRUST_TILE_MIN_H} overflow-hidden bg-[#1E4319] shadow-[0_16px_38px_-12px_rgba(20,60,25,0.6)] transition-transform duration-200 hover:-translate-y-1`}
  >
    {/* 3D Papercut Ribbon Background Artwork: Positioned so the fanning fins on the right and sweeping ribbons are prominent */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img
        src="/assets/trust/student_card_papercut_bg.jpg"
        alt="Abstract 3D papercut green ribbons"
        className="w-full h-full object-cover object-right scale-105 select-none"
      />
    </div>

    {/* Floating Frosted Glass Panel: Sharp ribbons show around the perimeter, softly blurred inside */}
    <div
      className="absolute inset-[10px] sm:inset-[12px] rounded-[16px] sm:rounded-[18px] border border-white/40 bg-white/[0.05] backdrop-blur-[7px] shadow-[inset_0_1.5px_1.5px_rgba(255,255,255,0.55),0_10px_24px_-6px_rgba(0,0,0,0.35)] z-10 flex flex-col items-center justify-center text-center text-white px-4"
    >
      <span className="font-display text-4xl sm:text-[2.65rem] lg:text-[2.85rem] font-black tracking-tight leading-none tabular-nums text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
        {value}
      </span>
      <span className="mt-2.5 font-display text-sm sm:text-base lg:text-[17px] font-bold uppercase tracking-[0.05em] text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
        {label}
      </span>
    </div>
  </div>
);

const TrustPhotoTile: React.FC<{ src: string; alt: string; className?: string }> = ({
  src,
  alt,
  className = '',
}) => (
  <div className={`relative rounded-[20px] overflow-hidden ${TRUST_TILE_MIN_H} ${className}`}>
    <ResilientPhoto src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
  </div>
);

export const HeroAndTrust: React.FC<HeroAndTrustProps> = ({
  onJoinSeminar,
  onWatchVideo,
}) => {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const countEntrepreneurs = useCountUp(4000, statsVisible, 2600);
  const countStudents = useCountUp(100000, statsVisible, 3000);
  const countFreelancers = useCountUp(42100, statsVisible, 2800);
  const countJobs = useCountUp(18000, statsVisible, 2700);
  return (
    <>
      {/* SECTION 1 (HERO): 1920x1080 full-bleed hero banner */}
      <section
        id="top"
        className="relative overflow-hidden bg-[#0A2E1A] text-white w-full max-w-[1920px] mx-auto min-h-[640px] md:min-h-[720px] lg:h-[1080px] flex items-center pt-32 pb-16 lg:pt-36 lg:pb-20"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <img
            src={heroImage}
            alt="Students collaborating at e-Learning & Earning Ltd."
            draggable={false}
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Subtle ambient gradient protection for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent lg:from-black/40 lg:via-transparent" />
        </div>

        <div className="container-1520 relative z-10 w-full">
          <div className="max-w-2xl lg:max-w-3xl -translate-y-8">
            <h1
              className="font-display font-extrabold tracking-[-0.02em] leading-[1.12] text-white [text-shadow:0_3px_24px_rgba(0,0,0,0.6)] text-3xl sm:text-4xl md:text-[46px] lg:text-[56px] xl:text-[56px]"
            >
              Best Freelancing IT<br />
              Training Institute<br />
              <span className="text-[#22C55E]">In Bangladesh</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg lg:text-[20px] text-white/95 leading-[1.6] max-w-[526px] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
              Transform your IT potential into global earnings. Master in-demand technical skills
              at Bangladesh&apos;s top freelancing institute and launch your international career
              from your hometown.
            </p>

            <div className="mt-8 inline-flex flex-col items-stretch gap-[22px] w-full sm:w-fit max-w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">
                <a
                  href="#courses"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center h-[52px] px-8 text-[15px] font-semibold text-[#0E3A22] bg-white hover:bg-slate-100 rounded-full transition-all whitespace-nowrap shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] cursor-pointer text-center"
                >
                  Explore Courses
                </a>

                <button
                  type="button"
                  onClick={onJoinSeminar}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center h-[52px] px-8 text-[15px] font-semibold text-white btn-gradient-green rounded-full transition-all whitespace-nowrap cursor-pointer text-center"
                >
                  Join Free Seminar
                </button>
              </div>

              <button
                type="button"
                onClick={onWatchVideo}
                className="glass w-full h-[52px] px-7 inline-flex items-center justify-center gap-2.5 rounded-full text-[15px] font-medium text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 hover:bg-white/25"
                style={{
                  background: 'rgba(255, 255, 255, 0.17)',
                  backdropFilter: 'blur(19px) saturate(100%)',
                  WebkitBackdropFilter: 'blur(19px) saturate(100%)',
                  border: '1px solid rgba(255, 255, 255, 0)',
                  boxShadow:
                    '0 8px 32px rgba(0, 0, 0, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.15)',
                }}
              >
                <span className="inline-flex w-7 h-7 rounded-full bg-white/20 items-center justify-center shrink-0">
                  <Youtube className="w-4 h-4 text-white" strokeWidth={2} />
                </span>
                Watch on Youtube
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST — glass stat tiles + campus photos (reference grid) */}
      <section id="trust" className="py-10 lg:py-12 bg-[#FBFCF8]">
        <div className="container-1520">
          <div className="mb-8 max-w-3xl">
            <p className="section-tag">TRUSTED PLATFORM</p>
            <h2 className="heading-gradient-green">
              Your Trusted Learning Platform
            </h2>
            <p className="section-subtitle-max2 mt-3">
              Bangladesh&apos;s leading skill development &amp; IT training ecosystem — equipping students, freelancers, and entrepreneurs with verifiable skills and career outcomes.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <TrustStatTile value={countEntrepreneurs} label="ENTREPRENEURS" />
            <TrustFeaturedTile value={countStudents} label="STUDENTS TRAINED" />
            <TrustPhotoTile
              src={GENERATED_ASSETS.campusLab}
              alt="Students training in the campus computer lab"
              className="sm:col-span-2"
            />
            <TrustStatTile value={countFreelancers} label="SUCCESSFUL FREELANCER" />
            <TrustStatTile value={countJobs} label="JOB PLACED" />
            <TrustPhotoTile
              src={GENERATED_ASSETS.heroStudents}
              alt="Students collaborating on the ELE campus"
            />
            <TrustPhotoTile
              src={GENERATED_ASSETS.campusSeminar}
              alt="Speaker addressing the audience from the podium at an ELE summit"
            />
          </div>
        </div>
      </section>
    </>
  );
};

import React from 'react';
import { Youtube } from 'lucide-react';
import { GENERATED_ASSETS, ResilientPhoto } from './Graphics';
import heroImage from '../assets/images/hero_1920x1080.png';

interface HeroAndTrustProps {
  onJoinSeminar: () => void;
  onWatchVideo: () => void;
}

/* ---------- Trust Section building blocks (reference-matched grid) ---------- */

const TRUST_TILE_MIN_H = 'min-h-[230px] lg:min-h-[250px]';

const TrustStatTile: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div
    className={`rounded-[20px] ${TRUST_TILE_MIN_H} flex flex-col items-center justify-center text-center px-6 py-8 bg-[#F1F2F4]/85 backdrop-blur-md border border-white/85 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.18)] transition-transform duration-200 hover:-translate-y-1`}
  >
    <span className="font-display text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-[#1B2668] leading-none tabular-nums">
      {value}
    </span>
    <span className="mt-2.5 font-display text-base lg:text-lg font-bold uppercase tracking-[0.02em] text-[#1B2668]">
      {label}
    </span>
  </div>
);

const TrustFeaturedTile: React.FC = () => (
  <div
    className={`relative rounded-[20px] ${TRUST_TILE_MIN_H} overflow-hidden bg-gradient-to-br from-[#4E8A38] via-[#3B6B2C] to-[#2A4F1F] shadow-[0_14px_34px_-14px_rgba(20,60,25,0.55)]`}
  >
    {/* Silk sheen streaks */}
    <div
      className="absolute -top-14 -left-8 w-64 h-36 rounded-[40%] bg-white/25 blur-2xl rotate-[-16deg] pointer-events-none"
      aria-hidden="true"
    />
    <div
      className="absolute top-1/3 -right-10 w-40 h-24 rounded-[40%] bg-emerald-200/25 blur-2xl rotate-[12deg] pointer-events-none"
      aria-hidden="true"
    />
    {/* Inner glass panel */}
    <div
      className="absolute inset-[9px] rounded-2xl border border-white/25 bg-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
      aria-hidden="true"
    />
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
      <span className="font-display text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-none tabular-nums">
        100,000+
      </span>
      <span className="mt-2.5 font-display text-base lg:text-lg font-bold uppercase tracking-[0.02em]">
        Students Trained
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
          <div className="max-w-2xl lg:max-w-3xl">
            <h1
              className="font-display font-extrabold tracking-[-0.02em] leading-[1.12] text-white [text-shadow:0_3px_24px_rgba(0,0,0,0.6)] text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] xl:text-[4.15rem]"
            >
              Best Freelancing IT<br />
              Training Institute<br />
              <span className="text-[#22C55E]">In Bangladesh</span>
            </h1>

            <p className="mt-5 text-[15px] sm:text-base lg:text-[17px] text-white/95 leading-[1.65] max-w-[54ch] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
              Transform your IT potential into global earnings. Master in-demand technical skills
              at Bangladesh&apos;s top freelancing institute and launch your international career
              from your hometown.
            </p>

            <div className="mt-8 inline-flex flex-col items-stretch gap-3.5 w-full sm:w-fit max-w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">
                <a
                  href="#courses"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center h-12 px-7 text-sm font-semibold text-[#0E3A22] bg-white hover:bg-slate-100 rounded-full transition-all whitespace-nowrap shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] cursor-pointer text-center"
                >
                  Explore Courses
                </a>

                <button
                  type="button"
                  onClick={onJoinSeminar}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center h-12 px-7 text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-full transition-all whitespace-nowrap cursor-pointer shadow-[0_10px_28px_-10px_rgba(22,163,74,0.6)] text-center"
                >
                  Join Free Seminar
                </button>
              </div>

              <button
                type="button"
                onClick={onWatchVideo}
                className="glass w-full h-12 px-6 inline-flex items-center justify-center gap-2.5 rounded-full text-sm font-medium text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 hover:bg-white/25"
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
      <section id="trust" className="py-10 lg:py-12 bg-white">
        <div className="container-1520">
          <div className="mb-8 max-w-xl">
            <h2 className="font-display text-3xl lg:text-[2.5rem] font-bold tracking-tight text-green-600">
              Your Trusted Learning Platform
            </h2>
            <p className="mt-3 text-[15px] leading-[1.65] text-slate-500 max-w-md">
              Your Trusted Real Estate Advisor — helping you find the perfect home with expert
              guidance, transparent deals, and personalized support every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <TrustStatTile value="4K+" label="Entrepreneurs" />
            <TrustFeaturedTile />
            <TrustPhotoTile
              src={GENERATED_ASSETS.campusLab}
              alt="Students training in the campus computer lab"
              className="sm:col-span-2"
            />
            <TrustStatTile value="410K" label="Successful Freelancer" />
            <TrustStatTile value="180K" label="Job Placed" />
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

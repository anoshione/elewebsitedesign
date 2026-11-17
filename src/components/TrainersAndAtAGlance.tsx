import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Compass,
  Headset,
  Layers,
  MapPin,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { AT_A_GLANCE_METRICS, TRAINERS } from '../data/homeData';
import trainerMaleImg from '../assets/images/trainer_male.png';
import trainerFemaleImg from '../assets/images/trainer_female.png';

interface TrainersAndAtAGlanceProps {
  onOpenSeminarModal: () => void;
}

const GLANCE_ICONS = {
  branches: Building2,
  mentors: Users,
  tracks: Layers,
  completion: TrendingUp,
  support: Headset,
  districts: Compass,
} as const;

export const TrainersAndAtAGlance: React.FC<TrainersAndAtAGlanceProps> = ({
  onOpenSeminarModal,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [showAllTrainers, setShowAllTrainers] = useState(false);

  const visibleTrainers = showAllTrainers
    ? TRAINERS
    : TRAINERS.slice(pageIndex * 2, pageIndex * 2 + 2);

  const totalPages = Math.ceil(TRAINERS.length / 2);

  return (
    <>
      {/* SECTION 8: TRAINERS (Reference-Matched Pixel-Perfect Blank White Design) */}
      <section id="trainers" className="section-band bg-white text-slate-900 py-16 lg:py-20">
        <div className="container-1520">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold tracking-tight text-[#16A34A] leading-tight">
                Learn From Active Industry Professionals
              </h2>
              <p className="mt-2.5 text-xs sm:text-[13px] lg:text-[14px] text-slate-500 leading-relaxed max-w-3xl">
                Our instructors practice what they teach every single day. Instead of outdated theory, you gain direct access to real-world workflows, modern toolsets &amp; AI, and current industry standards. Whether mastering React or crafting high-converting copy, you learn the exact skills top employers and international clients demand right now.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <button
                type="button"
                onClick={() => setShowAllTrainers((prev) => !prev)}
                className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-slate-800 glass-btn rounded-full transition-all whitespace-nowrap cursor-pointer hover:text-emerald-800"
              >
                {showAllTrainers ? 'Show Featured' : 'See All'}
              </button>

              {!showAllTrainers && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPageIndex((prev) => (prev - 1 + totalPages) % totalPages)
                    }
                    className="w-10 h-10 rounded-full glass-btn text-slate-800 flex items-center justify-center shrink-0 aspect-square transition-colors cursor-pointer"
                    aria-label="Previous teachers"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-800" strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPageIndex((prev) => (prev + 1) % totalPages)}
                    className="w-10 h-10 rounded-full glass-btn text-slate-800 flex items-center justify-center shrink-0 aspect-square transition-colors cursor-pointer"
                    aria-label="Next teachers"
                  >
                    <ArrowRight className="w-4 h-4 text-slate-800" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {visibleTrainers.map((trainer, index) => {
              const photo =
                trainer.accentHue === 'teal' || trainer.accentHue === 'amber' || index % 2 === 1
                  ? trainerFemaleImg
                  : trainerMaleImg;

              return (
                <article
                  key={trainer.id}
                  className="relative rounded-[32px] sm:rounded-[36px] bg-white border border-[#EBECEF] p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row items-center sm:items-stretch shadow-[0_10px_35px_-12px_rgba(0,0,0,0.06)] overflow-hidden"
                >
                  {/* Left: Cutout Teacher Photo (Bigger, Positioned on Left) */}
                  <div className="relative z-0 w-[240px] sm:w-[270px] md:w-[290px] lg:w-[310px] xl:w-[330px] shrink-0 flex items-end justify-center self-center sm:self-end pt-2 sm:pt-4">
                    <img
                      src={photo}
                      alt={trainer.name}
                      draggable={false}
                      className="w-full h-auto max-h-[350px] sm:max-h-[390px] lg:max-h-[420px] object-contain object-bottom select-none transform sm:scale-110 sm:origin-bottom-left"
                    />
                  </div>

                  {/* Right: Inner Details Section with Transparent Blur Glass Effect Over Teacher */}
                  <div className="relative z-10 w-full flex-1 -mt-8 sm:mt-0 sm:-ml-16 md:-ml-20 lg:-ml-24 rounded-[24px] sm:rounded-[28px] glass p-5 sm:p-6 lg:p-6.5 flex flex-col justify-between">
                    <div>
                      {/* Top Badge Row */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-slate-100/90 text-slate-700 text-xs font-semibold tracking-wide">
                          Trainer
                        </span>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-800">
                            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                            {trainer.rating}
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-[#16A34A]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" strokeWidth={2} />
                            Certified
                          </span>
                        </div>
                      </div>

                      {/* Trainer Name & Role */}
                      <h3 className="mt-3.5 font-display text-lg sm:text-xl font-bold text-[#16A34A] leading-snug">
                        {trainer.name}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-0.5">
                        {trainer.department}
                      </p>

                      {/* Stats Box */}
                      <div className="mt-4 rounded-2xl bg-[#F8F9FA]/80 border border-[#F0F1F3]/90 px-3.5 sm:px-4 py-3 flex items-center justify-between text-center backdrop-blur-sm">
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-extrabold text-sm sm:text-base text-slate-900 tabular-nums">
                            {trainer.projects}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5 truncate">
                            PROJECTS
                          </div>
                        </div>
                        <div className="w-[1px] h-7 bg-slate-200/80 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-extrabold text-sm sm:text-base text-slate-900 tabular-nums">
                            {trainer.students}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5 truncate">
                            STUDENTS
                          </div>
                        </div>
                        <div className="w-[1px] h-7 bg-slate-200/80 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-extrabold text-sm sm:text-base text-slate-900 tabular-nums">
                            {trainer.experience}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5 truncate">
                            YEARS EXPERIENCE
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message to Students */}
                    <div className="mt-4 border-l-2 border-[#16A34A] pl-3.5 py-0.5">
                      <div className="text-xs font-bold text-[#16A34A]">
                        Message to Students
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-1 line-clamp-3">
                        {trainer.message}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 9: ELE AT A GLANCE (Light Prism Backdrop + Translucent Glass Metric Cards) */}
      <section id="at-a-glance" className="section-band bg-glass-prism text-slate-900">
        <div className="container-1520">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <p className="section-kicker text-emerald-700 mb-1.5">
                Nationwide Footprint · e-Learning &amp; Earning Ltd.
              </p>
              <h2 className="section-heading text-slate-900" style={{ textWrap: 'balance' }}>
                ELE at a Glance
              </h2>
              <p className="mt-3 section-subtitle text-slate-600 max-w-[50ch]">
                Since 2018, e-Learning &amp; Earning Ltd. has built skilled IT professionals and
                self-reliant freelancers across all 64 districts of Bangladesh through modern campus
                labs, industry mentors, and international curricula.
              </p>

              <div className="mt-5 space-y-2.5 text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full glass flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
                  </div>
                  <span>Head Office: Kallyanpur, Mirpur Road, Dhaka-1207</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full glass flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
                  </div>
                  <span>NSDA Registered Training Provider &amp; ISO 9001:2015 Certified</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={onOpenSeminarModal}
                  className="h-12 px-7 text-sm font-semibold btn-emerald-glow rounded-full transition-all cursor-pointer shadow-lg shadow-emerald-950/20"
                >
                  Book Free Career Counseling
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {AT_A_GLANCE_METRICS.map((item) => {
                const Icon = GLANCE_ICONS[item.id as keyof typeof GLANCE_ICONS] || Layers;
                return (
                  <div
                    key={item.id}
                    className="rounded-[24px] glass p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-emerald-600 shrink-0">
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <div className="font-display text-2xl font-extrabold text-[#16A34A] tabular-nums leading-none">
                        {item.value}
                      </div>
                    </div>
                    <div className="mt-3.5">
                      <h3 className="font-display text-base font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 leading-[1.55]">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

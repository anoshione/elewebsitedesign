import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { TRAINERS } from '../data/homeData';
import trainerMaleImg from '../assets/images/trainer_male.png';
import trainerFemaleImg from '../assets/images/trainer_female.png';

interface TrainersAndAtAGlanceProps {
  onOpenSeminarModal?: () => void;
}

export const TrainersAndAtAGlance: React.FC<TrainersAndAtAGlanceProps> = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [showAllTrainers, setShowAllTrainers] = useState(false);

  const visibleTrainers = showAllTrainers
    ? TRAINERS
    : TRAINERS.slice(pageIndex * 2, pageIndex * 2 + 2);

  const totalPages = Math.ceil(TRAINERS.length / 2);

  return (
    <>
      {/* SECTION 8: TRAINERS (Solid #FBFCF8 Design) */}
      <section id="trainers" className="section-band bg-[#FBFCF8] text-slate-900 py-16 lg:py-20">
        <div className="container-1520">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <p className="section-tag">INSTRUCTORS</p>
              <h2 className="heading-gradient-green">
                Learn From Active Industry Professionals
              </h2>
              <p className="section-subtitle-max2 mt-2.5">
                Our instructors practice what they teach daily, giving you direct access to real-world workflows, modern toolsets &amp; AI, and current industry standards.
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
                    className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer"
                    aria-label="Previous teachers"
                  >
                    <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPageIndex((prev) => (prev + 1) % totalPages)}
                    className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer"
                    aria-label="Next teachers"
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
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
                  className="group relative rounded-[32px] bg-white border border-[#EBECEF] p-3.5 flex flex-col sm:flex-row items-center sm:items-stretch shadow-[0_10px_35px_-12px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_45px_-12px_rgba(0,143,47,0.18)]"
                >
                  {/* Left: Cutout Teacher Photo (Bigger, Positioned on Left) */}
                  <div className="relative z-0 w-[240px] sm:w-[270px] md:w-[290px] lg:w-[310px] xl:w-[330px] shrink-0 flex items-end justify-center self-center sm:self-end pt-2 sm:pt-4">
                    <img
                      src={photo}
                      alt={trainer.name}
                      draggable={false}
                      className="w-full h-auto max-h-[350px] sm:max-h-[390px] lg:max-h-[420px] object-contain object-bottom select-none transform sm:scale-110 sm:origin-bottom-left transition-transform duration-500 group-hover:scale-115"
                    />
                  </div>

                  {/* Right: Inner Details Section with Transparent Blur Glass Effect Over Teacher */}
                  <div className="relative z-10 w-full flex-1 -mt-8 sm:mt-0 sm:-ml-16 md:-ml-20 lg:-ml-24 rounded-[24px] glass p-5 sm:p-6 lg:p-6.5 flex flex-col justify-between card-cta-glow">
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
                      <div className="mt-4 rounded-[24px] bg-[#F8F9FA]/80 border border-[#F0F1F3]/90 px-3.5 sm:px-4 py-3 flex items-center justify-between text-center backdrop-blur-sm">
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
    </>
  );
};

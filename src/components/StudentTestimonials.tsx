import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { STUDENT_TESTIMONIALS } from '../data/homeData';
import { CircleStudentAvatar } from './Graphics';

export const StudentTestimonials: React.FC = () => {
  const total = STUDENT_TESTIMONIALS.length;
  const [startIndex, setStartIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const visibleReviews = showAll
    ? STUDENT_TESTIMONIALS
    : Array.from({ length: 3 }).map((_, i) => STUDENT_TESTIMONIALS[(startIndex + i) % total]);

  return (
    <section
      id="student-testimonials"
      className="section-band bg-glass-silk text-slate-900"
    >
      <div className="container-1520">
        {/* Top Header Row: Left-Aligned Title & Subtitle + Top-Right Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div className="max-w-2xl text-left">
            <h2 className="section-heading text-[#1CA24A]" style={{ textWrap: 'balance' }}>
              What Our Students Say
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-600 text-left">
              Real reviews from our learners across Bangladesh transitioning into successful IT careers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-slate-800 glass-btn rounded-full transition-all whitespace-nowrap cursor-pointer hover:text-emerald-800"
            >
              {showAll ? 'Show Carousel' : 'See All'}
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-full glass-btn flex items-center justify-center shrink-0 aspect-square text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Previous testimonials"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-full glass-btn flex items-center justify-center shrink-0 aspect-square text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Next testimonials"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Cards Grid (Reference Layout: Avatar overlapping top-left, review quote, divider, name + course + stars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 pt-5">
          {visibleReviews.map((item) => (
            <article
              key={item.id}
              className="group relative rounded-[26px] glass pt-10 pb-6 px-6 sm:px-7 flex flex-col justify-between min-h-[250px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-12px_rgba(23,80,40,0.18)]"
            >
              {/* User Image: Floats at the top-left overlapping the card top border */}
              <div className="absolute -top-7 left-6 sm:left-7">
                <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-full overflow-hidden shadow-md ring-4 ring-white border border-white/60 bg-emerald-50">
                  <CircleStudentAvatar
                    name={item.name}
                    hue={item.hue}
                    imageSrc={item.avatarImage}
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Review Text */}
              <div className="pt-1">
                <p className="text-slate-700 text-[13.5px] sm:text-sm leading-relaxed text-left line-clamp-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Section: Divider line + Name, Course & Star Rating */}
              <div className="mt-6">
                <div className="border-t border-slate-900/10 mb-4" />
                <div className="flex items-center justify-between gap-3 text-left">
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-slate-900 text-sm sm:text-[15px] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                      {item.courseTrack}
                    </p>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0" aria-label={`${item.rating} stars`}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

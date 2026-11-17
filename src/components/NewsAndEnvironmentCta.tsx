import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MonitorCheck,
  Newspaper,
  Users2,
  Wifi,
} from 'lucide-react';
import { NEWS_ITEMS, NewsItem } from '../data/homeData';
import { GENERATED_ASSETS, ResilientPhoto, SilkBackdrop } from './Graphics';

interface NewsAndEnvironmentCtaProps {
  onSelectNews: (item: NewsItem) => void;
  onBookCampusVisit: () => void;
}

/** News photo slot — loads images from `public/assets/news/<id>.png`. Falls back to a soft gradient tile while a file is missing. */
const NewsPhoto: React.FC<{ id: string; title?: string; large?: boolean }> = ({
  id,
  title = '',
  large = false,
}) => {
  const [failed, setFailed] = useState(false);
  const aspect = large ? 'aspect-[16/10]' : 'aspect-[16/9]';

  useEffect(() => {
    setFailed(false);
  }, [id]);

  if (failed) {
    return (
      <div
        className={`w-full ${aspect} rounded-[16px] bg-gradient-to-br from-emerald-100 via-white to-emerald-200/80 flex items-center justify-center`}
        aria-hidden="true"
      >
        <Newspaper className="w-8 h-8 text-emerald-600/35" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <img
      src={`/assets/news/${id}.png`}
      alt={title}
      draggable={false}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-full ${aspect} object-cover rounded-[16px] select-none`}
    />
  );
};

/** Frosted glass circular arrow, matching the Departments section buttons. */
const GlassArrowButton: React.FC<{
  onClick: () => void;
  label: string;
  small?: boolean;
}> = ({ onClick, label, small = false }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`shrink-0 aspect-square inline-flex items-center justify-center rounded-full glass-btn text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
      small ? 'w-9 h-9 min-w-[36px] min-h-[36px]' : 'w-11 h-11 min-w-[44px] min-h-[44px]'
    }`}
  >
    <ArrowRight className={small ? 'w-4 h-4' : 'w-4.5 h-4.5'} strokeWidth={2} />
  </button>
);

export const NewsAndEnvironmentCta: React.FC<NewsAndEnvironmentCtaProps> = ({
  onSelectNews,
  onBookCampusVisit,
}) => {
  const [newsOffset, setNewsOffset] = useState(0);

  const featuredNews = NEWS_ITEMS[0];
  const secondaryNews = NEWS_ITEMS.slice(1);
  const orderedSecondary =
    newsOffset === 0
      ? secondaryNews
      : [...secondaryNews.slice(newsOffset), ...secondaryNews.slice(0, newsOffset)];

  return (
    <>
      {/* SECTION 10: NEWS FEED (Silk backdrop + frosted glass cards, reference-matched) */}
      <section id="news-feed" className="relative overflow-hidden section-band text-slate-900">
        <SilkBackdrop />

        <div className="container-1520 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
            <div className="min-w-0">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] font-bold tracking-tight text-[#1CA24A] leading-tight lg:whitespace-nowrap">
                Campus Updates &amp; Industry News Feed
              </h2>
              <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-600 xl:whitespace-nowrap">
                Latest institutional partnerships, scholarship drives, freelancing workshops, and
                placement fairs across Bangladesh.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <button
                type="button"
                onClick={() => onSelectNews(featuredNews)}
                className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-slate-800 glass-btn rounded-full transition-all whitespace-nowrap cursor-pointer hover:text-emerald-800"
              >
                See All
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setNewsOffset(
                      (prev) => (prev - 1 + secondaryNews.length) % secondaryNews.length
                    )
                  }
                  className="w-10 h-10 rounded-full glass-btn flex items-center justify-center shrink-0 aspect-square text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Previous news items"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => setNewsOffset((prev) => (prev + 1) % secondaryNews.length)}
                  className="w-10 h-10 rounded-full glass-btn flex items-center justify-center shrink-0 aspect-square text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Next news items"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Featured News Story */}
            <article className="rounded-[26px] glass p-3.5 flex flex-col">
              <button
                type="button"
                onClick={() => onSelectNews(featuredNews)}
                className="w-full text-left cursor-pointer rounded-[16px] block overflow-hidden shadow-sm"
                aria-label={`Read ${featuredNews.title}`}
              >
                <NewsPhoto id={featuredNews.id} title={featuredNews.title} large />
              </button>

              <div className="px-2 pt-4 pb-1.5 flex flex-col grow">
                <h3 className="font-display text-xl lg:text-[1.35rem] font-bold text-slate-900 leading-snug">
                  {featuredNews.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-[1.6] line-clamp-2">
                  {featuredNews.excerpt}
                </p>

                <div className="mt-auto pt-4 flex items-end justify-between gap-3">
                  <p className="text-xs text-slate-500 pb-1">
                    {featuredNews.category} · {featuredNews.date}
                  </p>
                  <GlassArrowButton
                    onClick={() => onSelectNews(featuredNews)}
                    label={`Read ${featuredNews.title}`}
                  />
                </div>
              </div>
            </article>

            {/* 2x2 Secondary News Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-fr">
              {orderedSecondary.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[24px] glass p-3 flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => onSelectNews(item)}
                    className="w-full text-left cursor-pointer rounded-[16px] block overflow-hidden shadow-sm"
                    aria-label={`Read ${item.title}`}
                  >
                    <NewsPhoto id={item.id} title={item.title} />
                  </button>

                  <div className="mt-auto px-1.5 pt-3 pb-0.5 flex items-end justify-between gap-2.5">
                    <h3 className="font-display text-[15px] font-bold text-slate-900 leading-snug line-clamp-3 min-w-0 flex-1">
                      {item.title}
                    </h3>
                    <GlassArrowButton
                      small
                      onClick={() => onSelectNews(item)}
                      label={`Read ${item.title}`}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: CTA BANNER (Light Prism Background + Translucent Glass Lab Environment Shell) */}
      <section id="learning-environment" className="section-band bg-[#EEF5F9] text-slate-900">
        <div className="container-1520">
          <div className="relative overflow-hidden rounded-[32px] glass text-slate-900 p-7 sm:p-9 lg:p-10 shadow-[0_16px_40px_-20px_rgba(23,80,40,0.18)]">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <ResilientPhoto
                src={GENERATED_ASSETS.campusLab}
                alt="High-spec student workstations at e-Learning & Earning Ltd. campus"
                className="w-full h-full object-cover opacity-48"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F4FBF7]/90 via-[#EBF6F0]/78 to-[#F0F4FA]/70 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <p className="section-kicker text-emerald-700">
                  Dedicated Campus &amp; Practice Ecosystem
                </p>
                <h2 className="mt-1.5 section-heading text-slate-900" style={{ textWrap: 'balance' }}>
                  A Conducive Environment Built for Mastery
                </h2>
                <p className="mt-2.5 section-subtitle text-slate-600 max-w-[54ch]">
                  Uninterrupted gigabit fiber internet, dual-monitor workstations, and post-class
                  mentor practice desks—engineered so every learner builds production-ready skills
                  without distraction.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onBookCampusVisit}
                    className="h-12 px-7 text-sm font-semibold btn-emerald-glow rounded-full transition-all cursor-pointer shadow-lg shadow-emerald-950/20"
                  >
                    Book a Campus Visit
                  </button>
                  <a
                    href="#courses"
                    className="inline-flex items-center justify-center h-12 px-7 text-sm font-semibold text-slate-800 glass-btn rounded-full transition-colors"
                  >
                    Explore Lab Tracks
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: MonitorCheck,
                    title: '1:1 Workstations',
                    desc: 'Dedicated dual-monitor & graphics-ready PCs in every lab.',
                    tag: 'Hardware',
                  },
                  {
                    icon: Users2,
                    title: 'In-Person Mentors',
                    desc: 'Practice beyond class hours with assistant lab instructors.',
                    tag: 'Mentorship',
                  },
                  {
                    icon: Wifi,
                    title: 'Fiber & Power Backup',
                    desc: 'Redundant generator backup and gigabit studio internet.',
                    tag: 'Infrastructure',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Focus Study Zones',
                    desc: 'Quiet workspaces built for client calls & capstone sprints.',
                    tag: 'Workspaces',
                  },
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="relative overflow-hidden rounded-2xl glass p-4.5 sm:p-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_-10px_rgba(16,185,129,0.2)] flex flex-col justify-between"
                    >
                      {/* Corner ambient glow */}
                      <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-400/15 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-400/25 transition-colors" />

                      {/* Large Watermark Icon: Bigger, no border, no background, watermark opacity */}
                      <div className="absolute top-3.5 right-3.5 pointer-events-none text-emerald-600/25 group-hover:text-emerald-600/40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                        <Icon className="w-14 h-14 sm:w-16 sm:h-16" strokeWidth={1.4} />
                      </div>

                      <div className="relative z-10">
                        {/* Category pill */}
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <span className="text-[10px] font-semibold text-emerald-800/80 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                            {feature.tag}
                          </span>
                        </div>

                        <h3 className="font-display text-[15px] sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                          {feature.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-600 leading-[1.6] pr-8 sm:pr-10">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

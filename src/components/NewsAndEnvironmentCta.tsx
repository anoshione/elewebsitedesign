import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Newspaper,
  Phone,
  Sparkles,
  Video,
} from 'lucide-react';
import { NEWS_ITEMS, NewsItem } from '../data/homeData';
import { GENERATED_ASSETS, ResilientPhoto, SilkBackdrop } from './Graphics';

interface NewsAndEnvironmentCtaProps {
  onSelectNews: (item: NewsItem) => void;
  onBookCampusVisit: () => void;
}

/** Renders titles containing mixed Latin and Bengali text with uniform font weight so Latin acronyms don't appear bold */
export const renderMixedTitle = (title: string) => {
  const parts = title.split(/(\([A-Za-z0-9\s-]+\)|[A-Za-z0-9-]+)/g);
  return parts.map((part, i) => {
    if (/^[A-Za-z0-9() -]+$/.test(part) && /[A-Za-z]/.test(part)) {
      return (
        <span key={i} className="font-normal font-sans tracking-normal opacity-90 inline">
          {part}
        </span>
      );
    }
    return part;
  });
};

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
        className={`w-full ${aspect} rounded-[24px] bg-gradient-to-br from-emerald-100 via-white to-emerald-200/80 flex items-center justify-center`}
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
      className={`w-full ${aspect} object-cover rounded-[24px] select-none`}
    />
  );
};

/** Frosted glass circular arrow, matching the Departments section buttons. */
const GlassArrowButton: React.FC<{
  onClick: () => void;
  label: string;
  small?: boolean;
  className?: string;
}> = ({ onClick, label, small = false, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`shrink-0 aspect-square inline-flex items-center justify-center rounded-full arrow-btn card-arrow-btn cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${small ? 'w-9 h-9 min-w-[36px] min-h-[36px]' : 'w-11 h-11 min-w-[44px] min-h-[44px]'
      } ${className}`}
  >
    <ArrowRight className={small ? 'w-4 h-4' : 'w-4.5 h-4.5'} strokeWidth={2.2} />
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
      <section id="news-feed" className="relative overflow-hidden section-band-green text-slate-900">
        <SilkBackdrop />

        <div className="container-1520 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
            <div className="min-w-0">
              <p className="section-tag">CAMPUS NEWS</p>
              <h2 className="heading-gradient-green">
                Campus Updates &amp; Industry News Feed
              </h2>
              <p className="section-subtitle-max2 mt-2">
                Latest institutional partnerships, scholarship drives, freelancing workshops, and placement fairs across Bangladesh.
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
                  className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Previous news items"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={() => setNewsOffset((prev) => (prev + 1) % secondaryNews.length)}
                  className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Next news items"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Featured News Story */}
            <article className="group rounded-[32px] glass p-3.5 flex flex-col transition-all duration-300 hover:shadow-lg">
              <button
                type="button"
                onClick={() => onSelectNews(featuredNews)}
                className="w-full text-left cursor-pointer rounded-[24px] block overflow-hidden shadow-sm banner-sheen"
                aria-label={`Read ${featuredNews.title}`}
              >
                <NewsPhoto id={featuredNews.id} title={featuredNews.title} large />
              </button>

              <div className="px-2 pt-4 pb-1.5 flex flex-col grow">
                <h3 className="font-display text-xl lg:text-[1.35rem] font-medium text-slate-900 leading-snug">
                  {renderMixedTitle(featuredNews.title)}
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
                  className="group rounded-[32px] glass p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => onSelectNews(item)}
                    className="w-full text-left cursor-pointer rounded-[24px] block overflow-hidden shadow-sm shrink-0 banner-sheen"
                    aria-label={`Read ${item.title}`}
                  >
                    <NewsPhoto id={item.id} title={item.title} />
                  </button>

                  <div className="px-2 pt-3.5 pb-1.5 flex items-end justify-between gap-3 grow">
                    <h3 className="font-display text-[16px] sm:text-[17px] font-medium text-slate-900 leading-[1.38] line-clamp-3 min-w-0 flex-1 self-start">
                      {renderMixedTitle(item.title)}
                    </h3>
                    <GlassArrowButton
                      small
                      className="self-end mt-auto"
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

      {/* SECTION 11: 1:1 CAREER CONSULTATION CTA BANNER (Solid #FBFCF8 Band + Brand Green Gradient 3D Banner) */}
      <section id="career-consultation" className="section-band bg-[#FBFCF8] text-slate-900">
        <div className="container-1520">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#EEFBF4] via-[#DFF4EB] to-[#BFE8CF] border border-[#008F2F]/25 shadow-[0_20px_50px_-20px_rgba(0,143,47,0.22)] text-slate-900">
            {/* Ambient Brand Emerald Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2AD568]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#008F2F]/16 rounded-full blur-3xl pointer-events-none" />

            {/* Desktop Full-Bleed 3D Visual: Seamlessly integrated into right side */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[47%] h-full pointer-events-none select-none z-0">
              <img
                src="/assets/cta/cta_mentor_3d.jpg"
                alt="1:1 Career Consultation with Lead Mentor"
                className="w-full h-full object-cover object-left [mask-image:linear-gradient(to_right,transparent_0%,black_16%,black_100%)]"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 lg:p-12 lg:py-14">
              {/* Left Column: Title, Subtitle, 1 CTA & Phone with Icon */}
              <div className="lg:col-span-7 text-left">
                <p className="section-tag">CONSULTATION</p>
                <h2 className="heading-gradient-green">
                  Book a Free 1:1 Session with Lead Mentor
                </h2>

                <p className="section-subtitle-max2 mt-3">
                  Discuss your background, technical ambitions, and career roadmap with our lead architect in a private 20-minute session.
                </p>

                {/* 1 CTA button and Phone number with icon */}
                <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
                  <button
                    type="button"
                    onClick={onBookCampusVisit}
                    className="inline-flex items-center justify-center gap-2.5 h-[52px] px-7 sm:px-8 text-sm sm:text-[15px] font-semibold text-white btn-gradient-green rounded-full transition-all duration-200 cursor-pointer group"
                  >
                    <span>Book Free 1:1 Session</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={2.2} />
                  </button>

                  <a
                    href="tel:01550666900"
                    aria-label="Call 01550-666900"
                    className="inline-flex items-center gap-3 text-slate-900 hover:text-emerald-700 transition-colors group cursor-pointer"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass bg-white/80 border border-white/80 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-105 group-hover:text-emerald-700 transition-all shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#16A34A]" strokeWidth={2} />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight tabular-nums group-hover:text-[#16A34A] transition-colors">
                      01550-666900
                    </span>
                  </a>
                </div>
              </div>

              {/* Mobile/Tablet Fallback Visual */}
              <div className="lg:hidden relative flex items-center justify-center mt-2">
                <div className="relative w-full max-w-[460px] overflow-hidden rounded-[24px] border border-emerald-300/50 shadow-md">
                  <img
                    src="/assets/cta/cta_mentor_3d.jpg"
                    alt="1:1 Career Consultation with Lead Mentor"
                    className="w-full h-auto object-cover select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

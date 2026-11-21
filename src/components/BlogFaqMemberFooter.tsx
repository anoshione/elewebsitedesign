import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Facebook,
  HelpCircle,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Youtube,
} from 'lucide-react';
import { BLOG_POSTS, BlogItem, BRANCH_ITEMS, BranchItem, FAQS, PARTNERS_AND_CLIENTS } from '../data/homeData';
import { EditorialVisual, SilkBackdrop } from './Graphics';
import { PartnersArchSection } from './PartnersArchSection';

interface BlogFaqMemberFooterProps {
  onSelectBlog: (post: BlogItem) => void;
  onEnrollClick: () => void;
  onSeminarClick: () => void;
  onLoginClick: () => void;
}

export const BlogFaqMemberFooter: React.FC<BlogFaqMemberFooterProps> = ({
  onSelectBlog,
  onEnrollClick,
  onSeminarClick,
  onLoginClick,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQS[0].id);
  const [blogOffset, setBlogOffset] = useState(0);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [branchOffset, setBranchOffset] = useState(0);
  const [showAllBranches, setShowAllBranches] = useState(false);

  const blogPageSize = 6;
  const displayedBlogs = showAllBlogs
    ? BLOG_POSTS
    : Array.from({ length: Math.min(blogPageSize, BLOG_POSTS.length) }).map(
      (_, i) => BLOG_POSTS[(blogOffset + i) % BLOG_POSTS.length]
    );

  const branchPageSize = 3;
  const displayedBranches = showAllBranches
    ? BRANCH_ITEMS
    : Array.from({ length: Math.min(branchPageSize, BRANCH_ITEMS.length) }).map(
      (_, i) => BRANCH_ITEMS[(branchOffset + i) % BRANCH_ITEMS.length]
    );

  return (
    <>
      {/* SECTION 12: BLOG (Silk Backdrop + Reference-Matched Glass Cards) */}
      <section id="blog" className="relative overflow-hidden section-band-green text-slate-900">
        <SilkBackdrop />

        <div className="container-1520 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
            <div className="min-w-0">
              <p className="section-tag">BLOGS</p>
              <h2 className="heading-gradient-green">
                Insights, Guides &amp; Career Playbooks
              </h2>
              <p className="section-subtitle-max2 mt-2">
                Practical tutorials on freelancing, AI-ready SEO, and modern software engineering written by our lead mentors.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <button
                type="button"
                onClick={() => setShowAllBlogs((prev) => !prev)}
                className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-slate-800 glass-btn rounded-full transition-all whitespace-nowrap cursor-pointer hover:text-emerald-800"
              >
                {showAllBlogs ? 'Show 6 Articles' : 'See All'}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setBlogOffset((prev) => (prev - 3 + BLOG_POSTS.length) % BLOG_POSTS.length)
                  }
                  className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Previous blog articles"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setBlogOffset((prev) => (prev + 3) % BLOG_POSTS.length)
                  }
                  className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Next blog articles"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {displayedBlogs.map((post) => (
              <article
                key={post.id}
                className="group rounded-[32px] glass p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 card-cta-glow"
              >
                <div>
                  {/* News section image for the blog image with top-right glass category tag */}
                  <div
                    onClick={() => onSelectBlog(post)}
                    className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden bg-slate-100 cursor-pointer block shadow-sm group/img card-cta-glow"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onSelectBlog(post);
                    }}
                    aria-label={`View ${post.title}`}
                  >
                    <img
                      src={post.image || '/assets/news/image-315.png'}
                      alt={post.title}
                      draggable={false}
                      loading="lazy"
                      className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Tag badge with blurred glass background on marked spot (top-right) */}
                    {post.category && (
                      <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-10 pointer-events-none">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-white/70 backdrop-blur-md border border-white/60 text-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                          {post.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-3.5 px-1 font-display text-xl sm:text-[22px] font-medium text-slate-900 leading-snug line-clamp-2">
                    <button
                      type="button"
                      onClick={() => onSelectBlog(post)}
                      className="text-left hover:text-emerald-700 transition-colors cursor-pointer"
                    >
                      {post.title}
                    </button>
                  </h3>
                </div>

                {/* Bottom Row: Date on left, circular arrow button on right */}
                <div className="mt-5 pt-3 px-1 flex items-center justify-between gap-3 border-t border-slate-900/10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium tabular-nums">
                    <Calendar className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={1.75} />
                    <span>{post.date}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectBlog(post)}
                    className="w-10 h-10 rounded-full arrow-btn card-arrow-btn shrink-0 aspect-square flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    aria-label={`Read article ${post.title}`}
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: OUR BRANCHES (Solid #FBFCF8, left-aligned title & subtitle, frosted glass cards with drop shadow) */}
      <section id="branches" className="section-band bg-[#FBFCF8] text-slate-900">
        <div className="container-1520">
          {/* Header Row: Left-aligned Title & Subtitle + Right-aligned Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
            <div className="min-w-0">
              <p className="section-tag">BRANCHES</p>
              <h2 className="heading-gradient-green">
                Our Nationwide Campus Branches
              </h2>
              <p className="section-subtitle-max2 mt-2">
                Find your nearest e-Learning &amp; Earning IT park and hands-on computer lab center across Bangladesh.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <button
                type="button"
                onClick={() => setShowAllBranches((prev) => !prev)}
                className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-slate-800 glass-btn rounded-full transition-all whitespace-nowrap cursor-pointer hover:text-emerald-800"
              >
                {showAllBranches ? 'Show 3 Centers' : 'See All'}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setBranchOffset((prev) => (prev - 3 + BRANCH_ITEMS.length) % BRANCH_ITEMS.length)
                  }
                  className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Previous branches"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setBranchOffset((prev) => (prev + 3) % BRANCH_ITEMS.length)
                  }
                  className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Next branches"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          {/* Branches Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {displayedBranches.map((branch) => (
              <article
                key={branch.id}
                className="group relative rounded-[32px] card-glass-drop hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end min-h-[500px] sm:min-h-[530px] overflow-hidden card-cta-glow"
              >
                {/* Full-Card Height Map Background (with pin in top middle) */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={branch.mapImage}
                    alt={`${branch.city} branch campus map location`}
                    className="w-full h-full object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* 50% transparent shade from the bottom background */}
                  <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#1C2C23]/50 via-[#2D4236]/25 to-transparent pointer-events-none" />
                </div>

                {/* Bottom: Translucent White Frosted Glass Info Card with Drop Shadow */}
                <div className="relative z-10 p-3.5">
                  <div className="rounded-[24px] branch-glass-card p-5 sm:p-6 flex flex-col gap-3.5">
                    {/* Header: Centered Branch Name */}
                    <div className="text-center mb-0.5">
                      <h3 className="font-display text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-none drop-shadow-sm">
                        {branch.city}
                      </h3>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-900 font-medium leading-relaxed">
                      <MapPin className="w-4.5 h-4.5 text-slate-800 shrink-0 mt-0.5" strokeWidth={1.8} />
                      <span>{branch.address}</span>
                    </div>

                    {/* Phone Numbers */}
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-900 font-semibold tabular-nums">
                      <Phone className="w-4.5 h-4.5 text-slate-800 shrink-0" strokeWidth={1.8} />
                      <div className="flex flex-wrap items-center gap-x-2">
                        {branch.phones.map((phone, idx) => (
                          <React.Fragment key={phone}>
                            <a
                              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                              className="hover:text-emerald-700 transition-colors"
                            >
                              {phone}
                            </a>
                            {idx < branch.phones.length - 1 && <span className="text-slate-500">,</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-900 font-medium">
                      <Mail className="w-4.5 h-4.5 text-slate-800 shrink-0" strokeWidth={1.8} />
                      <a
                        href={`mailto:${branch.email}`}
                        className="hover:text-emerald-700 transition-colors truncate"
                      >
                        {branch.email}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: FAQ (Silk Backdrop + Glass Cards & Distinct Arrow Action) */}
      <section id="faq" className="relative overflow-hidden section-band-green text-slate-900">
        <SilkBackdrop />
        <div className="container-1520 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-stretch">
            {/* Left Column: Visual Card with FAQ Title at Top & Just the CTA at Bottom */}
            <div className="faq-white-card lg:col-span-5 relative rounded-[32px] overflow-hidden p-7 sm:p-9 lg:p-10 flex flex-col justify-between min-h-[520px] lg:min-h-[580px] h-full border border-emerald-100/70 shadow-[0_20px_45px_-15px_rgba(0,143,47,0.12)] bg-white card-cta-glow group">
              {/* Background Visual Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/assets/faq/faq_visual.jpg"
                  alt="FAQ Education & Career Counseling Visual"
                  className="w-full h-full object-cover object-center select-none"
                />
                {/* Soft gradient protective overlay ensuring crisp text readability and gentle blend */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/35 to-white/70 pointer-events-none" />
              </div>

              {/* Top: FAQ Title Section */}
              <div className="relative z-10">
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    QUESTIONS &amp; ANSWERS
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
                  Clear answers for your learning journey
                </h2>

                <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600 max-w-md">
                  Clear answers on admissions, course curricula, campus lab access, installment fees, and verified freelancing outcomes.
                </p>
              </div>

              {/* Bottom: JUST the CTA Button */}
              <div className="relative z-10 mt-auto pt-8">
                <button
                  type="button"
                  onClick={onSeminarClick}
                  className="inline-flex items-center gap-3 h-[52px] pl-2.5 pr-7 rounded-full btn-gradient-green text-white font-semibold text-[15px] transition-all duration-200 cursor-pointer shadow-[0_10px_24px_-6px_rgba(0,143,47,0.45)] hover:shadow-[0_14px_30px_-4px_rgba(0,143,47,0.6)] group"
                >
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
                  </span>
                  <span>Book a consultation</span>
                </button>
              </div>
            </div>

            {/* Right Column: Accordion Cards (Matching reference shape and icon toggles) */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              {FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-[24px] transition-all duration-200 glass border ${isOpen
                      ? 'border-emerald-400/60 shadow-lg bg-white/15'
                      : 'border-white/25 shadow-sm hover:border-white/50'
                      }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="group w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <span className="font-display text-base sm:text-[17px] font-medium text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug pr-2">
                        {faq.question}
                      </span>
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full arrow-btn flex items-center justify-center shrink-0"
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4.5 h-4.5 text-slate-800" strokeWidth={2.2} />
                        ) : (
                          <ChevronDown className="w-4.5 h-4.5 text-slate-800" strokeWidth={2.2} />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 text-sm sm:text-[15px] leading-relaxed text-slate-700 border-t border-slate-900/10 pt-4 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15: PARTNERS & CLIENTS (Curved Arch Animation + 3D Glass Futuristic Handshake) */}
      <PartnersArchSection />

      {/* SECTION 15: ADMISSION BANNER & SECTION 16: FOOTER (Luminous Deep Indigo & Emerald Background) */}
      <div className="footer-bg text-white">
        <div className="footer-bg__accent" />

        <svg className="footer-bg__grid" aria-hidden="true">
          <defs>
            <pattern id="footerGlassGrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGlassGrid)" />
        </svg>

        <div className="footer-bg__orb footer-bg__orb--top-left" aria-hidden="true" />
        <div className="footer-bg__orb footer-bg__orb--right" aria-hidden="true" />
        <div className="footer-bg__orb footer-bg__orb--bottom" aria-hidden="true" />

        <div className="footer-bg__content container-1520 pt-10 sm:pt-14 pb-8">
          {/* TOP CARD: Admission Going On */}
          <div
            className="rounded-[32px] glass px-6 py-6 sm:px-10 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 card-cta-glow group"
            style={{
              background: 'rgba(255, 255, 255, 0.17)',
              backdropFilter: 'blur(19px) saturate(100%)',
              WebkitBackdropFilter: 'blur(19px) saturate(100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-white tracking-tight leading-tight">
                Admission Going On
              </h2>
              <p className="mt-1.5 text-xs sm:text-[13px] lg:text-sm text-slate-300 leading-relaxed">
                Join any online or offline course today and move one step closer to a stronger, future-ready career
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full text-sm font-semibold text-white btn-gradient-green transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Browse Course</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
              <button
                type="button"
                onClick={onSeminarClick}
                className="inline-flex items-center justify-center gap-2 h-[52px] px-7 rounded-full text-sm font-semibold text-white glass-btn transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-white" strokeWidth={1.75} />
                <span>Get Discount</span>
              </button>
            </div>
          </div>

          {/* PAYMENT MERCHANTS ROW */}
          <div className="mt-8 sm:mt-10 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm sm:text-base font-medium text-white/95">
              Our Payment Merchants:
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="h-8 px-3 rounded-lg bg-white text-slate-900 flex items-center gap-1.5 text-xs font-bold shadow-sm">
                <span className="w-4 h-4 rounded bg-[#E2136E] text-white inline-flex items-center justify-center text-[10px] font-extrabold">
                  b
                </span>
                <span>bKash</span>
              </div>
              <div className="h-8 px-3 rounded-lg bg-white text-slate-900 flex items-center gap-1.5 text-xs font-bold shadow-sm">
                <span className="w-4 h-4 rounded-full bg-[#F7941D] text-white inline-flex items-center justify-center text-[10px] font-extrabold">
                  N
                </span>
                <span className="text-[#ED1C24]">Nagad</span>
              </div>
              <div className="h-8 px-3 rounded-lg bg-white text-slate-900 flex items-center gap-1.5 text-xs font-bold shadow-sm">
                <span className="w-4 h-4 rounded bg-[#8C3494] text-white inline-flex items-center justify-center text-[10px] font-extrabold">
                  R
                </span>
                <span className="text-[#8C3494]">Rocket</span>
              </div>
              <div className="h-8 px-3 rounded-lg bg-white text-slate-900 flex items-center gap-1.5 text-xs font-bold shadow-sm">
                <span className="w-4 h-4 rounded-full bg-[#005BAA] text-[#FFD100] inline-flex items-center justify-center text-[10px] font-extrabold">
                  U
                </span>
                <span className="text-[#005BAA]">Upay</span>
              </div>
              <div className="h-8 px-3 rounded-lg bg-white text-slate-900 flex items-center gap-2 text-xs font-extrabold shadow-sm">
                <span className="text-[#1A1F71] italic tracking-tight">VISA</span>
                <span className="inline-flex items-center" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] -ml-1.5 opacity-90" />
                </span>
              </div>
              <div className="h-8 px-3 rounded-lg bg-white text-slate-900 flex items-center gap-1.5 text-xs font-bold shadow-sm">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" strokeWidth={2} />
                <span>Bank &amp; EFT</span>
              </div>
            </div>
          </div>

          {/* MAIN 5-COLUMN FOOTER */}
          <footer id="footer">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 pb-10">
              {/* Col 1: Brand & Socials (3 cols) */}
              <div className="lg:col-span-3 space-y-4">
                <a
                  href="#top"
                  className="inline-flex items-center bg-white rounded-[24px] px-4 py-2.5 shadow-md transition-transform hover:scale-[1.02]"
                  aria-label="e-Learning & Earning Ltd. Home"
                >
                  <img
                    src="/assets/logo.png"
                    alt="e-Learning & Earning Ltd.™ - Excellence in Learning"
                    className="h-8 sm:h-9 w-auto object-contain select-none"
                  />
                </a>

                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed max-w-[280px]">
                  E-Learning and Earning Ltd. has been the foremost information technology service provider since 2013.
                </p>

                <div className="pt-1">
                  <div className="text-xs sm:text-[13px] font-semibold text-white mb-2">
                    Follow us on:
                  </div>
                  <div className="flex items-center gap-3.5 text-white/90">
                    <a
                      href="#top"
                      aria-label="Facebook"
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <Facebook className="w-4 h-4" strokeWidth={1.75} />
                    </a>
                    <a
                      href="#top"
                      aria-label="LinkedIn"
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <Linkedin className="w-4 h-4" strokeWidth={1.75} />
                    </a>
                    <a
                      href="#top"
                      aria-label="X"
                      className="hover:text-emerald-400 transition-colors font-bold text-xs cursor-pointer inline-flex items-center justify-center w-4 h-4"
                    >
                      X
                    </a>
                    <a
                      href="#top"
                      aria-label="YouTube"
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <Youtube className="w-4 h-4" strokeWidth={1.75} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Col 2: Important Links (2 cols) */}
              <div className="lg:col-span-2">
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
                  Important Links
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-300">
                  <li>
                    <a href="#top" className="hover:text-white transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#departments" className="hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#blog" className="hover:text-white transition-colors">
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="#branches" className="hover:text-white transition-colors">
                      Branch
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#privacy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#terms" className="hover:text-white transition-colors">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 3: Our Courses (2 cols) */}
              <div className="lg:col-span-2">
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
                  Our Courses
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-300">
                  <li>
                    <a href="#courses" className="hover:text-white transition-colors">
                      Web &amp; Software Development
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="hover:text-white transition-colors">
                      Graphics &amp; Multimedia
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="hover:text-white transition-colors">
                      Digital Marketing
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="hover:text-white transition-colors">
                      Networking
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="hover:text-white transition-colors">
                      CPA &amp; Affiliate Marketing
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="hover:text-white transition-colors">
                      Language &amp; Communications
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className="hover:text-white transition-colors">
                      Others
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 4: Student Services (2 cols) */}
              <div className="lg:col-span-2">
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
                  Student Services
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-300">
                  <li>
                    <button
                      type="button"
                      onClick={onEnrollClick}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Apply Online
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onLoginClick}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Admit Card
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onLoginClick}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Exam Result
                    </button>
                  </li>
                  <li>
                    <a href="#branches" className="hover:text-white transition-colors">
                      Exam Centers
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onLoginClick}
                      className="hover:text-white transition-colors cursor-pointer text-left"
                    >
                      Verify Certificate
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 5: Contact Us (3 cols) */}
              <div className="lg:col-span-3">
                <h3 className="text-sm sm:text-base font-bold text-white mb-3 sm:mb-4">
                  Contact Us
                </h3>
                <div className="space-y-3 text-xs sm:text-[13px] text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" strokeWidth={1.75} />
                    <div>
                      <div className="tabular-nums">
                        Phone: <a href="tel:01550666800" className="hover:text-white transition-colors">01550-666800</a>
                      </div>
                      <div className="tabular-nums pl-11">
                        <a href="tel:01550666900" className="hover:text-white transition-colors">01550-666900</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-slate-300 shrink-0" strokeWidth={1.75} />
                    <div>
                      Email: <a href="mailto:info@e-laeltd.com" className="hover:text-white transition-colors">info@e-laeltd.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 leading-relaxed">
                    <MapPin className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" strokeWidth={1.75} />
                    <div className="max-w-[260px]">
                      <div className="font-medium text-white">Head Office:</div>
                      <div className="mt-0.5">
                        Khaja IT Park, 2nd to 7th Floor, Kallyanpur Bus Stop, Mirpur Road, Dhaka-1207.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COPYRIGHT LINE */}
            <div className="border-t border-white/10 pt-6 text-center text-xs sm:text-[13px] text-slate-400">
              &copy; 2026 e-Learning and Earning Ltd. All Rights Reserved
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

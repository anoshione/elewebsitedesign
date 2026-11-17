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
import { BLOG_POSTS, BlogItem, FAQS, PARTNERS_AND_CLIENTS } from '../data/homeData';
import { EditorialVisual, SilkBackdrop } from './Graphics';

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

  const blogPageSize = 6;
  const displayedBlogs = showAllBlogs
    ? BLOG_POSTS
    : Array.from({ length: Math.min(blogPageSize, BLOG_POSTS.length) }).map(
        (_, i) => BLOG_POSTS[(blogOffset + i) % BLOG_POSTS.length]
      );

  return (
    <>
      {/* SECTION 12: BLOG (Silk Backdrop + Reference-Matched Glass Cards) */}
      <section id="blog" className="relative overflow-hidden section-band text-slate-900">
        <SilkBackdrop />

        <div className="container-1520 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
            <div className="min-w-0">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] font-bold tracking-tight text-[#1CA24A] leading-tight lg:whitespace-nowrap">
                Insights, Guides &amp; Career Playbooks
              </h2>
              <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-600 xl:whitespace-nowrap">
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
                  className="w-10 h-10 rounded-full glass-btn flex items-center justify-center shrink-0 aspect-square text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Previous blog articles"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setBlogOffset((prev) => (prev + 3) % BLOG_POSTS.length)
                  }
                  className="w-10 h-10 rounded-full glass-btn flex items-center justify-center shrink-0 aspect-square text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Next blog articles"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {displayedBlogs.map((post) => (
              <article
                key={post.id}
                className="group rounded-[28px] glass p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  {/* News section image for the blog image */}
                  <div
                    onClick={() => onSelectBlog(post)}
                    className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-[20px] overflow-hidden bg-slate-100 cursor-pointer block shadow-sm"
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
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 sm:mt-5 font-display text-xl sm:text-[22px] font-bold text-slate-900 leading-snug line-clamp-2">
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
                <div className="mt-6 pt-3 flex items-center justify-between gap-3 border-t border-slate-900/10">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium tabular-nums">
                    <Calendar className="w-4 h-4 text-slate-500 shrink-0" strokeWidth={1.75} />
                    <span>{post.date}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectBlog(post)}
                    className="w-10 h-10 rounded-full glass-btn shrink-0 aspect-square flex items-center justify-center text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    aria-label={`Read article ${post.title}`}
                  >
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: FAQ (Reference-Matched Layout with Glass Cards & Distinct Arrow Action) */}
      <section id="faq" className="section-band bg-glass-silk text-slate-900">
        <div className="container-1520">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            {/* Left Column: Heading, Subtitle & "Still have questions?" Card */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                {/* Kicker */}
                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    QUESTIONS &amp; ANSWERS
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-slate-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
                  Clear answers for your learning journey
                </h2>

                {/* Subtitle */}
                <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600 max-w-md">
                  Clear answers on admissions, course curricula, campus lab access, installment fees, and verified freelancing outcomes.
                </p>
              </div>

              {/* "Still have questions?" Card (Positioned at bottom of left column like reference) */}
              <div className="mt-10 lg:mt-24 rounded-[26px] glass p-6 sm:p-7 border border-white/60 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    Still have questions?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Need clarity before moving forward? Speak with our academic counseling team and get direct answers tailored to your career challenges.
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={onSeminarClick}
                    className="inline-flex items-center gap-3 p-1.5 pr-6 rounded-full bg-[#16A34A] text-white font-semibold text-sm shadow-md hover:bg-emerald-700 transition-all duration-200 cursor-pointer group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.2} />
                    </span>
                    <span>Book a consultation</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Accordion Cards (Matching reference shape and icon toggles) */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              {FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-[22px] transition-all duration-200 glass border ${
                      isOpen
                        ? 'border-emerald-500/40 shadow-md bg-white/80'
                        : 'border-white/60 shadow-sm hover:border-white/90 hover:shadow-md'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <span className="font-display text-base sm:text-[17px] font-bold text-slate-900 leading-snug pr-2">
                        {faq.question}
                      </span>
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                          isOpen
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-200/70 text-slate-700 group-hover:bg-slate-200'
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" strokeWidth={2.2} />
                        ) : (
                          <ChevronDown className="w-4 h-4" strokeWidth={2.2} />
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 text-sm sm:text-[15px] leading-relaxed text-slate-600 animate-in fade-in duration-200">
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

      {/* SECTION 14: PARTNERS & CLIENTS (Light Glass-Silk Backdrop + 14 Rounded Glass Logo Frames) */}
      <section id="partners" className="section-band bg-glass-silk text-slate-900">
        <div className="container-1520">
          <div className="mb-8 sm:mb-10 text-left">
            <h2 className="section-heading text-slate-900" style={{ textWrap: 'balance' }}>
              Our Partners &amp; Clients
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-600 max-w-2xl text-left">
              We&apos;re proud to collaborate with leading government and private organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-4 sm:gap-5">
            {PARTNERS_AND_CLIENTS.map((partner, index) => (
              <div
                key={partner.id}
                className={`group rounded-[22px] sm:rounded-[26px] glass p-4 sm:p-5 flex items-center justify-center min-h-[96px] sm:min-h-[112px] col-span-1 lg:col-span-2 ${
                  index === 10 ? 'lg:col-start-2' : ''
                } transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-10px_rgba(16,185,129,0.22)] cursor-pointer`}
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  loading="lazy"
                  draggable={false}
                  className="max-h-[50px] sm:max-h-[56px] max-w-[130px] sm:max-w-[145px] w-auto h-auto object-contain select-none transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: ADMISSION BANNER & SECTION 16: FOOTER (Pixel-Perfect Reference Recreation) */}
      <div className="bg-gradient-to-r from-[#03361B] via-[#04242D] to-[#08154A] text-white">
        <div className="container-1520 pt-10 sm:pt-14 pb-8">
          {/* TOP CARD: Admission Going On */}
          <div className="rounded-[28px] sm:rounded-[32px] glass px-6 py-6 sm:px-10 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
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
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] transition-colors shadow-lg shadow-emerald-950/40 cursor-pointer whitespace-nowrap"
              >
                <span>Browse Course</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </a>
              <button
                type="button"
                onClick={onSeminarClick}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-xs sm:text-sm font-semibold text-white glass-btn transition-colors cursor-pointer whitespace-nowrap"
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
                  className="inline-flex items-center bg-white rounded-2xl px-4 py-2.5 shadow-md transition-transform hover:scale-[1.02]"
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
                    <a href="#at-a-glance" className="hover:text-white transition-colors">
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
                    <a href="#at-a-glance" className="hover:text-white transition-colors">
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

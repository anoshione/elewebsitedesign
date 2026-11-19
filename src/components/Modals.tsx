import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  Lock,
  Play,
  Search,
  UserCheck,
  X,
} from 'lucide-react';
import {
  BLOG_POSTS,
  BlogItem,
  COURSES,
  CourseItem,
  DEPARTMENTS,
  NewsItem,
} from '../data/homeData';

export type ModalState =
  | { type: 'none' }
  | {
      type: 'form';
      mode: 'enroll' | 'discount' | 'seminar' | 'campus' | 'brochure';
      course?: CourseItem;
    }
  | { type: 'course'; course: CourseItem }
  | { type: 'news'; item: NewsItem }
  | { type: 'blog'; item: BlogItem }
  | { type: 'video' }
  | { type: 'search' }
  | { type: 'login'; defaultTab?: 'login' | 'verify' };

interface ModalsProps {
  modal: ModalState;
  onClose: () => void;
  onSwitchToEnroll: (course: CourseItem) => void;
  onSelectCourseFromSearch: (course: CourseItem) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  modal,
  onClose,
  onSwitchToEnroll,
  onSelectCourseFromSearch,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('Dhaka Kallyanpur (Head Office)');
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
  const [studyFormat, setStudyFormat] = useState<'Offline Campus' | 'Live Online'>(
    'Offline Campus'
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Search modal state
  const [searchQuery, setSearchQuery] = useState('');

  // Login & Verify modal state
  const [loginTab, setLoginTab] = useState<'login' | 'verify'>('login');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [certCode, setCertCode] = useState('');
  const [loginStatus, setLoginStatus] = useState<{
    type: 'idle' | 'error' | 'success';
    message: string;
  }>({ type: 'idle', message: '' });

  useEffect(() => {
    if (modal.type === 'form') {
      setSubmitted(false);
      setErrorMsg('');
      if (modal.course) {
        setSelectedCourseId(modal.course.id);
      }
    }
    if (modal.type === 'search') {
      setSearchQuery('');
    }
    if (modal.type === 'login') {
      setLoginTab(modal.defaultTab || 'login');
      setLoginStatus({ type: 'idle', message: '' });
    }
  }, [modal]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.type !== 'none') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modal.type, onClose]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matchedCourses = q
      ? COURSES.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.categoryLabel.toLowerCase().includes(q) ||
            c.subtitle.toLowerCase().includes(q)
        )
      : COURSES.slice(0, 4);

    const matchedDepts = q
      ? DEPARTMENTS.filter(
          (d) =>
            d.title.toLowerCase().includes(q) || d.subtitle.toLowerCase().includes(q)
        )
      : [];

    const matchedBlogs = q
      ? BLOG_POSTS.filter(
          (b) =>
            b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
        )
      : [];

    return { matchedCourses, matchedDepts, matchedBlogs };
  }, [searchQuery]);

  if (modal.type === 'none') return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!/^(\+?88)?01[3-9]\d{8}$/.test(phone.replace(/[-\s]/g, ''))) {
      setErrorMsg('Please enter a valid 11-digit Bangladesh mobile number.');
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginTab === 'login') {
      if (!studentId.trim() || password.trim().length < 4) {
        setLoginStatus({
          type: 'error',
          message: 'Enter your Student ID / Email and at least 4 characters for password.',
        });
        return;
      }
      setLoginStatus({
        type: 'success',
        message: `Welcome back (${studentId.trim()}). Student portal session verified—batch schedule and recorded classes are synced.`,
      });
    } else {
      if (certCode.trim().length < 5) {
        setLoginStatus({
          type: 'error',
          message: 'Please enter a valid ELE certificate serial (e.g. ELE-2026-4812).',
        });
        return;
      }
      setLoginStatus({
        type: 'success',
        message: `Certificate ${certCode.trim().toUpperCase()} verified as an authentic e-Learning & Earning Ltd. graduate credential.`,
      });
    }
  };

  const formTitleMap = {
    enroll: 'Course Admission Registration',
    discount: 'Apply for Scholarship / Batch Discount',
    seminar: 'Reserve Your Seat for Free Career Seminar',
    campus: 'Book a Guided Campus Lab Visit',
    brochure: 'Get the 2026 Course Curriculum Brochure',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040B1A]/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl rounded-[32px] bg-gradient-to-br from-[#07152B]/95 via-[#092730]/95 to-[#121D54]/95 backdrop-blur-2xl text-white shadow-[0_0_52px_rgba(16,185,129,0.22)] border border-emerald-400/30 max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-500/25 border border-emerald-400/30 flex items-center justify-center text-white cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" strokeWidth={1.75} />
        </button>

        {/* SEARCH MODAL */}
        {modal.type === 'search' && (
          <div>
            <div className="pr-10">
              <div className="text-xs font-semibold text-emerald-300">
                Quick Course &amp; Track Search
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">
                Find Courses, Departments &amp; Guides
              </h3>
            </div>

            <div className="mt-5 relative">
              <Search
                className="w-4 h-4 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2"
                strokeWidth={1.75}
              />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search e.g. Cyber Security, Laravel, Graphics, Digital Marketing..."
                className="w-full pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-400 rounded-[24px] bg-white/[0.08] border border-emerald-400/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2.5">
                  {searchQuery ? 'Matching Courses' : 'Popular Courses'}
                </div>
                {searchResults.matchedCourses.length === 0 ? (
                  <p className="text-sm text-slate-300 py-3">
                    No courses found for &ldquo;{searchQuery}&rdquo;. Try another keyword.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {searchResults.matchedCourses.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => onSelectCourseFromSearch(course)}
                        className="w-full text-left rounded-[24px] border border-emerald-400/25 bg-white/[0.06] hover:border-emerald-400/60 hover:bg-emerald-500/15 p-3.5 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-semibold text-emerald-300">
                            {course.categoryLabel} · {course.durationMonths} Months
                          </div>
                          <div className="font-display text-sm font-bold text-white mt-0.5">
                            {course.title}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 text-xs font-semibold text-emerald-300 tabular-nums">
                          <span>{course.onlineFee}</span>
                          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {searchResults.matchedDepts.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-300 mb-2">Departments</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.matchedDepts.map((dept) => (
                      <a
                        key={dept.id}
                        href="#departments"
                        onClick={onClose}
                        className="rounded-xl border border-emerald-400/25 bg-white/[0.06] p-3 text-sm font-semibold text-white hover:border-emerald-400"
                      >
                        {dept.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STUDENT LOGIN & CERTIFICATE VERIFY MODAL */}
        {modal.type === 'login' && (
          <div>
            <div className="pr-10">
              <div className="text-xs font-semibold text-emerald-300">
                e-Learning &amp; Earning Ltd. Portal
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">
                Student Access &amp; Verification
              </h3>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 p-1 bg-white/[0.08] border border-white/15 rounded-full">
              <button
                type="button"
                onClick={() => {
                  setLoginTab('login');
                  setLoginStatus({ type: 'idle', message: '' });
                }}
                className={`py-2.5 text-xs font-semibold rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  loginTab === 'login'
                    ? 'btn-emerald-glow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
                Student Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginTab('verify');
                  setLoginStatus({ type: 'idle', message: '' });
                }}
                className={`py-2.5 text-xs font-semibold rounded-full transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  loginTab === 'verify'
                    ? 'btn-emerald-glow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" strokeWidth={1.75} />
                Verify Certificate
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4" noValidate>
              {loginTab === 'login' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Student ID or Registered Email
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. ELE-2026-1042 or student@example.com"
                      className="w-full px-4 py-2.5 text-sm text-white placeholder:text-slate-400 rounded-xl bg-white/[0.08] border border-emerald-400/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your portal password"
                      className="w-full px-4 py-2.5 text-sm text-white placeholder:text-slate-400 rounded-xl bg-white/[0.08] border border-emerald-400/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Certificate Serial Number
                  </label>
                  <input
                    type="text"
                    value={certCode}
                    onChange={(e) => setCertCode(e.target.value)}
                    placeholder="e.g. ELE-2026-4812"
                    className="w-full px-4 py-2.5 text-sm font-mono text-white placeholder:text-slate-400 rounded-xl bg-white/[0.08] border border-emerald-400/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              )}

              {loginStatus.type === 'error' && (
                <p className="text-xs font-medium text-rose-300" role="alert">
                  {loginStatus.message}
                </p>
              )}

              {loginStatus.type === 'success' && (
                <div className="rounded-[24px] bg-emerald-500/15 border border-emerald-400/40 p-4 flex items-start gap-2.5">
                  <UserCheck className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    {loginStatus.message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-[52px] flex items-center justify-center text-sm font-semibold btn-emerald-glow rounded-full transition-all cursor-pointer"
              >
                {loginTab === 'login' ? 'Sign In to Student Portal' : 'Verify Certificate'}
              </button>
            </form>
          </div>
        )}

        {/* ADMISSION / DISCOUNT / SEMINAR / CAMPUS / BROCHURE FORM */}
        {modal.type === 'form' && (
          <>
            <div className="pr-10">
              <div className="text-xs font-semibold text-emerald-300">
                e-Learning &amp; Earning Ltd. · Admissions Desk
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">
                {formTitleMap[modal.mode]}
              </h3>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-[24px] bg-emerald-500/15 border border-emerald-400/35 p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-300 mx-auto" />
                <h4 className="mt-3 font-display text-xl font-bold text-white">
                  Registration Confirmed
                </h4>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{fullName}</span>. Our
                  advisor for <span className="font-semibold text-emerald-300">{branch}</span> will
                  call <span className="font-mono font-semibold text-white">{phone}</span> within 24
                  hours with your batch schedule
                  {modal.mode === 'brochure' ? ' and PDF curriculum link.' : '.'}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 px-7 py-2.5 text-sm font-semibold btn-emerald-glow rounded-full cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4" noValidate>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariqul Islam"
                    className="w-full px-4 py-2.5 text-sm text-white placeholder:text-slate-400 rounded-xl bg-white/[0.08] border border-emerald-400/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-4 py-2.5 text-sm text-white placeholder:text-slate-400 rounded-xl bg-white/[0.08] border border-emerald-400/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 text-sm text-white placeholder:text-slate-400 rounded-xl bg-white/[0.08] border border-emerald-400/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Course Interest
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm text-white rounded-xl bg-[#0A1E3D] border border-emerald-400/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Preferred Campus / Mode
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm text-white rounded-xl bg-[#0A1E3D] border border-emerald-400/25 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <option>Dhaka Kallyanpur (Head Office)</option>
                      <option>Dhaka Mirpur / Uttara</option>
                      <option>Chattogram Branch</option>
                      <option>Sylhet Branch</option>
                      <option>Bogura / Rajshahi Branch</option>
                      <option>Live Online Studio</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Class Format
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(['Offline Campus', 'Live Online'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setStudyFormat(fmt)}
                        className={`py-2.5 text-xs font-semibold rounded-full border cursor-pointer ${
                          studyFormat === fmt
                            ? 'bg-emerald-400/20 border-emerald-400 text-emerald-200'
                            : 'bg-white/[0.06] border-white/15 text-slate-300'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-xs font-medium text-rose-300" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full h-[52px] flex items-center justify-center text-sm font-semibold btn-emerald-glow rounded-full transition-all cursor-pointer shadow-lg shadow-emerald-950/30"
                >
                  Confirm Submission
                </button>
              </form>
            )}
          </>
        )}

        {/* COURSE SYLLABUS MODAL */}
        {modal.type === 'course' && (
          <div>
            <div className="pr-10">
              <div className="text-xs font-semibold text-emerald-300">
                {modal.course.categoryLabel} · {modal.course.level}
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">
                {modal.course.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {modal.course.subtitle}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-300 tabular-nums border-y border-white/15 py-3.5">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
                {modal.course.durationMonths} Months ({modal.course.classesCount} Classes)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
                {modal.course.mode}
              </span>
              <span className="font-semibold text-emerald-300">
                Offline: {modal.course.offlineFee} · Online: {modal.course.onlineFee}
              </span>
            </div>

            <div className="mt-5">
              <h4 className="font-display text-sm font-bold text-white mb-3">
                Core Curriculum Modules
              </h4>
              <ul className="space-y-2.5">
                {modal.course.syllabus.map((mod) => (
                  <li key={mod} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <CheckCircle2
                      className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"
                      strokeWidth={1.75}
                    />
                    <span>{mod}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onSwitchToEnroll(modal.course)}
                className="flex-1 py-3 text-sm font-semibold btn-emerald-glow rounded-full transition-all cursor-pointer"
              >
                Enroll in This Course
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* NEWS & BLOG READER MODAL */}
        {(modal.type === 'news' || modal.type === 'blog') && (
          <div>
            <div className="pr-10">
              <div className="text-xs font-semibold text-emerald-300">
                {modal.item.category} · {modal.item.date} · {modal.item.readTime}
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-white leading-[1.3]">
                {modal.item.title}
              </h3>
            </div>

            <p className="mt-4 text-sm text-slate-200 leading-[1.75]">{modal.item.fullText}</p>
            <p className="mt-3 text-sm text-slate-300 leading-[1.75]">{modal.item.excerpt}</p>

            <div className="mt-6 pt-4 border-t border-white/15 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-semibold btn-emerald-glow rounded-full cursor-pointer"
              >
                Done Reading
              </button>
            </div>
          </div>
        )}

        {/* CAMPUS TOUR VIDEO SHOWCASE MODAL */}
        {modal.type === 'video' && (
          <div>
            <div className="pr-10">
              <div className="text-xs font-semibold text-emerald-300">Campus Showcase</div>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">
                Inside e-Learning &amp; Earning Ltd. Dhaka Studio
              </h3>
            </div>
            <div className="relative mt-5 rounded-[24px] overflow-hidden bg-[#06182F] border border-emerald-400/25 p-8 text-white text-center min-h-[240px] flex flex-col items-center justify-center">
              <img
                src="/src/assets/images/campus_lab_training_1794815462732.jpg"
                alt="Dhaka IT training lab workstations"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-45"
              />
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-emerald-400/35 flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(16,185,129,0.28)]">
                <Play className="w-6 h-6 text-emerald-300 fill-emerald-300" />
              </div>
              <p className="relative z-10 mt-4 font-display text-lg font-bold">
                42+ District Campuses · 8 Dhaka Training Labs
              </p>
              <p className="relative z-10 mt-1.5 text-sm text-emerald-100/90 max-w-md mx-auto leading-relaxed">
                Visit Kallyanpur Head Office Saturday–Thursday (9:00 AM – 8:00 PM) for a live
                lab walkthrough and free career counseling session.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

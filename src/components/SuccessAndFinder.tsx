import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Compass,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { COURSES, CourseItem } from '../data/homeData';

interface SuccessAndFinderProps {
  onEnrollCourse: (course: CourseItem, actionType: 'enroll' | 'discount') => void;
  onInspectCourse: (course: CourseItem) => void;
}

type WeeklyHoursChoice = 'light' | 'moderate' | 'intensive';
type ShiftChoice = 'Morning' | 'Afternoon' | 'Evening / Weekend';
type ModeChoice = 'Any Mode' | 'Campus Lab' | 'Live Online';
type GoalChoice =
  | 'Any Track'
  | 'Design & Creative'
  | 'Coding & Web'
  | 'Cyber & Networking'
  | 'Marketing & Freelancing';
type LevelChoice = 'Any Level' | 'Beginner' | 'Intermediate';

interface VideoSuccessStory {
  id: string;
  title: string;
  thumbnail: string;
}

const VIDEO_SUCCESS_STORIES: VideoSuccessStory[] = [
  {
    id: 'v-story-1',
    title: 'হাতে কলমে আইটি শিখে বদলে যাওয়া জীবনের গল্প',
    thumbnail: '/assets/stories/video_story_1.jpg',
  },
  {
    id: 'v-story-2',
    title: 'গৃহিণী থেকে সফল আন্তর্জাতিক ফ্রিল্যান্সার হওয়ার বাস্তব গল্প',
    thumbnail: '/assets/stories/video_story_2.jpg',
  },
  {
    id: 'v-story-3',
    title: 'গ্রাফিক ডিজাইন শিখে সাফল্যের সাথে এগিয়ে চলার গল্প',
    thumbnail: '/assets/stories/video_story_3.jpg',
  },
  {
    id: 'v-story-4',
    title: 'ঘরে বসেই গ্লোবাল ক্লায়েন্ট ম্যানেজমেন্ট ও ফ্রিল্যান্সিং ক্যারিয়ার',
    thumbnail: '/assets/stories/video_story_4.jpg',
  },
  {
    id: 'v-story-5',
    title: 'ওয়েব ডেভেলপমেন্টের মাধ্যমে ইউরোপীয় ক্লায়েন্টের সাথে ফুল-টাইম রিমোট কাজ',
    thumbnail: '/assets/stories/video_story_5.jpg',
  },
  {
    id: 'v-story-6',
    title: 'জিরো থেকে সাইবার সিকিউরিটি স্পেশালিস্ট ও বাগ বাউন্টি আর্নিং',
    thumbnail: '/assets/stories/video_story_6.jpg',
  },
  {
    id: 'v-story-7',
    title: 'বিশ্ববিদ্যালয় ড্রপআউট থেকে মাল্টিন্যাশনাল এজেন্সির লিড ইউআই ডিজাইনার',
    thumbnail: '/assets/stories/video_story_3.jpg',
  },
  {
    id: 'v-story-8',
    title: 'বগুড়া ক্যাম্পাস থেকে ফুল-স্ট্যাক শিখে আন্তর্জাতিক ক্লায়েন্ট প্রজেক্ট',
    thumbnail: '/assets/stories/video_story_5.jpg',
  },
  {
    id: 'v-story-9',
    title: 'সোশ্যাল মিডিয়া মার্কেটিং থেকে নিজের ডিজিটাল ব্র্যান্ড এজেন্সি প্রতিষ্ঠা',
    thumbnail: '/assets/stories/video_story_4.jpg',
  },
];

export const SuccessAndFinder: React.FC<SuccessAndFinderProps> = ({
  onEnrollCourse,
  onInspectCourse,
}) => {
  const [videoStartIndex, setVideoStartIndex] = useState(0);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<VideoSuccessStory | null>(null);

  const PAGE_SIZE = 6;
  const totalVideos = VIDEO_SUCCESS_STORIES.length;

  const handlePrevVideo = () => {
    setVideoStartIndex((prev) => (prev - 3 + totalVideos) % totalVideos);
  };

  const handleNextVideo = () => {
    setVideoStartIndex((prev) => (prev + 3) % totalVideos);
  };

  const visibleVideos = showAllVideos
    ? VIDEO_SUCCESS_STORIES
    : Array.from({ length: Math.min(PAGE_SIZE, totalVideos) }).map(
        (_, i) => VIDEO_SUCCESS_STORIES[(videoStartIndex + i) % totalVideos]
      );

  const [weeklyHours, setWeeklyHours] = useState<WeeklyHoursChoice>('moderate');
  const [shift, setShift] = useState<ShiftChoice>('Evening / Weekend');
  const [studyMode, setStudyMode] = useState<ModeChoice>('Any Mode');
  const [goal, setGoal] = useState<GoalChoice>('Any Track');
  const [level, setLevel] = useState<LevelChoice>('Beginner');

  const matchedCourses = useMemo(() => {
    const targetHours =
      weeklyHours === 'light' ? 5 : weeklyHours === 'moderate' ? 8 : 12;

    return COURSES.map((course) => {
      let score = 50;
      const reasons: string[] = [];

      if (course.shifts.includes(shift)) {
        score += 20;
        reasons.push(`${shift} batch available`);
      }

      if (targetHours >= course.weeklyHoursMin) {
        score += 15;
        reasons.push(`Fits ${course.weeklyHoursMin}–${course.weeklyHoursMax} hrs/wk pace`);
      } else {
        score -= 10;
      }

      if (goal === 'Any Track' || course.goalTag === goal) {
        score += 15;
        if (goal !== 'Any Track') reasons.push(`Matches ${goal}`);
      }

      if (level === 'Any Level' || course.level === level) {
        score += 10;
        if (level !== 'Any Level') reasons.push(`${level}-friendly track`);
      }

      if (studyMode !== 'Any Mode') {
        reasons.push(studyMode === 'Campus Lab' ? 'Offline Campus Lab' : 'Live Online Studio');
      }

      return {
        course,
        score: Math.min(99, Math.max(45, score)),
        reasons: reasons.slice(0, 3),
      };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
  }, [weeklyHours, shift, studyMode, goal, level]);

  const handleResetFinder = () => {
    setWeeklyHours('moderate');
    setShift('Evening / Weekend');
    setStudyMode('Any Mode');
    setGoal('Any Track');
    setLevel('Beginner');
  };

  return (
    <>
      {/* SECTION 6: SUCCESS STORIES (3 Videos in 1 Line, Reference-Matched Layout) */}
      <section
        id="success-story"
        className="section-band bg-glass-silk text-slate-900"
      >
        <div className="container-1520">
          {/* Header Row: Left-Aligned Title & Subtitle + Top-Right Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl text-left">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.35rem] font-bold tracking-tight text-[#16A34A] leading-tight">
                Success Stories
              </h2>
              <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-600 text-left">
                See All 450+ Success Stories — Real students across all 64 district branches who transformed their careers through hands-on practical lab training.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              <button
                type="button"
                onClick={() => setShowAllVideos((prev) => !prev)}
                className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-slate-800 glass-btn rounded-full transition-all whitespace-nowrap cursor-pointer hover:text-emerald-800"
              >
                {showAllVideos ? 'Show 6 Stories' : 'See All'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevVideo}
                  className="w-10 h-10 rounded-full glass-btn flex items-center justify-center shrink-0 aspect-square text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Previous success stories"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={handleNextVideo}
                  className="w-10 h-10 rounded-full glass-btn flex items-center justify-center shrink-0 aspect-square text-[#1B2668] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Next success stories"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* 3 Videos in 1 Line on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {visibleVideos.map((story) => (
              <article
                key={story.id}
                onClick={() => setActiveVideoModal(story)}
                className="group relative rounded-[26px] overflow-hidden glass border border-white/30 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                {/* 16:9 Video Frame */}
                <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-slate-900">
                  <img
                    src={story.thumbnail}
                    alt={story.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient overlay at bottom for title contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Center Play Button: Transparent glass with green filled play icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full glass flex items-center justify-center border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(22,163,74,0.45)]">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#16A34A] text-[#16A34A] ml-0.5" />
                    </div>
                  </div>

                  {/* Title at the bottom of the video */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-left pointer-events-none">
                    <h3 className="font-display text-sm sm:text-[15px] font-bold text-white leading-snug drop-shadow-md group-hover:text-emerald-300 transition-colors">
                      {story.title}
                    </h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Video Preview Modal */}
        {activeVideoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActiveVideoModal(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-[28px] overflow-hidden glass p-4 bg-slate-900/95 border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10">
                <h3 className="font-display text-base font-bold text-white truncate max-w-xl">
                  {activeVideoModal.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="w-8 h-8 rounded-full glass flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mt-3 bg-black flex items-center justify-center">
                <img
                  src={activeVideoModal.thumbnail}
                  alt={activeVideoModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/50 shadow-2xl">
                    <Play className="w-7 h-7 fill-[#16A34A] text-[#16A34A] ml-0.5" />
                  </div>
                  <p className="text-white text-xs font-semibold tracking-wide">
                    Playing Success Story
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 7: COURSE FINDER CARD (Light Prism Background + Translucent Glass Shell) */}
      <section id="course-finder" className="section-band bg-[#F4F7FA] text-slate-900">
        <div className="container-1520">
          <div className="rounded-[32px] glass p-6 sm:p-8 lg:p-9 shadow-[0_16px_40px_-20px_rgba(23,80,40,0.18)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 section-kicker text-emerald-700">
                  <Compass className="w-4 h-4" strokeWidth={1.75} />
                  Interactive Schedule &amp; Career Matcher
                </div>
                <h2 className="mt-1.5 section-heading text-slate-900" style={{ textWrap: 'balance' }}>
                  Find Your Ideal Course by Availability
                </h2>
                <p className="mt-2 section-subtitle text-slate-600">
                  Select your weekly study hours, preferred shift, and career track to match with
                  upcoming mentor-led cohorts.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      01. Weekly Study Availability
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'light' as const, label: '4–6 hrs / week', sub: 'Flexible Pace' },
                        { id: 'moderate' as const, label: '6–10 hrs / week', sub: 'Standard Track' },
                        { id: 'intensive' as const, label: '10+ hrs / week', sub: 'Fast-Track Lab' },
                      ].map((opt) => {
                        const active = weeklyHours === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setWeeklyHours(opt.id)}
                            className={`text-left px-4 py-3 rounded-2xl border transition-all cursor-pointer ${active
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/25'
                              : 'glass text-slate-800 border-white/60 hover:bg-white/60'
                              }`}
                          >
                            <div className="text-sm font-bold tabular-nums">{opt.label}</div>
                            <div
                              className={`text-xs ${active ? 'text-emerald-100' : 'text-slate-500'
                                }`}
                            >
                              {opt.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        02. Preferred Batch Time
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['Morning', 'Afternoon', 'Evening / Weekend'] as const).map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setShift(item)}
                            className={`h-9 px-4 text-xs font-semibold rounded-full border transition-colors whitespace-nowrap cursor-pointer ${shift === item
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'glass text-slate-700 border-white/60 hover:bg-white/60'
                              }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        03. Learning Mode &amp; Level
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(['Any Mode', 'Campus Lab', 'Live Online'] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setStudyMode(m)}
                            className={`h-9 px-4 text-xs font-semibold rounded-full border transition-colors whitespace-nowrap cursor-pointer ${studyMode === m
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'glass text-slate-700 border-white/60 hover:bg-white/60'
                              }`}
                          >
                            {m}
                          </button>
                        ))}
                        {(['Beginner', 'Intermediate'] as const).map((lv) => (
                          <button
                            key={lv}
                            type="button"
                            onClick={() => setLevel(lv === level ? 'Any Level' : lv)}
                            className={`h-9 px-4 text-xs font-semibold rounded-full border transition-colors whitespace-nowrap cursor-pointer ${level === lv
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : 'glass text-slate-700 border-white/60 hover:bg-white/60'
                              }`}
                          >
                            {lv}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-700">
                        04. Career Interest Area
                      </label>
                      <button
                        type="button"
                        onClick={handleResetFinder}
                        className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-900 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
                        Reset
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          'Any Track',
                          'Design & Creative',
                          'Coding & Web',
                          'Cyber & Networking',
                          'Marketing & Freelancing',
                        ] as const
                      ).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGoal(g)}
                          className={`h-9 px-4 text-xs font-semibold rounded-full border transition-colors whitespace-nowrap cursor-pointer ${goal === g
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'glass text-slate-700 border-white/60 hover:bg-white/60'
                            }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-[26px] glass p-5 space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-900/10 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
                      Recommended For Your Schedule
                    </div>
                    <h3 className="card-title text-slate-900 mt-0.5">Top Matching Courses</h3>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-500/15 px-2.5 py-1 rounded-full tabular-nums">{shift}</span>
                </div>

                <div className="space-y-3">
                  {matchedCourses.map(({ course, score, reasons }, idx) => (
                    <div
                      key={course.id}
                      className={`rounded-2xl p-4 border transition-colors ${idx === 0
                        ? 'bg-white/80 border-emerald-500/40 shadow-md ring-1 ring-emerald-500/30'
                        : 'bg-white/60 border-white/80 shadow-sm'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-emerald-700">
                            {course.categoryLabel} · {course.durationMonths} Months
                          </div>
                          <h4 className="font-display text-base font-bold text-slate-900 mt-0.5">
                            {course.title}
                          </h4>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-display text-sm font-extrabold text-emerald-700 tabular-nums">
                            {score}% Match
                          </div>
                          <div className="text-[11px] font-semibold text-slate-500 tabular-nums">
                            {studyMode === 'Live Online' ? course.onlineFee : course.offlineFee}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                        {reasons.map((reason) => (
                          <span key={reason} className="inline-flex items-center gap-1">
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                              strokeWidth={1.75}
                            />
                            {reason}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEnrollCourse(course, 'enroll')}
                          className="flex-1 h-9 px-4 text-xs font-semibold btn-emerald-glow rounded-full transition-all cursor-pointer shadow-md shadow-emerald-700/20"
                        >
                          Reserve Batch Seat
                        </button>
                        <button
                          type="button"
                          onClick={() => onInspectCourse(course)}
                          className="h-9 px-4 text-xs font-semibold text-slate-800 glass-btn rounded-full transition-colors cursor-pointer"
                        >
                          Syllabus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-1 flex items-center gap-2 text-xs text-slate-500">
                  <CalendarClock className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.75} />
                  <span>New cohorts start every 1st and 15th of the month.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

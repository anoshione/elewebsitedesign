import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Play,
  Star,
  X,
} from 'lucide-react';
import { COURSES, CourseItem } from '../data/homeData';
import { CoursePosterBanner, SilkBackdrop } from './Graphics';

interface SuccessAndFinderProps {
  onEnrollCourse: (course: CourseItem, actionType: 'enroll' | 'discount' | 'seminar') => void;
  onInspectCourse: (course: CourseItem) => void;
}

const TOPIC_OPTIONS = [
  { id: 'design', label: 'Graphic Design & UI/UX' },
  { id: 'development', label: 'Web & Software Development' },
  { id: 'marketing', label: 'Digital Marketing & Growth' },
  { id: 'cyber-security', label: 'Cyber Security & Ethical Hacking' },
  { id: 'animation-video', label: '3D Animation & Video Editing' },
  { id: 'ai', label: 'AI & Data Science' },
] as const;

type TopicOptionId = (typeof TOPIC_OPTIONS)[number]['id'];

const EXPERIENCE_OPTIONS = [
  { id: 'beginner', label: 'Complete Beginner (No prior experience)' },
  { id: 'some-exp', label: 'Some Experience (Know the basics)' },
  { id: 'pro', label: 'Working Professional (Upskilling)' },
] as const;

type ExperienceOptionId = (typeof EXPERIENCE_OPTIONS)[number]['id'];

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

  const [selectedTopic, setSelectedTopic] = useState<TopicOptionId | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceOptionId | null>(null);
  const [openDropdown, setOpenDropdown] = useState<'topic' | 'experience' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown]);

  const matchedCourses = useMemo(() => {
    if (!selectedTopic || !selectedExperience) {
      return [];
    }

    let courses = [...COURSES];

    switch (selectedTopic) {
      case 'design':
        courses = courses.filter(
          (c) =>
            c.goalTag === 'Design & Creative' ||
            c.departmentId === 'graphics' ||
            c.id === 'wordpress-theme'
        );
        break;
      case 'development':
        courses = courses.filter(
          (c) =>
            c.goalTag === 'Coding & Web' ||
            c.departmentId === 'web-dev' ||
            c.id === 'web-app-laravel' ||
            c.id === 'wordpress-theme'
        );
        break;
      case 'marketing':
        courses = courses.filter(
          (c) =>
            c.goalTag === 'Marketing & Freelancing' ||
            c.departmentId === 'marketing' ||
            c.id === 'digital-marketing'
        );
        break;
      case 'cyber-security':
        courses = courses.filter(
          (c) =>
            c.goalTag === 'Cyber & Networking' ||
            c.departmentId === 'cyber-security' ||
            c.departmentId === 'networking' ||
            c.id === 'ethical-hacker' ||
            c.id === 'it-support-cctv'
        );
        break;
      case 'animation-video':
        courses = courses.filter(
          (c) =>
            c.categoryLabel.toLowerCase().includes('animation') ||
            c.categoryLabel.toLowerCase().includes('video') ||
            c.departmentId === 'graphics'
        );
        break;
      case 'ai':
        courses = courses.filter(
          (c) =>
            c.title.toLowerCase().includes('ai') ||
            c.subtitle.toLowerCase().includes('ai') ||
            c.posterSub.toLowerCase().includes('ai') ||
            c.id === 'ethical-hacker' ||
            c.id === 'web-app-laravel'
        );
        break;
      default:
        break;
    }

    if (selectedExperience === 'beginner') {
      courses = [...courses].sort((a, b) => (a.level === 'Beginner' ? -1 : 1));
    } else if (selectedExperience === 'pro') {
      courses = [...courses].sort((a, b) => (a.level === 'Intermediate' || a.level === 'Advanced' ? -1 : 1));
    }

    return courses.slice(0, 3);
  }, [selectedTopic, selectedExperience]);

  return (
    <>
      {/* SECTION 6: SUCCESS STORIES (Silk Backdrop + 3 Videos in 1 Line) */}
      <section
        id="success-story"
        className="relative overflow-hidden section-band-green text-slate-900"
      >
        <SilkBackdrop />
        <div className="container-1520 relative z-10">
          {/* Header Row: Left-Aligned Title & Subtitle + Top-Right Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl text-left">
              <p className="section-tag">SUCCESS STORIES</p>
              <h2 className="heading-gradient-green">
                Real Journeys, Measurable Career Outcomes
              </h2>
              <p className="section-subtitle-max2 mt-2">
                Real students across all 64 district branches who transformed their careers through hands-on practical lab training.
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
                  className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Previous success stories"
                >
                  <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={handleNextVideo}
                  className="w-10 h-10 rounded-full arrow-btn flex items-center justify-center shrink-0 aspect-square cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Next success stories"
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
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

      {/* SECTION 7: COURSE FINDER (2 Separate Cards Side-by-Side on Silky Green Backdrop, matching FAQ layout) */}
      <section id="course-finder" className="relative overflow-hidden section-band-green text-slate-900">
        <SilkBackdrop />
        <div className="container-1520 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-6 xl:gap-7 items-stretch">
            {/* Card 1: Left Column (4 cols on lg) - Dedicated Card with Title, Subtitle & 3D Background Visual */}
            <div className="lg:col-span-4 relative rounded-[28px] sm:rounded-[32px] overflow-hidden p-6 sm:p-8 lg:p-9 flex flex-col justify-between min-h-[520px] lg:min-h-[580px] h-full border border-emerald-100/70 shadow-[0_20px_45px_-15px_rgba(0,143,47,0.12)] bg-white">
              {/* Background Visual Image full-bleed without hard cutoff */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                  src="/assets/course_finder_visual.jpg"
                  alt="Find the course that suits you"
                  className="w-full h-full object-cover object-bottom select-none"
                />
                {/* Transparent white fade overlay over upper text area ensuring crisp legibility without cutting off the artwork */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 via-40% to-transparent pointer-events-none" />
              </div>

              {/* Top: Title & Description Section */}
              <div className="relative z-10">
                <div className="mb-2.5">
                  <p className="section-tag">COURSE FINDER</p>
                </div>

                <h2
                  className="heading-gradient-green !whitespace-normal mb-3.5"
                  style={{ textWrap: 'balance' }}
                >
                  Find the course that suits you
                </h2>

                <p className="text-xs sm:text-sm lg:text-[14px] leading-relaxed text-slate-600">
                  Tell us what you enjoy and how much experience you have, and we&apos;ll suggest the courses that fit you best. If you&apos;d like a second opinion, you can talk to one of our advisors right away.
                </p>
              </div>
            </div>

            {/* Card 2: Right Column (8 cols on lg) - Dedicated Selector Card with Dropdowns, Suggested Courses & Advisor CTA */}
            <div className="lg:col-span-8 relative rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 lg:p-10 flex flex-col justify-between min-h-[520px] lg:min-h-[580px] h-full border border-emerald-100/70 shadow-[0_20px_45px_-15px_rgba(0,143,47,0.12)] bg-white/95 backdrop-blur-xl">
              <div>
                {/* Two Questions with Glass Dropdown Fields */}
                <div ref={dropdownRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
                  {/* Question 01: What do you want to learn? */}
                  <div className={`relative ${openDropdown === 'topic' ? 'z-40' : 'z-20'}`}>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2">
                      <span className="text-[#008F2F] font-bold mr-1.5 tabular-nums">01</span>
                      What do you want to learn?
                    </label>
                    {/* Glass Dropdown Trigger */}
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'topic' ? null : 'topic')}
                      className={`w-full h-[50px] px-4 rounded-2xl bg-white/80 backdrop-blur-xl border shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] transition-all flex items-center justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40 relative z-30 ${
                        openDropdown === 'topic'
                          ? 'border-emerald-500 bg-white shadow-md'
                          : 'border-slate-200/90 hover:bg-white hover:border-emerald-400/60'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-medium truncate pr-2 ${selectedTopic ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                        {TOPIC_OPTIONS.find((t) => t.id === selectedTopic)?.label || 'Select what you want to learn...'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                          openDropdown === 'topic' ? 'rotate-180 text-emerald-700' : ''
                        }`}
                        strokeWidth={2}
                      />
                    </button>

                    {/* Glass Blurred Dropdown Menu */}
                    {openDropdown === 'topic' && (
                      <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.16)] ring-1 ring-black/5 p-1.5 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150 max-h-[280px] overflow-y-auto">
                        {TOPIC_OPTIONS.map((opt) => {
                          const isSelected = selectedTopic === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setSelectedTopic(opt.id);
                                setOpenDropdown(null);
                              }}
                              className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-[#008F2F] text-white shadow-xs font-semibold'
                                  : 'text-slate-700 hover:bg-white/90 hover:text-emerald-700'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && <Check className="w-4 h-4 text-white shrink-0" strokeWidth={2.5} />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Question 02: Where are you starting from? */}
                  <div className={`relative ${openDropdown === 'experience' ? 'z-40' : 'z-20'}`}>
                    <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2">
                      <span className="text-[#008F2F] font-bold mr-1.5 tabular-nums">02</span>
                      Where are you starting from?
                    </label>
                    {/* Glass Dropdown Trigger */}
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(openDropdown === 'experience' ? null : 'experience')}
                      className={`w-full h-[50px] px-4 rounded-2xl bg-white/80 backdrop-blur-xl border shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] transition-all flex items-center justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40 relative z-30 ${
                        openDropdown === 'experience'
                          ? 'border-emerald-500 bg-white shadow-md'
                          : 'border-slate-200/90 hover:bg-white hover:border-emerald-400/60'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-medium truncate pr-2 ${selectedExperience ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                        {EXPERIENCE_OPTIONS.find((e) => e.id === selectedExperience)?.label || 'Select your experience level...'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                          openDropdown === 'experience' ? 'rotate-180 text-emerald-700' : ''
                        }`}
                        strokeWidth={2}
                      />
                    </button>

                    {/* Glass Blurred Dropdown Menu */}
                    {openDropdown === 'experience' && (
                      <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 rounded-2xl bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.16)] ring-1 ring-black/5 p-1.5 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150 max-h-[280px] overflow-y-auto">
                        {EXPERIENCE_OPTIONS.map((opt) => {
                          const isSelected = selectedExperience === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setSelectedExperience(opt.id);
                                setOpenDropdown(null);
                              }}
                              className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-[#008F2F] text-white shadow-xs font-semibold'
                                  : 'text-slate-700 hover:bg-white/90 hover:text-emerald-700'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && <Check className="w-4 h-4 text-white shrink-0" strokeWidth={2.5} />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Suggested Courses: Blank until user selects both dropdowns, then shows max 3 courses */}
                {selectedTopic && selectedExperience && matchedCourses.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {matchedCourses.map((course) => (
                      <article
                        key={course.id}
                        onClick={() => onInspectCourse(course)}
                        className="group rounded-[22px] bg-white/80 backdrop-blur-xl border border-white/80 p-3.5 sm:p-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-10px_rgba(0,143,47,0.18)] hover:border-emerald-400/60 hover:bg-white transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center gap-3.5 sm:gap-4 relative overflow-hidden"
                      >
                        {/* Left: Course icon / mini thumbnail */}
                        <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 border border-emerald-100/80 p-2 flex items-center justify-center relative shadow-xs group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={`/assets/departments/${course.departmentId}.png`}
                            alt=""
                            className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.08)] select-none"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/assets/departments/graphics.png';
                            }}
                          />
                        </div>

                        {/* Middle: Title, Length, Fee */}
                        <div className="flex-1 min-w-0 pr-1">
                          <h4 className="font-display font-bold text-slate-900 text-sm sm:text-[15px] leading-snug group-hover:text-emerald-700 transition-colors truncate">
                            {course.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.8} />
                            <span>{course.durationMonths} Months</span>
                          </p>
                          <div className="mt-1 font-display text-sm sm:text-[15px] font-bold text-[#008F2F] tabular-nums">
                            {course.offlineFee}
                          </div>
                        </div>

                        {/* Right: Signature Glass Arrow Action matching rest of website */}
                        <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full arrow-btn card-arrow-btn shrink-0 aspect-square flex items-center justify-center cursor-pointer">
                          <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2.2} />
                        </span>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Advisor CTA Row */}
              <div className="mt-7 pt-5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => onEnrollCourse(matchedCourses[0] || COURSES[0], 'seminar')}
                    className="inline-flex items-center justify-center h-[46px] px-6 text-sm font-semibold text-white btn-gradient-green rounded-full transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    Talk to an advisor
                  </button>
                  <button
                    type="button"
                    onClick={() => onEnrollCourse(matchedCourses[0] || COURSES[0], 'seminar')}
                    className="text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 underline decoration-slate-300 hover:decoration-emerald-600 transition-colors cursor-pointer"
                  >
                    Free seminars run every week — join one.
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

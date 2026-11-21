import React, { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import {
  DEPARTMENTS,
  COURSE_TABS,
  COURSES,
  CourseItem,
  DepartmentId,
} from '../data/homeData';
import { CoursePosterBanner, DepartmentIllustration, SilkBackdrop } from './Graphics';

interface DepartmentsAndCoursesProps {
  selectedDept: 'all' | DepartmentId;
  onSelectDept: (dept: 'all' | DepartmentId) => void;
  onEnrollCourse: (course: CourseItem, actionType: 'enroll' | 'discount') => void;
  onInspectCourse: (course: CourseItem) => void;
}

interface DeptVisualConfig {
  canvasWidth: number;
  canvasHeight: number;
  bottomOffset: number;
  rightOffset: number;
  shadowWidth: number;
  shadowRight: number;
  hoverScale: number;
}

const DEPT_VISUALS: Record<DepartmentId, DeptVisualConfig> = {
  'cyber-security': {
    canvasWidth: 181,
    canvasHeight: 101,
    bottomOffset: 4,
    rightOffset: -38,
    shadowWidth: 115,
    shadowRight: 10,
    hoverScale: 1.10,
  },
  database: {
    canvasWidth: 116,
    canvasHeight: 107,
    bottomOffset: 4,
    rightOffset: 8,
    shadowWidth: 96,
    shadowRight: 14,
    hoverScale: 1.08,
  },
  graphics: {
    canvasWidth: 138,
    canvasHeight: 138,
    bottomOffset: -14,
    rightOffset: 6,
    shadowWidth: 100,
    shadowRight: 12,
    hoverScale: 1.10,
  },
  networking: {
    canvasWidth: 180,
    canvasHeight: 100,
    bottomOffset: 4,
    rightOffset: -38,
    shadowWidth: 115,
    shadowRight: 10,
    hoverScale: 1.10,
  },
  marketing: {
    canvasWidth: 194,
    canvasHeight: 194,
    bottomOffset: -36,
    rightOffset: -6,
    shadowWidth: 125,
    shadowRight: 12,
    hoverScale: 1.08,
  },
  government: {
    canvasWidth: 181,
    canvasHeight: 101,
    bottomOffset: 4,
    rightOffset: -8,
    shadowWidth: 125,
    shadowRight: 10,
    hoverScale: 1.08,
  },
  'web-dev': {
    canvasWidth: 160,
    canvasHeight: 110,
    bottomOffset: 4,
    rightOffset: -12,
    shadowWidth: 110,
    shadowRight: 10,
    hoverScale: 1.10,
  },
};

/**
 * Per-department 3D icon with optical normalization, ground floor shadow,
 * dynamic elevation, specular sheen, and parallax tilt.
 */
const DeptArt: React.FC<{
  id: DepartmentId;
  isHovered: boolean;
  tiltRx: number;
  tiltRy: number;
  parallaxX: number;
  parallaxY: number;
}> = ({ id, isHovered, tiltRx, tiltRy, parallaxX, parallaxY }) => {
  const [failed, setFailed] = useState(false);
  const cfg = DEPT_VISUALS[id] || {
    canvasWidth: 140,
    canvasHeight: 110,
    bottomOffset: 4,
    rightOffset: 6,
    shadowWidth: 100,
    shadowRight: 10,
    hoverScale: 1.1,
  };

  if (failed) {
    return (
      <div
        className="absolute bottom-3 right-3 w-[132px] h-[104px] flex items-end justify-end pointer-events-none opacity-90 transition-all duration-400 ease-out group-hover:scale-115 group-hover:-translate-y-2"
        aria-hidden="true"
      >
        <DepartmentIllustration id={id} />
      </div>
    );
  }

  return (
    <div
      className="absolute pointer-events-none select-none z-10 dept-icon-scene"
      style={{
        bottom: `${cfg.bottomOffset}px`,
        right: `${cfg.rightOffset}px`,
        width: `${cfg.canvasWidth}px`,
        height: `${cfg.canvasHeight}px`,
        perspective: '600px',
      }}
      aria-hidden="true"
    >
      {/* 1. Independent Ground Floor Shadow (anchored to card floor) */}
      <div
        className="dept-floor-shadow"
        style={{
          width: `${cfg.shadowWidth}px`,
          right: `${cfg.shadowRight}px`,
          bottom: `${Math.max(6, 12 - cfg.bottomOffset)}px`,
          transform: isHovered
            ? 'scale(1.12, 0.88) translateY(4px)'
            : 'scale(0.95, 0.95) translateY(0px)',
          opacity: isHovered ? 0.35 : 0.18,
          transition: 'all 0.35s ease-out',
        }}
      />

      {/* 2. Soft Ambient Multi-chromatic Aura */}
      <div
        className="absolute rounded-full dept-icon-glow blur-2xl pointer-events-none"
        style={{
          width: `${cfg.shadowWidth}px`,
          height: `${cfg.shadowWidth}px`,
          right: `${cfg.shadowRight}px`,
          bottom: '10px',
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.50) 0%, rgba(56, 189, 248, 0.30) 45%, transparent 75%)',
          opacity: isHovered ? 0.60 : 0.15,
          transform: isHovered
            ? 'scale(1.2) translate3d(-4px, -6px, 0)'
            : 'scale(0.85) translate3d(0, 0, 0)',
          transition: 'all 0.4s ease-out',
        }}
      />

      {/* 3. 3D Floating Icon with Dynamic Elevation, Popout & Parallax Tilt */}
      <div
        className="relative w-full h-full flex items-end justify-end dept-3d-floating-icon"
        style={{
          transform: isHovered
            ? `perspective(600px) rotateX(${tiltRx.toFixed(1)}deg) rotateY(${tiltRy.toFixed(1)}deg) translate3d(${(-2 + parallaxX * 0.15).toFixed(1)}px, ${(-6 + parallaxY * 0.15).toFixed(1)}px, 0px) scale(1.05) rotate(-1.5deg)`
            : 'perspective(600px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px) scale(1) rotate(0deg)',
          transformStyle: 'preserve-3d',
          filter: isHovered
            ? 'drop-shadow(0 14px 18px rgba(0, 30, 15, 0.20)) drop-shadow(0 4px 8px rgba(0, 143, 47, 0.16)) brightness(1.04)'
            : 'drop-shadow(0 8px 14px rgba(10, 40, 20, 0.10))',
          transition: 'transform 0.35s ease-out, filter 0.3s ease',
        }}
      >
        <img
          src={`/assets/departments/${id}.png`}
          alt=""
          draggable={false}
          onError={() => setFailed(true)}
          style={{
            width: `${cfg.canvasWidth}px`,
            height: `${cfg.canvasHeight}px`,
          }}
          className="object-contain pointer-events-none select-none"
        />

        {/* 4. Specular Light Sheen Sweeping Across the Glass */}
        <div className="dept-glass-shimmer" />
      </div>
    </div>
  );
};

const DeptCard: React.FC<{
  dept: (typeof DEPARTMENTS)[number];
  onJump: (id: DepartmentId) => void;
}> = ({ dept, onJump }) => {
  const cardRef = React.useRef<HTMLButtonElement>(null);
  const [logoTilt, setLogoTilt] = useState({ rx: 0, ry: 0, px: 0, py: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    // subtle 3D tilt
    const rx = ((y - cy) / cy) * -4;
    const ry = ((x - cx) / cx) * 4;
    const px = ((x - cx) / cx) * 4;
    const py = ((y - cy) / cy) * 4;
    setLogoTilt({ rx, ry, px, py });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setLogoTilt({ rx: 0, ry: 0, px: 0, py: 0 });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onJump(dept.id)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative text-left rounded-[32px] dept-glass-card pt-6 px-6 pb-6 min-h-[252px] flex flex-col overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* 1. Dynamic Specular Light Sheen Sweep Across Glass Surface on Hover */}
      <div className="dept-surface-sheen" aria-hidden="true" />

      {/* 2. Frosted Glass Surface Glow on Hover (Smooth Whole-Card Luminescent Wash) */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-400 ease-out opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/40 via-emerald-100/20 to-teal-100/25"
        aria-hidden="true"
      />

      {/* 3. Top Specular Edge Highlight on Hover (Crisp White Glass Rim) */}
      <div
        className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-white/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.9)]"
        aria-hidden="true"
      />

      {/* 4. Interactive Cursor Specular Spotlight on the Frosted Glass */}
      <div
        className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.55) 0%, rgba(52, 211, 153, 0.28) 32%, rgba(56, 189, 248, 0.15) 55%, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* 5. Title & Description: Moves down smoothly on hover */}
      <div className="relative z-20 transition-transform duration-300 ease-out transform group-hover:translate-y-2">
        <h3 className="text-slate-900 text-[22px] font-semibold tracking-tight leading-snug transition-colors duration-300 group-hover:text-[#008F2F]">
          {dept.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-[1.5] max-w-[65%] transition-colors duration-300 group-hover:text-slate-800">
          {dept.subtitle}
        </p>
      </div>

      {/* 6. Arrow Action Button */}
      <span
        className="relative z-20 mt-auto shrink-0 aspect-square inline-flex w-11 h-11 min-w-[44px] min-h-[44px] rounded-full card-arrow-btn arrow-btn items-center justify-center transition-all duration-300 group-hover:scale-105"
      >
        <ArrowRight className="w-4.5 h-4.5 shrink-0" strokeWidth={2.2} />
      </span>

      {/* 7. 3D Department Icon */}
      <DeptArt
        id={dept.id}
        isHovered={isHovered}
        tiltRx={logoTilt.rx}
        tiltRy={logoTilt.ry}
        parallaxX={logoTilt.px}
        parallaxY={logoTilt.py}
      />
    </button>
  );
};

export const DepartmentsAndCourses: React.FC<DepartmentsAndCoursesProps> = ({
  selectedDept,
  onSelectDept,
  onEnrollCourse,
  onInspectCourse,
}) => {
  const handleDepartmentJump = (deptId: DepartmentId) => {
    if (deptId === 'database' || deptId === 'government') {
      onSelectDept('all');
    } else {
      onSelectDept(deptId);
    }
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredCourses = COURSES.filter(
    (course) => selectedDept === 'all' || course.departmentId === selectedDept,
  );

  return (
    <>
      {/* SECTION 3: DEPARTMENTS (Silky light-green backdrop + frosted glass cards + pastel 3D icons) */}
      <section id="departments" className="relative overflow-hidden section-band-green text-slate-900">
        <SilkBackdrop />

        <div className="container-1520 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-9">
            <div className="max-w-3xl">
              <p className="section-tag">DEPARTMENTS</p>
              <h2 className="heading-gradient-green">
                Explore Our Career Departments
              </h2>
              <p className="section-subtitle-max2 mt-2">
                Master in-demand IT skills across specialized faculties and launch a high-earning global career from your hometown.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDepartmentJump('cyber-security')}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold text-slate-800 glass-btn rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer hover:text-emerald-800"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => (
              <DeptCard
                key={dept.id}
                dept={dept}
                onJump={handleDepartmentJump}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: POPULAR COURSE (Solid #FBFCF8 + Frosted Glass Course Cards) */}
      <section id="courses" className="section-band bg-[#FBFCF8]">
        <div className="container-1520">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
            <div>
              <p className="section-tag">COURSES</p>
              <h2 className="heading-gradient-green">
                Build the Skills That Shape Your Future
              </h2>
              <p className="section-subtitle-max2 mt-2">
                Every course is project-based, mentor-led, and available both on campus across 42+
                branches and through live online classes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectDept('all')}
              className="inline-flex items-center justify-center h-11 px-5 text-sm font-semibold text-slate-800 glass-btn hover:text-emerald-700 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 glass rounded-full mb-8" role="tablist" aria-label="Filter courses by category">
            {COURSE_TABS.map((tab) => {
              const active = selectedDept === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectDept(tab.id)}
                  className={`h-9 px-4 text-xs sm:text-sm font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${active
                    ? 'btn-gradient-green text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/75'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="rounded-[32px] glass p-10 text-center">
              <p className="card-body text-slate-700">
                No courses match this exact filter combination.
              </p>
              <button
                type="button"
                onClick={() => onSelectDept('all')}
                className="mt-4 h-11 px-6 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full cursor-pointer"
              >
                Reset Course Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="rounded-[32px] glass p-3.5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onInspectCourse(course)}
                      className="w-full text-left cursor-pointer rounded-[24px] block overflow-hidden shadow-sm"
                      aria-label={`View syllabus for ${course.title}`}
                    >
                      <CoursePosterBanner
                        theme={course.posterTheme}
                        title={course.posterTitle}
                        highlight={course.posterHighlight}
                        sub={course.posterSub}
                      />
                    </button>

                    <div className="px-1 pt-3.5">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-emerald-700">
                        {course.categoryLabel}
                      </div>

                      <h3 className="mt-1.5 card-title text-slate-900">
                        <button
                          type="button"
                          onClick={() => onInspectCourse(course)}
                          className="text-left hover:text-emerald-700 transition-colors cursor-pointer"
                        >
                          {course.title}
                        </button>
                      </h3>

                      <p className="mt-1.5 card-body text-slate-600">{course.subtitle}</p>

                      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                          <Star
                            className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0"
                            strokeWidth={1.75}
                          />
                          {course.rating} ({course.reviewsCount} Student Review)
                        </span>
                        <span className="font-semibold text-slate-800">
                          {course.studentsCount} Students
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center h-7 px-3 rounded-full bg-white shadow-sm text-xs font-semibold text-slate-800">
                          {course.durationMonths} Months
                        </span>
                        <span className="inline-flex items-center h-7 px-3 rounded-full bg-white shadow-sm text-xs font-semibold text-slate-800">
                          {course.classesCount} Classes
                        </span>
                        <span className="inline-flex items-center h-7 px-3 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                          {course.mode.replace(/\s*\+\s*/g, '+')}
                        </span>
                      </div>

                      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                        <div className="rounded-[24px] bg-white/75 border border-white/90 px-3 py-2 text-center">
                          <div className="text-[11px] font-medium text-slate-500">
                            Offline Fee
                          </div>
                          <div className="font-display text-sm font-bold text-emerald-700 tabular-nums mt-0.5">
                            {course.offlineFee}
                          </div>
                        </div>
                        <div className="rounded-[24px] bg-white/75 border border-white/90 px-3 py-2 text-center">
                          <div className="text-[11px] font-medium text-slate-500">
                            Online Fee
                          </div>
                          <div className="font-display text-sm font-bold text-emerald-700 tabular-nums mt-0.5">
                            {course.onlineFee}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-[1fr_1.55fr] gap-3">
                    <button
                      type="button"
                      onClick={() => onEnrollCourse(course, 'discount')}
                      className="h-[52px] px-3 text-sm font-bold text-rose-600 bg-rose-100/80 hover:bg-rose-200/80 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Get Discount
                    </button>
                    <button
                      type="button"
                      onClick={() => onEnrollCourse(course, 'enroll')}
                      className="h-[52px] px-4 text-sm font-bold text-white btn-gradient-green rounded-full transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Enroll Now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};


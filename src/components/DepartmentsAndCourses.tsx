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

/**
 * Per-department 3D icon. Drop the icon PNGs into `public/assets/departments/`
 * named by department id: cyber-security.png, database.png, graphics.png,
 * networking.png, marketing.png, government.png.
 * Falls back to the built-in vector illustration while a file is missing.
 */
const DeptArt: React.FC<{ id: DepartmentId }> = ({ id }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute bottom-3 right-3 w-[132px] h-[104px] flex items-end justify-end pointer-events-none opacity-90"
        aria-hidden="true"
      >
        <DepartmentIllustration id={id} />
      </div>
    );
  }

  return (
    <img
      src={`/assets/departments/${id}.png`}
      alt=""
      aria-hidden="true"
      draggable={false}
      onError={() => setFailed(true)}
      className="absolute bottom-3 right-3 w-[150px] h-[112px] object-contain object-bottom-right pointer-events-none select-none mix-blend-multiply drop-shadow-[0_12px_20px_rgba(30,90,50,0.28)]"
    />
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
      <section id="departments" className="relative overflow-hidden section-band text-slate-900">
        <SilkBackdrop />

        <div className="container-1520 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-9">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl lg:text-[2.5rem] font-bold tracking-tight text-[#1CA24A]">
                Explore Our Departments &amp; Build Your Career Path
              </h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-slate-500 max-w-2xl">
                Transform your IT potential into global earnings. Master in-demand IT skills at
                Bangladesh&apos;s top freelancing institute and launch your global career from your
                hometown.
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
              <button
                key={dept.id}
                type="button"
                onClick={() => handleDepartmentJump(dept.id)}
                className="group relative text-left rounded-[24px] glass p-6 min-h-[248px] flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:brightness-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <h3 className="card-title text-slate-900 text-xl">{dept.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-[1.5] max-w-[65%]">
                  {dept.subtitle}
                </p>

                <span className="relative z-10 mt-auto shrink-0 aspect-square inline-flex w-11 h-11 min-w-[44px] min-h-[44px] rounded-full glass-btn items-center justify-center text-[#1B2668] group-hover:bg-emerald-600/90 group-hover:border-emerald-400 group-hover:text-white transition-colors">
                  <ArrowRight className="w-4.5 h-4.5" strokeWidth={2} />
                </span>

                <DeptArt id={dept.id} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: POPULAR COURSE (Prism Grid Backdrop + Frosted Glass Course Cards) */}
      <section id="courses" className="section-band bg-glass-prism">
        <div className="container-1520">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
            <div>
              <p className="section-kicker text-emerald-700 mb-1.5">Mentor-Led Cohort Programs</p>
              <h2 className="section-heading text-slate-900" style={{ textWrap: 'balance' }}>
                Build the Skills That Shape Your Future
              </h2>
              <p className="mt-2 section-subtitle text-slate-600">
                Every course is project-based, mentor-led, and available both on campus across 42+
                branches and through live online classes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectDept('all')}
              className="inline-flex items-center justify-center h-11 px-5 text-sm font-semibold text-slate-800 glass-btn hover:text-emerald-700 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              View All ({COURSES.length})
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
                  className={`h-9 px-4 text-xs sm:text-sm font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/75'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="rounded-[26px] glass p-10 text-center">
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
                  className="rounded-[26px] glass p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onInspectCourse(course)}
                      className="w-full text-left cursor-pointer rounded-[18px] block"
                      aria-label={`View syllabus for ${course.title}`}
                    >
                      <CoursePosterBanner
                        theme={course.posterTheme}
                        title={course.posterTitle}
                        highlight={course.posterHighlight}
                        sub={course.posterSub}
                      />
                    </button>

                    <div className="pt-4">
                      <div className="text-sm font-bold uppercase tracking-wide text-emerald-700">
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
                        <div className="rounded-2xl bg-white/75 border border-white/90 px-3 py-2 text-center">
                          <div className="text-[11px] font-medium text-slate-500">
                            Offline Fee
                          </div>
                          <div className="font-display text-sm font-bold text-emerald-700 tabular-nums mt-0.5">
                            {course.offlineFee}
                          </div>
                        </div>
                        <div className="rounded-2xl bg-white/75 border border-white/90 px-3 py-2 text-center">
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
                      className="h-12 px-3 text-sm font-bold text-rose-600 bg-rose-100/80 hover:bg-rose-200/80 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Get Discount
                    </button>
                    <button
                      type="button"
                      onClick={() => onEnrollCourse(course, 'enroll')}
                      className="h-12 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors whitespace-nowrap cursor-pointer shadow-[0_10px_22px_-8px_rgba(16,185,129,0.55)]"
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


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { DepartmentId } from './data/homeData';
import { Header } from './components/Header';
import { HeroAndTrust } from './components/HeroAndTrust';
import { DepartmentsAndCourses } from './components/DepartmentsAndCourses';
import { SuccessAndFinder } from './components/SuccessAndFinder';
import { StudentTestimonials } from './components/StudentTestimonials';
import { TrainersAndAtAGlance } from './components/TrainersAndAtAGlance';
import { NewsAndEnvironmentCta } from './components/NewsAndEnvironmentCta';
import { BlogFaqMemberFooter } from './components/BlogFaqMemberFooter';
import { ModalState, Modals } from './components/Modals';

export default function App() {
  const [selectedDept, setSelectedDept] = useState<'all' | DepartmentId>('all');
  const [modal, setModal] = useState<ModalState>({ type: 'none' });

  return (
    <div className="min-h-screen w-full bg-[#EEF5F9] text-slate-900 overflow-x-hidden">
      {/* 1. Header */}
      <Header
        onEnrollClick={() => setModal({ type: 'form', mode: 'enroll' })}
        onSearchClick={() => setModal({ type: 'search' })}
        onLoginClick={() => setModal({ type: 'login' })}
      />

      <main>
        {/* 2. Hero Section & 3. Trust Section */}
        <HeroAndTrust
          onJoinSeminar={() => setModal({ type: 'form', mode: 'seminar' })}
          onWatchVideo={() => setModal({ type: 'video' })}
        />

        {/* 4. Departments (All Course Category) & 5. Popular Course */}
        <DepartmentsAndCourses
          selectedDept={selectedDept}
          onSelectDept={setSelectedDept}
          onEnrollCourse={(course, actionType) =>
            setModal({ type: 'form', mode: actionType, course })
          }
          onInspectCourse={(course) => setModal({ type: 'course', course })}
        />

        {/* 6. Success Story & 7. Course Finder Card */}
        <SuccessAndFinder
          onEnrollCourse={(course, actionType) =>
            setModal({ type: 'form', mode: actionType, course })
          }
          onInspectCourse={(course) => setModal({ type: 'course', course })}
        />

        {/* Student Testimonials */}
        <StudentTestimonials />

        {/* 8. Trainers & 9. ELE at a Glance */}
        <TrainersAndAtAGlance
          onOpenSeminarModal={() => setModal({ type: 'form', mode: 'seminar' })}
        />

        {/* 10. News Feed & 11. Learning Environment CTA */}
        <NewsAndEnvironmentCta
          onSelectNews={(item) => setModal({ type: 'news', item })}
          onBookCampusVisit={() => setModal({ type: 'form', mode: 'campus' })}
        />

        {/* 12. Blog, 13. FAQ, 14. Member, 15. CTA Banner & 16. Footer */}
        <BlogFaqMemberFooter
          onSelectBlog={(item) => setModal({ type: 'blog', item })}
          onEnrollClick={() => setModal({ type: 'form', mode: 'enroll' })}
          onSeminarClick={() => setModal({ type: 'form', mode: 'seminar' })}
          onLoginClick={() => setModal({ type: 'login' })}
        />
      </main>

      <Modals
        modal={modal}
        onClose={() => setModal({ type: 'none' })}
        onSwitchToEnroll={(course) =>
          setModal({ type: 'form', mode: 'enroll', course })
        }
        onSelectCourseFromSearch={(course) =>
          setModal({ type: 'course', course })
        }
      />
    </div>
  );
}

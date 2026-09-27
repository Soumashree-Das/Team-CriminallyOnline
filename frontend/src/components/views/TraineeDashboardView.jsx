import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, Circle, ArrowRight, Bell, RefreshCw } from 'lucide-react';
import { traineeApi } from '../../api/traineeApi';

export default function TraineeDashboardView({ onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await traineeApi.getDashboard();
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to load trainee dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[#22223B]" />
        <p className="text-sm font-medium">Loading Trainee Learning Workspace...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center justify-between">
        <div>
          <p className="font-bold">Error loading dashboard</p>
          <p className="text-xs text-red-600 mt-1">{error || 'Unknown error'}</p>
        </div>
        <button onClick={loadDashboard} className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700">
          Retry
        </button>
      </div>
    );
  }

  const { trainee, summary, current_course, enrolled_courses, notifications } = data;

  return (
    <div className="space-y-6">
      
      {/* Welcome Hero Banner */}
      <div className="inst-card glass-panel p-6 bg-white border border-[#D7E3FC] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Good day, {trainee.full_name}</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Active Learner
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Target Goal: <span className="font-semibold text-[#22223B]">{trainee.career_goal}</span> &bull; Weekly Capacity: <span className="font-semibold">{summary.weekly_hours} hrs/week</span>
          </p>
          {!current_course && (
            <div className="mt-4 pt-3 border-t border-[#D7E3FC]">
              <h2 className="text-sm font-bold text-[#22223B]">Explore Available Courses</h2>
              <p className="text-xs text-gray-600 mt-0.5">Select a course track to take the diagnostic entry evaluation.</p>
            </div>
          )}
        </div>

        <button
          onClick={() => onNavigate('goals')}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ABC4FF] text-[#22223B] text-sm font-semibold rounded-lg hover:bg-[#B6CCFE] transition-colors"
        >
          <span>Browse Courses</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Continue Learning Focus */}
      {current_course ? (
        <div className="inst-card p-6 bg-gradient-to-r from-white to-[#E2EAFC] text-[#22223B] rounded-xl shadow-md border border-[#ABC4FF]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#22223B] bg-white/80 px-2.5 py-1 rounded">
                Current Active Course
              </span>
              <h2 className="text-2xl font-bold">{current_course.code}: {current_course.title}</h2>
              <p className="text-xs text-[#22223B]/70 leading-relaxed">
                Next Concept: <span className="font-semibold text-[#22223B]">{current_course.next_concept}</span>
              </p>
              
              {/* Progress Bar */}
              <div className="pt-2 space-y-1">
                <div className="flex justify-between text-xs text-[#22223B]/70 font-medium">
                  <span>Overall Concept Mastery</span>
                  <span className="font-bold text-[#22223B]">{current_course.progress}%</span>
                </div>
                <div className="w-full bg-white/80 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full transition-all duration-500" style={{ width: `${current_course.progress}%` }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('lesson')}
              className="w-full md:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 bg-white text-[#22223B]/70 hover:bg-blue-50 font-semibold text-sm rounded-lg shadow transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continue Learning</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* 2 Grid Column: Today's Learning & Enrolled Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Enrolled Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">My Enrolled Capacity Courses</h3>
            <button onClick={() => onNavigate('goals')} className="text-xs font-semibold text-[#22223B] hover:underline flex items-center space-x-1">
              <span>Explore All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {enrolled_courses && enrolled_courses.length > 0 ? (
              enrolled_courses.map((c) => (
                <div key={c.id} className="inst-card glass-panel p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-[#22223B]">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#22223B] bg-[#EDF2FB] px-2 py-0.5 rounded">{c.code}</span>
                      <h4 className="font-bold text-sm text-gray-900">{c.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1">{c.description}</p>
                    <div className="flex items-center space-x-3 text-[11px] text-gray-500 pt-1">
                      <span className="font-semibold text-blue-700">{c.progress}% Mastery</span>
                      <span>&bull; Status: <span className="capitalize font-semibold text-gray-700">{c.status.replace('_', ' ')}</span></span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {c.certificate_code && (
                      <button onClick={() => onNavigate('certificate')} className="px-3 py-1.5 text-xs font-semibold text-[#22223B] bg-[#EDF2FB] hover:bg-[#E2EAFC] rounded-md transition-colors">
                        Certificate
                      </button>
                    )}
                    <button onClick={() => onNavigate('roadmap')} className="px-3 py-1.5 text-xs font-semibold text-[#22223B] bg-[#ABC4FF] hover:bg-[#B6CCFE] rounded-md transition-colors">
                      View Roadmap
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-gray-500 inst-card rounded-lg">
                No active enrollments found. Click "Explore All Courses" to get started.
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Today's Learning Checklist & Noticeboard */}
        <div className="space-y-4">
          
          <div className="inst-card glass-panel p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-900">Today's Learning Schedule</h3>
              <span className="text-[11px] font-semibold text-emerald-700">Adaptive Goal</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start space-x-2.5 p-2 bg-emerald-50/60 rounded border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span className="text-gray-700">Complete active concept lesson video</span>
              </div>

              <div className="flex items-start space-x-2.5 p-2 bg-amber-50/60 rounded border border-amber-200 font-medium text-amber-900">
                <Circle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span>Practice formative knowledge quiz</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('lesson')}
              className="w-full text-center py-2 text-xs font-semibold text-[#22223B] bg-[#EDF2FB] hover:bg-[#E2EAFC] rounded transition-colors"
            >
              Start Next Lesson
            </button>
          </div>

          {/* Institutional Announcements / Notifications */}
          <div className="inst-card glass-panel p-4 rounded-lg space-y-3">
            <div className="flex items-center space-x-2 text-[#22223B]">
              <Bell className="w-4 h-4" />
              <h3 className="text-sm font-bold text-gray-900">System Notifications</h3>
            </div>

            <div className="space-y-2 text-xs text-gray-600 leading-relaxed">
              {notifications && notifications.length > 0 ? (
                notifications.map((n) => (
                  <div key={n.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                    <p className="font-semibold text-gray-800">{n.message}</p>
                    <p className="text-[11px] text-gray-400">{n.created_at}</p>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-gray-400">No unread notifications.</p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Users, Clock, Award, AlertTriangle, RefreshCw, ChevronRight, CheckCircle2 } from 'lucide-react';
import { apiClient } from '../../../lib/apiClient';
import EmptyState from '../../shared/EmptyState';

export default function OverviewPanel({ onNavigateSubTab, onSelectTraineeForOverride }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(2); // AIML-02 default
  const [overview, setOverview] = useState(null);
  const [atRiskTrainees, setAtRiskTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      fetchOverviewData(selectedCourseId);
    }
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      const data = await apiClient.get('/api/courses');
      setCourses(data);
      if (data.length > 0) {
        setSelectedCourseId(data[0].id);
      }
    } catch (e) {
      // handled in overview
    }
  };

  const fetchOverviewData = async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const [ovData, arData] = await Promise.all([
        apiClient.get(`/api/trainer/courses/${courseId}/overview`),
        apiClient.get(`/api/trainer/courses/${courseId}/at-risk`)
      ]);
      setOverview(ovData);
      setAtRiskTrainees(arData);
    } catch (err) {
      setError(err.message || 'Failed to load educator workspace overview.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500 bg-white border border-[#D7E3FC] rounded-xl shadow-sm">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[#22223B]" />
        <p className="text-xs font-semibold text-gray-700">Loading Educator Workspace Analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={AlertTriangle}
        title="Could not load overview"
        message={error}
        onRetry={() => fetchOverviewData(selectedCourseId)}
      />
    );
  }

  return (
    <div className="h-full w-full min-h-0 flex flex-col overflow-hidden space-y-3 bg-[#EDF2FB]">
      
      {/* Header Banner Hero */}
      <div className="shrink-0 bg-[#EDF2FB] border border-[#D7E3FC] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#ABC4FF] text-[#22223B] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 bg-[#D7E3FC] text-[#22223B] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#CCDBFD] mb-0.5">
                <span>Executive Command Center</span>
              </div>
              <h2 className="text-base font-extrabold text-zinc-900 leading-none">Cohort Performance & Intelligence Overview</h2>
            </div>
          </div>
          <p className="text-xs text-zinc-600 mt-1">
            Real-time status metrics and human-in-the-loop intervention summary across learning tracks.
          </p>
        </div>

        {/* Course Selector */}
        <div className="flex items-center space-x-2 shrink-0">
          <label className="text-xs font-bold text-zinc-700">Course Track:</label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
            className="p-1.5 bg-white border border-[#CCDBFD] rounded-lg text-xs font-semibold text-zinc-900 focus:outline-none focus:border-[#22223B]"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}: {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Card 1: Active Trainees */}
        <div 
          onClick={() => onNavigateSubTab('enrollments')}
          className="p-3.5 bg-[#EDF2FB] border border-[#D7E3FC] rounded-xl flex items-center space-x-3.5 shadow-sm cursor-pointer hover:border-[#22223B] transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-[#D7E3FC] text-[#22223B] flex items-center justify-center font-bold shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Enrolled Trainees</p>
            <p className="text-xl font-black text-zinc-900 leading-tight">{overview?.enrolled_count || 0}</p>
            <p className="text-[10px] text-zinc-500">Active cohort learners &rarr;</p>
          </div>
        </div>

        {/* Card 2: Pending Approvals */}
        <div 
          onClick={() => onNavigateSubTab('enrollments')}
          className="p-3.5 bg-[#EDF2FB] border border-[#D7E3FC] rounded-xl flex items-center space-x-3.5 shadow-sm cursor-pointer hover:border-[#22223B] transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-[#EDF2FB] text-[#22223B] flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Pending Approvals</p>
            <p className="text-xl font-black text-amber-900 leading-tight">{overview?.pending_approvals_count || 0}</p>
            <p className="text-[10px] text-amber-800 font-bold">Requires decision &rarr;</p>
          </div>
        </div>

        {/* Card 3: Avg Cohort Mastery */}
        <div 
          onClick={() => onNavigateSubTab('analytics')}
          className="p-3.5 bg-[#EDF2FB] border border-[#D7E3FC] rounded-xl flex items-center space-x-3.5 shadow-sm cursor-pointer hover:border-[#22223B] transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E2EAFC] text-[#22223B] flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Avg Concept Mastery</p>
            <p className="text-xl font-black text-[#22223B] leading-tight">{overview?.avg_mastery_percentage || 0}%</p>
            <p className="text-[10px] text-zinc-500">KG baseline metric &rarr;</p>
          </div>
        </div>

        {/* Card 4: At-Risk Learners */}
        <div 
          onClick={() => onNavigateSubTab('analytics')}
          className="p-3.5 bg-[#EDF2FB] border border-[#D7E3FC] rounded-xl flex items-center space-x-3.5 shadow-sm cursor-pointer hover:border-red-400 transition-all"
        >
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">At-Risk Learners</p>
            <p className="text-xl font-black text-red-900 leading-tight">{overview?.at_risk_count || 0}</p>
            <p className="text-[10px] text-red-700 font-medium">Concept gap detected &rarr;</p>
          </div>
        </div>

      </div>

      {/* At-Risk Learner Intervention Panel */}
      <div className="flex-1 min-h-0 flex flex-col p-4 bg-[#EDF2FB] border border-[#D7E3FC] rounded-2xl shadow-sm overflow-hidden">
        <div className="shrink-0 flex items-center justify-between border-b border-[#D7E3FC] pb-3 mb-3">
          <div className="flex items-center space-x-2 text-zinc-900">
            <AlertTriangle className="w-4 h-4 text-red-700" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider">At-Risk Learners Needing Roadmap Intervention</h3>
          </div>
          <button
            onClick={() => onNavigateSubTab('analytics')}
            className="text-xs font-bold text-[#22223B] hover:underline flex items-center space-x-1"
          >
            <span>View Competency Heatmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          {atRiskTrainees.length > 0 ? (
            <div className="divide-y divide-[#D7E3FC]">
              {atRiskTrainees.map((trainee) => (
                <div key={trainee.trainee_id} className="py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:bg-[#EDF2FB] px-2.5 rounded-xl transition-colors">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs font-bold text-zinc-900">{trainee.full_name}</p>
                      <span className="text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-md border border-red-200">
                        Avg Mastery: {trainee.avg_mastery}%
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 mt-0.5">
                      Weak Concepts: <span className="font-semibold text-zinc-800">{trainee.weak_concept_titles.join(', ') || 'Prerequisite gap'}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (onSelectTraineeForOverride) {
                        onSelectTraineeForOverride(trainee.trainee_id, selectedCourseId);
                      }
                      onNavigateSubTab('overrides');
                    }}
                    className="px-3 py-1.5 bg-[#ABC4FF] text-[#22223B] font-bold text-xs rounded-lg hover:bg-[#B6CCFE] transition-colors flex items-center space-x-1 shrink-0 shadow-sm"
                  >
                    <span>Override Roadmap</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500 italic py-2">
              No learners are currently flagged as at-risk in this course track. All learners are meeting mastery expectations!
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

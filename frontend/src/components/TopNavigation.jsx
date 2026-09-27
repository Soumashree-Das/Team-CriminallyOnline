import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Network, 
  Edit3, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  MessageSquare, 
  Star, 
  FolderGit2, 
  Award, 
  UserCheck, 
  Target, 
  Clock, 
  Map, 
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TopNavigation({ activeTab, setActiveTab }) {
  const { role } = useAuth();

  // Menu items for Trainee Portal (Diagnostic gate is completed post-enrollment, replaced with Assignments)
  const traineeMenuItems = [
    { id: 'dashboard', label: 'Trainee Dashboard', icon: LayoutDashboard },
    { id: 'goals', label: 'Goal & Courses', icon: Target },
    { id: 'assignments', label: 'Assignments & Submissions', icon: FileText },
    { id: 'availability', label: 'Availability Planner', icon: Clock },
    { id: 'roadmap', label: 'Personalized Roadmap', icon: Map },
    { id: 'kg', label: 'Knowledge Graph', icon: Network },
    { id: 'lesson', label: 'Learning Content', icon: BookOpen },
    { id: 'certificate', label: 'Digital Certificates', icon: Award },
  ];

  // Menu items for Trainer Portal
  const trainerMenuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'enrollments', label: 'Enrollment Moderation', icon: Users },
    { id: 'analytics', label: 'Competency Heatmap', icon: Network },
    { id: 'overrides', label: 'Roadmap Overrides', icon: Edit3 },
    { id: 'curriculum', label: 'Curriculum Studio', icon: BookOpen },
    { id: 'questionbank', label: 'Question Bank', icon: HelpCircle },
    { id: 'assignments', label: 'Assignments & Grading', icon: FileText },
    { id: 'discussions', label: 'Discussions Moderation', icon: MessageSquare },
    { id: 'ratings', label: 'Quality Analytics', icon: Star },
    { id: 'cohorts', label: 'Cohort Batches', icon: FolderGit2 },
    { id: 'certificates', label: 'Certificate Issuance', icon: Award },
    { id: 'profile', label: 'Educator Profile', icon: UserCheck },
  ];

  // Menu items for Admin Portal
  const adminMenuItems = [
    { id: 'admin', label: 'Admin PII & Audit Logs', icon: ShieldAlert },
    { id: 'overview', label: 'Trainer Overview', icon: LayoutDashboard },
    { id: 'enrollments', label: 'Enrollment Moderation', icon: Users },
    { id: 'analytics', label: 'Competency Heatmap', icon: Network },
    { id: 'curriculum', label: 'Curriculum Studio', icon: BookOpen },
    { id: 'dashboard', label: 'Trainee View', icon: GraduationCap },
  ];

  const currentMenuItems = role === 'trainer' 
    ? trainerMenuItems 
    : role === 'admin' 
    ? adminMenuItems 
    : traineeMenuItems;

  return (
    <div className="shrink-0 bg-white border-b border-[#D7E3FC] shadow-sm">
      <div className="flex items-center gap-3 px-4 sm:px-6 py-2">
        <div className="hidden lg:flex shrink-0 items-center gap-2 pr-3 border-r border-[#D7E3FC]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#22223B]/70">
            {role} portal
          </span>
        </div>
        <nav aria-label={`${role} navigation`} className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
          {currentMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
                className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#ABC4FF] text-[#22223B] font-bold shadow-sm'
                    : 'text-[#22223B]/70 hover:bg-[#EDF2FB] hover:text-[#22223B]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

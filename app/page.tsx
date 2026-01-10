'use client';
import React, { useState } from 'react';
import { Role, Profile, Job, Employer } from '@/types';
import { jobService } from '@/services/jobService';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import JobListPage from '@/pages/JobListPage';
import JobDetailPage from '@/pages/JobDetailPage';
import ApplyPage from '@/pages/ApplyPage';
import EmployerDashboard from '@/pages/EmployerDashboard';
import PostJobPage from '@/pages/PostJobPage';
import AdminDashboard from '@/pages/AdminDashboard';
import PrefSearchPage from '@/pages/PrefSearchPage';
import MyProfilePage from '@/pages/MyProfilePage';
import TalentPoolPage from '@/pages/TalentPoolPage';
import JobMatcherPage from '@/pages/JobMatcherPage';

type Page = 'home' | 'jobs' | 'job-detail' | 'apply' | 'login' | 'employer-dashboard' | 'post-job' | 'admin-dashboard' | 'my-apps' | 'pref-search' | 'my-profile' | 'talent-pool' | 'job-matcher';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<any>({});
  const [selectedPref, setSelectedPref] = useState<string>('');

  const handleNavigate = (page: string) => {
    if (page === 'logout') {
      setUserProfile(null);
      setCurrentPage('home');
      return;
    }
    setCurrentPage(page as Page);
  };

  const handleLogin = (role: Role) => {
    const profiles = jobService.getProfiles();
    const profile = profiles.find(p => p.role === role) || profiles[0];
    setUserProfile(profile);
    setCurrentPage(role === 'employer' ? 'employer-dashboard' : role === 'admin' ? 'admin-dashboard' : 'home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSearch={(filters) => { 
          if (filters.pref && !filters.category) {
            setSelectedPref(filters.pref);
            setCurrentPage('pref-search');
          } else {
            setSearchFilters(filters); 
            setCurrentPage('jobs'); 
          }
        }} />;
      case 'pref-search':
        return <PrefSearchPage 
          prefName={selectedPref} 
          onBack={() => setCurrentPage('home')}
          onSearch={(filters) => {
            setSearchFilters(filters);
            setCurrentPage('jobs');
          }}
        />;
      case 'job-matcher':
        return <JobMatcherPage 
          onBack={() => setCurrentPage('home')}
          onViewJob={(id) => { setSelectedJobId(id); setCurrentPage('job-detail'); }}
        />;
      case 'jobs':
        return <JobListPage initialFilters={searchFilters} onViewJob={(id) => { setSelectedJobId(id); setCurrentPage('job-detail'); }} />;
      case 'job-detail':
        const job = jobService.getJobById(selectedJobId!);
        return job ? (
          <JobDetailPage 
            job={job} 
            onApply={() => {
              if (!userProfile) setCurrentPage('login');
              else setCurrentPage('apply');
            }} 
            onBack={() => setCurrentPage('jobs')} 
            onViewJob={(id) => {
              setSelectedJobId(id);
              window.scrollTo(0, 0);
            }}
          />
        ) : null;
      case 'apply':
        const jobToApply = jobService.getJobById(selectedJobId!);
        return jobToApply ? (
          <ApplyPage 
            job={jobToApply} 
            onCancel={() => setCurrentPage('job-detail')} 
            onSubmit={(data) => {
              jobService.submitApplication({ ...data, jobId: jobToApply.id, jobTitle: jobToApply.title, seekerUserId: userProfile?.id });
              alert('応募が完了しました！店舗からの連絡をお待ちください。');
              setCurrentPage('home');
            }} 
          />
        ) : null;
      case 'my-profile':
        return userProfile ? <MyProfilePage userId={userProfile.id} onSave={() => setCurrentPage('home')} /> : null;
      case 'talent-pool':
        const currentEmpTP = jobService.getEmployers().find(e => e.ownerUserId === userProfile?.id);
        return currentEmpTP ? <TalentPoolPage employer={currentEmpTP} /> : null;
      case 'employer-dashboard':
        const employer = jobService.getEmployers().find(e => e.ownerUserId === userProfile?.id);
        return employer ? (
          <EmployerDashboard employer={employer} onPostJob={() => setCurrentPage('post-job')} />
        ) : (
          <div className="p-20 text-center">店舗情報の登録が必要です。</div>
        );
      case 'post-job':
        const currentEmp = jobService.getEmployers().find(e => e.ownerUserId === userProfile?.id);
        return currentEmp ? (
          <PostJobPage 
            employerId={currentEmp.id} 
            employerName={currentEmp.name}
            onCancel={() => setCurrentPage('employer-dashboard')}
            onSubmit={(data) => {
              jobService.createJob(data);
              alert('求人を申請しました。管理者の承認をお待ちください。');
              setCurrentPage('employer-dashboard');
            }}
          />
        ) : null;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'login':
        return (
          <div className="container mx-auto px-4 py-20 flex flex-col items-center">
            <h2 className="text-3xl font-black mb-10">デモ用ログイン選択</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <button onClick={() => handleLogin('jobseeker')} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl hover:border-indigo-600 transition flex flex-col items-center">
                <i className="fas fa-user text-4xl text-indigo-500 mb-4"></i>
                <span className="font-bold">求職者として</span>
              </button>
              <button onClick={() => handleLogin('employer')} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl hover:border-indigo-600 transition flex flex-col items-center">
                <i className="fas fa-store text-4xl text-purple-500 mb-4"></i>
                <span className="font-bold">店舗として</span>
              </button>
              <button onClick={() => handleLogin('admin')} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl hover:border-indigo-600 transition flex flex-col items-center">
                <i className="fas fa-user-shield text-4xl text-red-500 mb-4"></i>
                <span className="font-bold">管理者として</span>
              </button>
            </div>
          </div>
        );
      default:
        return <HomePage onSearch={() => {}} />;
    }
  };

  return (
    <Layout 
      userRole={userProfile?.role || 'guest'} 
      onNavigate={handleNavigate}
      currentPage={currentPage}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;

import { Application, Employer, Job, Profile, SeekerProfile } from "../types";
import {
  mockApplications,
  mockEmployers,
  mockJobs,
  mockProfiles,
} from "./mockData";

const STORAGE_KEYS = {
  JOBS: "nightjob_jobs",
  APPS: "nightjob_applications",
  EMPLOYERS: "nightjob_employers",
  PROFILES: "nightjob_profiles",
};

const getStorage = <T>(key: string, initial: T[]): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : initial;
};

const setStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const jobService = {
  getJobs: (): Job[] => getStorage(STORAGE_KEYS.JOBS, mockJobs),

  getJobById: (id: string): Job | undefined => {
    return jobService.getJobs().find((j) => j.id === id);
  },

  searchJobs: (filters: {
    category?: string;
    pref?: string;
    tags?: string[];
    salaryMin?: number;
  }): Job[] => {
    let jobs = jobService.getJobs().filter((j) => j.status === "published");
    if (filters.category)
      jobs = jobs.filter((j) => j.category === filters.category);
    if (filters.pref) jobs = jobs.filter((j) => j.areaPref === filters.pref);
    if (filters.salaryMin !== undefined) {
      const min = filters.salaryMin;
      jobs = jobs.filter((j) => j.salaryMin >= min);
    }
    if (filters.tags && filters.tags.length > 0) {
      const activeTags = filters.tags;
      jobs = jobs.filter((j) => activeTags.every((t) => j.tags.includes(t)));
    }
    return jobs;
  },

  getMatchedJobs: (answers: any): { matched: Job[]; hot: Job[] } => {
    const allJobs = jobService
      .getJobs()
      .filter((j) => j.status === "published");

    const scored = allJobs
      .map((job) => {
        let score = 0;
        if (job.areaPref === answers.area) score += 50;
        if (answers.income && job.salaryMin >= parseInt(answers.income))
          score += 30;
        if (job.isHot) score += 20;

        return { job, score };
      })
      .sort((a, b) => b.score - a.score);

    return {
      matched: scored.slice(0, 5).map((s) => s.job),
      hot: allJobs.filter((j) => j.isHot).slice(0, 3),
    };
  },

  createJob: (jobData: Partial<Job>): Job => {
    const jobs = jobService.getJobs();
    const newJob: Job = {
      id: `j${Date.now()}`,
      status: "pending",
      publishedAt: "",
      updatedAt: new Date().toISOString(),
      images: [],
      tags: [],
      ...jobData,
    } as Job;
    setStorage(STORAGE_KEYS.JOBS, [newJob, ...jobs]);
    return newJob;
  },

  updateJobStatus: (jobId: string, status: Job["status"]) => {
    const jobs = jobService.getJobs();
    const updated = jobs.map((j) =>
      j.id === jobId
        ? {
            ...j,
            status,
            publishedAt:
              status === "published" ? new Date().toISOString() : j.publishedAt,
          }
        : j
    );
    setStorage(STORAGE_KEYS.JOBS, updated);
  },

  getApplications: (): Application[] =>
    getStorage(STORAGE_KEYS.APPS, mockApplications),

  submitApplication: (appData: Partial<Application>) => {
    const apps = jobService.getApplications();
    const newApp: Application = {
      id: `a${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "submitted",
      ...appData,
    } as Application;
    setStorage(STORAGE_KEYS.APPS, [newApp, ...apps]);
    return newApp;
  },

  updateApplicationStatus: (appId: string, status: Application["status"]) => {
    const apps = jobService.getApplications();
    const updated = apps.map((a) => (a.id === appId ? { ...a, status } : a));
    setStorage(STORAGE_KEYS.APPS, updated);
  },

  getEmployers: (): Employer[] =>
    getStorage(STORAGE_KEYS.EMPLOYERS, mockEmployers),

  updateEmployerStatus: (employerId: string, status: Employer["status"]) => {
    const employers = jobService.getEmployers();
    const updated = employers.map((e) =>
      e.id === employerId ? { ...e, status } : e
    );
    setStorage(STORAGE_KEYS.EMPLOYERS, updated);
  },

  getProfiles: (): Profile[] => getStorage(STORAGE_KEYS.PROFILES, mockProfiles),

  getSeekerProfile: (userId: string): SeekerProfile | undefined => {
    const profiles = jobService.getProfiles();
    return profiles.find((p) => p.id === userId) as SeekerProfile;
  },

  saveSeekerProfile: (profile: SeekerProfile) => {
    const profiles = jobService.getProfiles();
    const updated = profiles.map((p) => (p.id === profile.id ? profile : p));
    if (!profiles.find((p) => p.id === profile.id)) {
      updated.push(profile);
    }
    setStorage(STORAGE_KEYS.PROFILES, updated);
  },

  getMatchingTalents: (employerId: string): SeekerProfile[] => {
    const employer = jobService.getEmployers().find((e) => e.id === employerId);
    if (!employer) return [];
    const allProfiles = jobService.getProfiles() as SeekerProfile[];
    return allProfiles
      .filter((p) => p.role === "jobseeker" && p.jobHuntingStatus === "active")
      .map((p) => p);
  },
};

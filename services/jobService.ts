import { createClient } from "@/lib/supabase/client";
import {
  Application,
  ApplicationInput,
  Article,
  Employer,
  Job,
  JobCreateInput,
  JobFilters,
  Profile,
  SeekerProfile,
} from "@/types";
import {
  mockApplications,
  mockArticles,
  mockEmployers,
  mockJobs,
} from "./mockData";

const supabase = createClient();

export const jobService = {
  // Profiles
  async getProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.error("Error fetching profiles:", error);
      return [];
    }
    return data as Profile[];
  },

  async deleteUser(userId: string): Promise<void> {
    const { error } = await supabase.from("profiles").delete().eq("id", userId);
    if (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  async getSeekerProfile(userId: string): Promise<SeekerProfile | null> {
    const { data, error } = await supabase
      .from("profiles")
      .select("*, seeker_profiles(*)")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching seeker profile:", error);
      return null;
    }

    const profile = data; // 'profiles' table data
    const seekerProfileData = data.seeker_profiles; // 'seeker_profiles' table data

    if (!seekerProfileData) {
      console.warn("No seeker profile data found for user:", userId);
      return null;
    }

    return {
      ...profile,
      ...seekerProfileData,
    } as SeekerProfile;
  },

  async saveSeekerProfile(profile: SeekerProfile): Promise<void> {
    console.log("Attempting to update profiles table:", profile.id);
    // Update profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (profileError) {
      console.error("profiles table update failed:", profileError);
      return;
    }

    // Update seeker_profiles table
    const { error: seekerProfileError } = await supabase
      .from("seeker_profiles")
      .update({
        personality_tags: profile.personality_tags,
        job_hunting_status: profile.job_hunting_status,
        desired_atmosphere: profile.desired_atmosphere,
        desired_person_type: profile.desired_person_type,
        lifestyle: profile.lifestyle,
        mbti: profile.mbti,
        bio: profile.bio,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", profile.id);
    if (seekerProfileError)
      console.error("Error saving seeker profile:", seekerProfileError);
  },

  // Jobs
  async getJobs(): Promise<Job[]> {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching jobs:", error);
      return mockJobs;
    }
    return data as Job[];
  },

  async getJobById(id: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching job by id:", error);
      return null;
    }
    return data as Job;
  },

  async searchJobs(filters: JobFilters): Promise<Job[]> {
    let query = supabase.from("jobs").select("*").eq("status", "published");

    if (filters.category) {
      if (Array.isArray(filters.category)) {
        query = query.in("category", filters.category);
      } else {
        query = query.eq("category", filters.category);
      }
    }

    if (filters.pref) {
      const { LocationService } = require("@/lib/location");
      const prefectures = LocationService.getAllPrefectures();

      const normalize = (pStr: string) => {
        const found = prefectures.find(
          (p: any) =>
            p.id === pStr.toLowerCase() ||
            p.name === pStr ||
            p.name.replace(/[県府都]$/, "") === pStr,
        );
        return found ? found.name : pStr;
      };

      if (Array.isArray(filters.pref)) {
        const normalizedPrefs = filters.pref.map(normalize);
        query = query.in("area_pref", normalizedPrefs);
      } else {
        query = query.eq("area_pref", normalize(filters.pref));
      }
    }

    if (filters.city) {
      if (Array.isArray(filters.city)) {
        query = query.in("area_city", filters.city);
      } else {
        query = query.ilike("area_city", `%${filters.city}%`);
      }
    }

    if (filters.employment_type) {
      if (Array.isArray(filters.employment_type)) {
        query = query.in("employment_type", filters.employment_type);
      } else {
        query = query.eq("employment_type", filters.employment_type);
      }
    }

    if (filters.salary_min !== undefined)
      query = query.gte("salary_min", filters.salary_min);

    if (filters.tags && filters.tags.length > 0) {
      query = query.contains("tags", filters.tags);
    }

    const { data, error } = await query.order("published_at", {
      ascending: false,
    });

    if (error) {
      console.error("Error searching jobs:", error);
      return [];
    }
    return data as Job[];
  },

  async createJob(jobData: JobCreateInput): Promise<Job | null> {
    const newJob = {
      ...jobData,
      id: crypto.randomUUID(),
      status: "pending",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("jobs")
      .insert([newJob])
      .select()
      .single();
    if (error) {
      console.error("Error creating job:", error);
      return null;
    }
    return data as Job;
  },

  async updateJob(
    jobId: string,
    jobData: Partial<JobCreateInput>,
  ): Promise<void> {
    const { error } = await supabase
      .from("jobs")
      .update({
        ...jobData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId);

    if (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  },

  async updateJobStatus(jobId: string, status: Job["status"]): Promise<void> {
    const { error } = await supabase
      .from("jobs")
      .update({
        status,
        published_at:
          status === "published" ? new Date().toISOString() : undefined,
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId);
    if (error) console.error("Error updating job status:", error);
  },

  // Employers
  async getEmployers(): Promise<Employer[]> {
    const { data, error } = await supabase.from("employers").select("*");
    if (error) {
      console.error("Error fetching employers:", error);
      return mockEmployers;
    }
    return data as Employer[];
  },

  async createEmployer(
    employerData: Omit<Employer, "id" | "status">,
  ): Promise<Employer | null> {
    const newEmployer = {
      ...employerData,
      id: crypto.randomUUID(),
      status: "pending",
    };

    console.log("DEBUG: Attempting to create employer with data:", newEmployer);

    const { data, error } = await supabase
      .from("employers")
      .insert([newEmployer])
      .select()
      .single();

    if (error) {
      console.error("Error creating employer:", error);
      return null;
    }
    return data as Employer;
  },

  async updateEmployerStatus(
    employerId: string,
    status: Employer["status"],
  ): Promise<void> {
    const { error } = await supabase
      .from("employers")
      .update({ status })
      .eq("id", employerId);
    if (error) console.error("Error updating employer status:", error);
  },

  // Applications
  async getApplications(): Promise<Application[]> {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
      return mockApplications;
    }
    return data as Application[];
  },

  async submitApplication(
    appData: ApplicationInput,
  ): Promise<Application | null> {
    const newApp = {
      ...appData,
      id: crypto.randomUUID(),
      status: "submitted",
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("applications")
      .insert([newApp])
      .select()
      .single();
    if (error) {
      console.error("Error submitting application:", error);
      return null;
    }
    return data as Application;
  },

  async updateApplicationStatus(
    appId: string,
    status: Application["status"],
  ): Promise<void> {
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", appId);
    if (error) console.error("Error updating application status:", error);
  },

  async getAppliedJobs(
    userId: string,
  ): Promise<{ application: Application; job: Job }[]> {
    const { data: apps, error } = await supabase
      .from("applications")
      .select("*")
      .eq("seeker_user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applied jobs:", error);
      return [];
    }

    const applicationList = apps as Application[];
    const jobs = await Promise.all(
      applicationList.map(async (app) => {
        const job = await this.getJobById(app.job_id);
        return job ? { application: app, job } : null;
      }),
    );

    return jobs.filter(
      (item): item is { application: Application; job: Job } => item !== null,
    );
  },

  // Mock implementation for Favorites (LocalStorage)
  async getFavoriteJobs(userId: string): Promise<Job[]> {
    if (typeof window === "undefined") return [];
    const favorites = JSON.parse(
      localStorage.getItem(`favorites_${userId}`) || "[]",
    );
    const jobs = await Promise.all(
      favorites.map((id: string) => this.getJobById(id)),
    );
    return jobs.filter((j): j is Job => j !== null);
  },

  async toggleFavoriteJob(userId: string, jobId: string): Promise<boolean> {
    if (typeof window === "undefined") return false;
    const key = `favorites_${userId}`;
    const favorites = JSON.parse(localStorage.getItem(key) || "[]");
    let newFavorites;
    let isFavorited = false;

    if (favorites.includes(jobId)) {
      newFavorites = favorites.filter((id: string) => id !== jobId);
    } else {
      newFavorites = [...favorites, jobId];
      isFavorited = true;
    }

    localStorage.setItem(key, JSON.stringify(newFavorites));
    return isFavorited;
  },

  async isJobFavorited(userId: string, jobId: string): Promise<boolean> {
    if (typeof window === "undefined") return false;
    const favorites = JSON.parse(
      localStorage.getItem(`favorites_${userId}`) || "[]",
    );
    return favorites.includes(jobId);
  },

  // Mock implementation for Scout Messages
  async getScoutMessages(
    userId: string,
  ): Promise<
    { id: string; employer: string; message: string; date: string }[]
  > {
    // Return mock data for now
    return [
      {
        id: "1",
        employer: "Club Ginza Royal",
        message:
          "あなたのプロフィールを拝見し、ぜひ一度面接にお越しいただきたくご連絡いたしました。当店の幹部候補として...",
        date: "2024-05-20",
      },
      {
        id: "2",
        employer: "Lounge 華",
        message: "未経験歓迎！体験入店から始めてみませんか？日払いも可能です。",
        date: "2024-05-18",
      },
    ];
  },

  // Mock implementation for Articles
  async getArticles(): Promise<Article[]> {
    return Promise.resolve(mockArticles);
  },

  async updateArticle(
    articleId: string,
    data: Partial<Article>,
  ): Promise<void> {
    console.log(`Updated article ${articleId}`, data);
    return Promise.resolve();
  },

  async toggleArticleStatus(
    articleId: string,
    status: Article["status"],
  ): Promise<void> {
    console.log(`Article ${articleId} status changed to ${status}`);
    return Promise.resolve();
  },

  async getMatchingTalents(): Promise<SeekerProfile[]> {
    const { data, error } = await supabase
      .from("seeker_profiles")
      .select("*, users(*)")
      .eq("job_hunting_status", "active");

    if (error) {
      console.error("Error fetching matching talents:", error);
      return [];
    }
    return (data as (SeekerProfile & { users: Profile })[]).map((d) => ({
      ...d.users,
      ...d,
      personality_tags: d.personality_tags || [],
      job_hunting_status: d.job_hunting_status || "active",
    })) as SeekerProfile[];
  },
};

import { supabase } from "@/lib/supabase";
import { Application, Employer, Job, Profile, SeekerProfile } from "@/types";
import {
  mockApplications,
  mockEmployers,
  mockJobs,
  mockProfiles,
} from "./mockData";

export const jobService = {
  // Profiles
  async getProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Error fetching profiles:", error);
      return mockProfiles;
    }
    return data as Profile[];
  },

  async getSeekerProfile(userId: string): Promise<SeekerProfile | null> {
    const { data, error } = await supabase
      .from("seeker_profiles")
      .select("*, users(*)")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching seeker profile:", error);
      return null;
    }

    const profile = data.users;
    return {
      ...profile,
      ...data,
      personalityTags: data.personality_tags || [],
      jobHuntingStatus: data.job_hunting_status || "passive",
      desiredAtmosphere: data.desired_atmosphere || "",
      desiredPersonType: data.desired_person_type || "",
      lifestyle: data.lifestyle || "",
    } as SeekerProfile;
  },

  async saveSeekerProfile(profile: SeekerProfile): Promise<void> {
    const { error } = await supabase
      .from("seeker_profiles")
      .update({
        personality_tags: profile.personalityTags,
        job_hunting_status: profile.jobHuntingStatus,
        desired_atmosphere: profile.desiredAtmosphere,
        desired_person_type: profile.desiredPersonType,
        lifestyle: profile.lifestyle,
        mbti: profile.mbti,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", profile.id);
    if (error) console.error("Error saving seeker profile:", error);
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

  async searchJobs(filters: any): Promise<Job[]> {
    let query = supabase.from("jobs").select("*").eq("status", "published");

    if (filters.category) query = query.eq("category", filters.category);
    if (filters.pref) query = query.eq("area_pref", filters.pref);
    if (filters.city) query = query.ilike("area_city", `%${filters.city}%`);
    if (filters.employmentType)
      query = query.eq("employment_type", filters.employmentType);
    if (filters.salaryMin !== undefined)
      query = query.gte("salary_min", filters.salaryMin);

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

  async createJob(jobData: any): Promise<Job | null> {
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

  async updateEmployerStatus(
    employerId: string,
    status: Employer["status"]
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

  async submitApplication(appData: any): Promise<Application | null> {
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
    status: Application["status"]
  ): Promise<void> {
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", appId);
    if (error) console.error("Error updating application status:", error);
  },

  async getMatchingTalents(employerId: string): Promise<SeekerProfile[]> {
    const { data, error } = await supabase
      .from("seeker_profiles")
      .select("*, users(*)")
      .eq("job_hunting_status", "active");

    if (error) {
      console.error("Error fetching matching talents:", error);
      return [];
    }
    return data.map((d: any) => ({
      ...d.users,
      ...d,
      personalityTags: d.personality_tags || [],
      jobHuntingStatus: d.job_hunting_status || "active",
    })) as SeekerProfile[];
  },
};

export type Role = "guest" | "jobseeker" | "employer" | "admin";
export type Region =
  | "hokkaido"
  | "tohoku"
  | "kanto"
  | "chubu"
  | "kansai"
  | "chugoku"
  | "shikoku"
  | "kyushu";

export interface RoleSalary {
  roleName: string;
  amount: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  age: number;
  storeName: string;
  area: string;
  monthlyIncome: string;
  formerIncome: string;
  formerJob: string;
  catchphrase: string;
  image: string;
}

export type JobStatus =
  | "draft"
  | "pending"
  | "approved"
  | "published"
  | "suspended";

export type SalaryType = "hourly" | "daily" | "monthly";

export type ApplicationStatus =
  | "submitted"
  | "contacted"
  | "interview"
  | "offer"
  | "rejected";

export type JobHuntingStatus = "active" | "passive" | "closed";

export interface Profile {
  id: string;
  role: Role;
  display_name: string;
  email: string;
  created_at: string;
}

export interface SeekerProfile extends Profile {
  mbti?: string;
  personality_tags: string[];
  lifestyle: string;
  desired_atmosphere: string;
  desired_person_type: string;
  job_hunting_status: JobHuntingStatus;
  bio?: string;
}

export interface Employer {
  id: string;
  owner_user_id: string;
  name: string;
  business_type: string;
  area_pref: string;
  area_city: string;
  contact_email: string;
  contact_phone: string;
  status: "pending" | "approved" | "rejected";
  vibe_tags?: string[];
  preferred_mbti?: string[];
}

export interface Job {
  id: string;
  employer_id: string;
  employer_name: string;
  title: string;
  description: string;
  category: string;
  employment_type: string;
  area_pref: string;
  area_city: string;
  salary_type: SalaryType;
  salary_min: number;
  salary_max: number;
  tags: string[];
  status: JobStatus;
  published_at: string;
  updated_at: string;
  images: string[];
  is_hot?: boolean; // 急募フラグ
  // 詳細フィールド
  qualifications?: string;
  access_info?: string;
  salary_details?: string;
  benefits?: string;
  insurance?: string;
  working_hours?: string;
  holidays?: string;
  workplace_info?: string;
  // マッチング用
  required_mbti?: string[];
  shop_vibe?: string[];
  // 新しいUI用
  role_salaries?: RoleSalary[];
  is_new?: boolean;
}

export interface Application {
  id: string;
  job_id: string;
  job_title: string;
  seeker_user_id: string;
  seeker_name: string;
  contact_type: "phone" | "line" | "email";
  contact_value: string;
  message: string;
  status: ApplicationStatus;
  created_at: string;
  is_offer?: boolean; // スカウト（逆指名）かどうか
}

export interface JobFilters {
  category?: string;
  pref?: string;
  city?: string;
  region?: string;
  employment_type?: string;
  employmentType?: string;
  salary_min?: number;
  tags?: string[];
  keyword?: string;
  role?: string;
  salary?: string;
  style?: string;
}

export interface YakanColumn {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export interface SubBanner {
  title: string;
  image: string;
  link: string;
}

export interface MasterGuide {
  id: string;
  title: string;
  target: string;
  copy: string;
  microCopy: string;
  icon: React.ReactNode;
  gradient: string;
  accent: string;
}

export type JobCreateInput = Omit<
  Job,
  "id" | "status" | "created_at" | "updated_at" | "published_at"
>;

export type ApplicationInput = Omit<
  Application,
  "id" | "status" | "created_at"
>;

export type ArticleStatus = "published" | "draft" | "scheduled";

export interface Article {
  id: string;
  title: string;
  type: "special" | "column";
  thumbnail_url: string;
  category: string;
  status: ArticleStatus;
  published_at: string;
  author: string;
  content: string; // HTML or Markdown
  is_featured?: boolean;
}

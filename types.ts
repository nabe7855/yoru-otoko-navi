
export type Role = 'guest' | 'jobseeker' | 'employer' | 'admin';

export type JobStatus = 'draft' | 'pending' | 'approved' | 'published' | 'suspended';

export type SalaryType = 'hourly' | 'daily' | 'monthly';

export type ApplicationStatus = 'submitted' | 'contacted' | 'interview' | 'offer' | 'rejected';

export type JobHuntingStatus = 'active' | 'passive' | 'closed';

export interface Profile {
  id: string;
  role: Role;
  displayName: string;
  createdAt: string;
}

export interface SeekerProfile extends Profile {
  mbti?: string;
  personalityTags: string[];
  lifestyle: string;
  desiredAtmosphere: string;
  desiredPersonType: string;
  jobHuntingStatus: JobHuntingStatus;
  bio?: string;
}

export interface Employer {
  id: string;
  ownerUserId: string;
  name: string;
  businessType: string;
  areaPref: string;
  areaCity: string;
  contactEmail: string;
  contactPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  vibeTags?: string[];
  preferredMBTI?: string[];
}

export interface Job {
  id: string;
  employerId: string;
  employerName: string;
  title: string;
  description: string;
  category: string;
  employmentType: string;
  areaPref: string;
  areaCity: string;
  salaryType: SalaryType;
  salaryMin: number;
  salaryMax: number;
  tags: string[];
  status: JobStatus;
  publishedAt: string;
  updatedAt: string;
  images: string[];
  isHot?: boolean; // 急募フラグ
  // 詳細フィールド
  qualifications?: string;
  accessInfo?: string;
  salaryDetails?: string;
  benefits?: string;
  insurance?: string;
  workingHours?: string;
  holidays?: string;
  workplaceInfo?: string;
  // マッチング用
  requiredMBTI?: string[];
  shopVibe?: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  seekerUserId: string;
  seekerName: string;
  contactType: 'phone' | 'line' | 'email';
  contactValue: string;
  message: string;
  status: ApplicationStatus;
  createdAt: string;
  isOffer?: boolean; // スカウト（逆指名）かどうか
}

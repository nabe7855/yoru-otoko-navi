import { Application, Employer, Job, Profile } from "../types";

export const mockProfiles: Profile[] = [
  {
    id: "u1",
    role: "admin",
    display_name: "管理者A",
    created_at: "2023-01-01",
  },
  {
    id: "u2",
    role: "employer",
    display_name: "採用担当者",
    created_at: "2023-02-15",
  },
  {
    id: "u3",
    role: "jobseeker",
    display_name: "田中美咲",
    created_at: "2023-03-10",
  },
];

export const mockEmployers: Employer[] = [
  {
    id: "e1",
    ownerUserId: "u2",
    name: "パーソルファクトリーパートナーズ株式会社",
    businessType: "人材派遣",
    areaPref: "北海道",
    areaCity: "勇払郡",
    contactEmail: "contact@persol-factory.jp",
    contactPhone: "0120-123-456",
    status: "approved",
  },
];

export const mockJobs: Job[] = [
  {
    id: "j1",
    employerId: "e1",
    employerName: "パーソルファクトリーパートナーズ",
    title:
      "【北海道安平町】時給1200円！日払い・週払いOKの製造スタッフ（日勤のみ）",
    description:
      "大手工場内での製造・検査業務です。未経験からスタートしたスタッフが多数活躍中！福利厚生も充実しており、安心して長く働ける環境です。",
    category: "派遣",
    employmentType: "派遣社員",
    areaPref: "北海道",
    areaCity: "勇払郡安平町",
    salaryType: "hourly",
    salaryMin: 1200,
    salaryMax: 1500,
    tags: ["未経験歓迎", "日払い", "週払い", "社会保険あり", "交通費支給"],
    status: "published",
    publishedAt: "2024-05-20",
    updatedAt: "2024-05-20",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    ],
    qualifications: "・未経験可\n・学歴不問、主婦・主夫歓迎",
    accessInfo: "北海道勇払郡安平町\nJR千歳線 植苗駅より車9分\n★マイカー通勤OK",
    salaryDetails:
      "時給1200円 ※交通費全額支給（規定あり）\n【月収例】20.8万円（22日勤務＋残業10h）",
    benefits:
      "・各種社会保険完備\n・交通費全額支給\n・有給休暇、正社員登用あり\n・社員食堂／休憩室利用可",
    insurance: "社会保険あり（厚生年金・健康・雇用・労災）",
    workingHours: "1）8:30～17:00（実働7.5h）\n2）8:30～15:00（実働5.5h）",
    holidays: "土日祝（工場カレンダーによる）\n★年末年始・夏季休暇あり",
    workplaceInfo:
      "当社では2020～2022年度の3年間で全国277名が社員登用されています！日払い制度もあり、急な出費も安心です。",
  },
];

export const mockApplications: Application[] = [];

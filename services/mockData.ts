import { Application, Article, Employer, Job, Profile } from "../types";

export const mockProfiles: Profile[] = [
  {
    id: "u1",
    role: "admin",
    display_name: "管理者A",
    email: "admin@example.com",
    created_at: "2023-01-01",
  },
  {
    id: "u2",
    role: "employer",
    display_name: "採用担当者",
    email: "employer@example.com",
    created_at: "2023-02-15",
  },
  {
    id: "u3",
    role: "jobseeker",
    display_name: "田中美咲",
    email: "seeker@example.com",
    created_at: "2023-03-10",
  },
];

export const mockEmployers: Employer[] = [
  {
    id: "e1",
    owner_user_id: "u2",
    name: "パーソルファクトリーパートナーズ株式会社",
    business_type: "人材派遣",
    area_pref: "北海道",
    area_city: "勇払郡",
    contact_email: "contact@persol-factory.jp",
    contact_phone: "0120-123-456",
    status: "approved",
  },
];

export const mockJobs: Job[] = [
  {
    id: "j1",
    employer_id: "e1",
    employer_name: "パーソルファクトリーパートナーズ",
    title:
      "【北海道安平町】時給1200円！日払い・週払いOKの製造スタッフ（日勤のみ）",
    description:
      "大手工場内での製造・検査業務です。未経験からスタートしたスタッフが多数活躍中！福利厚生も充実しており、安心して長く働ける環境です。",
    category: "派遣",
    employment_type: "派遣社員",
    area_pref: "北海道",
    area_city: "勇払郡安平町",
    salary_type: "hourly",
    salary_min: 1200,
    salary_max: 1500,
    tags: ["未経験歓迎", "日払い", "週払い", "社会保険あり", "交通費支給"],
    status: "published",
    published_at: "2024-05-20",
    updated_at: "2024-05-20",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    ],
    qualifications: "・未経験可\n・学歴不問、主婦・主夫歓迎",
    access_info:
      "北海道勇払郡安平町\nJR千歳線 植苗駅より車9分\n★マイカー通勤OK",
    salary_details:
      "時給1200円 ※交通費全額支給（規定あり）\n【月収例】20.8万円（22日勤務＋残業10h）",
    benefits:
      "・各種社会保険完備\n・交通費全額支給\n・有給休暇、正社員登用あり\n・社員食堂／休憩室利用可",
    insurance: "社会保険あり（厚生年金・健康・雇用・労災）",
    working_hours: "1）8:30～17:00（実働7.5h）\n2）8:30～15:00（実働5.5h）",
    holidays: "土日祝（工場カレンダーによる）\n★年末年始・夏季休暇あり",
    workplace_info:
      "当社では2020～2022年度の3年間で全国277名が社員登用されています！日払い制度もあり、急な出費も安心です。",
  },
];

export const mockApplications: Application[] = [];

export const mockArticles: Article[] = [
  {
    id: "a1",
    title: "【未経験必見】ボーイの仕事内容を徹底解説！1日の流れから給与まで",
    type: "column",
    thumbnail_url:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    category: "お仕事ガイド",
    status: "published",
    published_at: "2024-05-15",
    author: "編集部",
    content: "ボーイの仕事は...",
    is_featured: false,
  },
  {
    id: "a2",
    title: "稼げる店舗の特徴とは？優良店を見極める3つのポイント",
    type: "column",
    thumbnail_url:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
    category: "稼ぐテクニック",
    status: "published",
    published_at: "2024-05-18",
    author: "編集部",
    content: "稼げる店舗には共通点があります...",
    is_featured: true,
  },
  {
    id: "a3",
    title: "2024年夏！注目のエリア特集 〜新宿・歌舞伎町編〜",
    type: "special",
    thumbnail_url:
      "https://images.unsplash.com/photo-1534234828563-025178d8a7d1?auto=format&fit=crop&q=80&w=800",
    category: "エリア特集",
    status: "scheduled",
    published_at: "2024-06-01",
    author: "編集部",
    content: "今年の夏は歌舞伎町が熱い...",
    is_featured: true,
  },
  {
    id: "a4",
    title: "黒服に向いている人・向いていない人の特徴診断",
    type: "column",
    thumbnail_url:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    category: "自己分析",
    status: "draft",
    published_at: "",
    author: "編集部",
    content: "下書き中の記事です...",
    is_featured: false,
  },
];

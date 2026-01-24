import prefData from "@/data/json/prefectures.json";
import regionData from "@/data/json/regions.json";

export interface Prefecture {
  code: string;
  name: string;
  en: string;
  id: string; // slug
}

export interface Region {
  id: string;
  name: string;
  prefs: string[]; // pref codes
  prefectures: Prefecture[];
}

export interface City {
  id: string; // prefCode-slug
  name: string;
  en: string;
  slug: string;
  prefCode: string;
}

export const LocationService = {
  getRegions: (): Region[] => {
    return regionData as Region[];
  },

  getAllPrefectures: (): Prefecture[] => {
    return prefData as Prefecture[];
  },

  getPrefectureByCode: (code: string): Prefecture | undefined => {
    return (prefData as Prefecture[]).find((p) => p.code === code);
  },

  getPrefectureBySlug: (slug: string): Prefecture | undefined => {
    return (prefData as Prefecture[]).find((p) => p.id === slug);
  },

  // Lazy load cities
  getCitiesByPrefCode: async (prefCode: string): Promise<City[]> => {
    try {
      // In Next.js, importing JSON dynamically works well with Webpack
      const cities = await import(`@/data/json/cities/${prefCode}.json`);
      return cities.default || cities;
    } catch (error) {
      console.error(`Failed to load cities for prefCode: ${prefCode}`, error);
      return [];
    }
  },
};

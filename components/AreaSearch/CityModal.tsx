import { City, LocationService, Prefecture } from "@/lib/location";
import { ChevronRight, MapPin, Search, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefecture: Prefecture | null;
  onCitySelect: (city: City) => void;
}

const CityModal: React.FC<CityModalProps> = ({
  isOpen,
  onClose,
  prefecture,
  onCitySelect,
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen && prefecture) {
      setLoading(true);
      LocationService.getCitiesByPrefCode(prefecture.code).then((data) => {
        setCities(data);
        setLoading(false);
      });
    } else {
      setCities([]);
      setSearchTerm("");
    }
  }, [isOpen, prefecture]);

  if (!isOpen || !prefecture) return null;

  const filteredCities = cities.filter(
    (c) =>
      c.name.includes(searchTerm) ||
      c.en.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Simple "Popular" heuristic (major wards/cities)
  // In reality, this should come from a config.
  const popularCities = cities.filter(
    (c) =>
      c.name.endsWith("区") ||
      c.name.includes("札幌") ||
      c.name.includes("仙台") ||
      c.name.includes("広島") ||
      c.name.includes("福岡"),
  );
  const isMajorPref = [
    "Tokyo",
    "Osaka",
    "Aichi",
    "Hokkaido",
    "Fukuoka",
  ].includes(prefecture.en);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom-5 duration-300">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition"
        >
          <ChevronRight className="rotate-180" size={24} />
        </button>

        <h2 className="font-black text-lg text-slate-800 flex items-center gap-2">
          <MapPin size={18} className="text-indigo-600" />
          {prefecture.name}
        </h2>

        <button
          onClick={onClose}
          className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-100">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            autoFocus
            type="text"
            placeholder={`${prefecture.name}の市区町村を検索...`}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition font-bold text-slate-700 bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white p-4 pb-20 scrollbar-hide">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Popular Areas (Shortcuts) */}
            {isMajorPref && !searchTerm && popularCities.length > 0 && (
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  Popular Areas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {popularCities.slice(0, 6).map((city) => (
                    <button
                      key={city.id}
                      onClick={() => onCitySelect(city)}
                      className="px-4 py-3 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl font-bold text-indigo-700 text-sm hover:shadow-md transition text-left"
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All Cities */}
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                All Cities
              </h3>
              <div className="divide-y divide-slate-50 border-t border-b border-slate-50">
                {filteredCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => onCitySelect(city)}
                    className="w-full py-4 px-2 flex justify-between items-center hover:bg-slate-50 active:bg-slate-100 transition group"
                  >
                    <span className="font-bold text-slate-700 text-lg group-hover:text-indigo-600 transition">
                      {city.name}
                    </span>
                    <ChevronRight
                      size={18}
                      className="text-slate-300 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition"
                    />
                  </button>
                ))}
                {filteredCities.length === 0 && (
                  <div className="py-10 text-center text-slate-400 font-bold">
                    該当するエリアが見つかりません
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityModal;

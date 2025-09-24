import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  ArrowRight as ArrowRightIcon,
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
  Search as SearchIcon,
  X as XIcon,
} from "lucide-react";

/* ============== mini UI ============== */
const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "ghost" | "solid" | "outline" }
> = ({ className, variant = "solid", ...props }) => (
  <button
    {...props}
    className={cn(
      "inline-flex items-center justify-center rounded-lg transition-colors font-medium",
      variant === "solid"
        ? "bg-[#1B7BA7] text-white hover:bg-[#1B7BA7]/90"
        : variant === "outline"
        ? "border border-[#1B7BA7] text-[#1B7BA7] hover:bg-[#1B7BA7]/5"
        : "bg-transparent hover:bg-black/5",
      className
    )}
  />
);

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...p }, ref) => (
    <input
      ref={ref}
      {...p}
      className={cn(
        "w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#1B7BA7]/30 focus:border-[#1B7BA7]",
        className
      )}
    />
  )
);
Input.displayName = "Input";

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...p }) => (
  <div {...p} className={cn("bg-white border border-gray-200 rounded-lg", className)} />
);
const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...p }) => (
  <div {...p} className={cn("p-4", className)} />
);
const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...p }) => (
  <div {...p} className={cn("overflow-y-auto", className)} />
);

/* ============== typy ============== */
type Org = {
  id: number;
  name: string;
  logo: string;
  category: "Startup" | "Firma";
  /** dla Startupów używamy tu „branży/ścieżki”, np. MedTech;
   *  dla Firm zostaje opis etapów np. „Seed, Early stage”. */
  stage: string;
  /** np. „Inkubator” albo „8 typów wsparcia” */
  supportTypes: string;
  location: string;
  coords: LatLngExpression;
  description?: string; // np. „Partner Korporacyjny”
};

type Filters = {
  category: string;
  stage: string;
  supportType: string;
  location: string;
};

/* ============== dane ============== */
/** LOGO ścieżki są przykładowe – podepnij swoje */
const ALL_ORGS: Org[] = [
  /* ---------- STARTUPY (z 1. screenu) ---------- */
  { id: 1, name: "Logoplan", logo: "/rectangle-4174-4.png", category: "Startup", stage: "SaaS", supportTypes: "Inkubator", location: "Warszawa", coords: [52.2297, 21.0122] },
  { id: 2, name: "NIRBY", logo: "/rectangle-4176-3.png", category: "Startup", stage: "Hardware", supportTypes: "Akceleracja", location: "Szczecin", coords: [53.4285, 14.5528] },
  { id: 3, name: "Calmsie", logo: "/rectangle-4176-1.png", category: "Startup", stage: "AI/MedTech", supportTypes: "Akceleracja", location: "Kraków", coords: [50.0647, 19.945] },
  { id: 4, name: "Binderless", logo: "/rectangle-4176-2.png", category: "Startup", stage: "Hardware", supportTypes: "Inkubator", location: "Katowice", coords: [50.2649, 19.0238] },
  { id: 5, name: "Play.air", logo: "/rectangle-4174-14.png", category: "Startup", stage: "SaaS", supportTypes: "Inkubator", location: "Gdańsk", coords: [54.352, 18.6466] },
  { id: 6, name: "OpenGrant", logo: "/rectangle-4174-19.png", category: "Startup", stage: "AI", supportTypes: "Finansowanie", location: "Lublin", coords: [51.2465, 22.5684] },
  { id: 7, name: "Gridaly", logo: "/rectangle-4174-19.png", category: "Startup", stage: "SaaS", supportTypes: "Akceleracja", location: "Poznań", coords: [52.4064, 16.9252] },
  { id: 8, name: "Redstone Oracles", logo: "/rectangle-4174-19.png", category: "Startup", stage: "AI/Web3", supportTypes: "Finansowanie", location: "Wrocław", coords: [51.1079, 17.0385] },

  /* ---------- FIRMY (2. screen – Partnerzy korporacyjni) ---------- */
  { id: 101, name: "Orange Polska", logo: "/rectangle-4174-4.png", category: "Firma", stage: "Pre seed, Seed +2", supportTypes: "8 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 102, name: "Ciech Ventures", logo: "/rectangle-4176-1.png", category: "Firma", stage: "Seed, +2", supportTypes: "5 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 103, name: "HR Marketplace (eRecruiter)", logo: "/rectangle-4176-2.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "5 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 104, name: "Future Mind", logo: "/rectangle-4176-3.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "3 typy wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 105, name: "BNP Paribas Polska", logo: "/rectangle-4176-4.png", category: "Firma", stage: "Seed, +2", supportTypes: "8 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 106, name: "PZU", logo: "/rectangle-4174-4.png", category: "Firma", stage: "Seed, +3", supportTypes: "7 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 107, name: "Transcom", logo: "/rectangle-4176-1.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "5 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 108, name: "Maspex", logo: "/rectangle-4176-2.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "6 typów wsparcia", location: "Kraków", coords: [50.0647, 19.945], description: "Partner Korporacyjny" },
  { id: 109, name: "Veolia", logo: "/rectangle-4176-3.png", category: "Firma", stage: "Seed, +2", supportTypes: "7 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 110, name: "Tauron Polska Energia", logo: "/rectangle-4176-4.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "6 typów wsparcia", location: "Katowice", coords: [50.2649, 19.0238], description: "Partner Korporacyjny" },
  { id: 111, name: "ORLEN Skylight Accelerator", logo: "/rectangle-4174-4.png", category: "Firma", stage: "Idea stage, +1", supportTypes: "8 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 112, name: "Ringier Axel Springer", logo: "/rectangle-4176-1.png", category: "Firma", stage: "Seed, +2", supportTypes: "7 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 113, name: "Grupa Azoty", logo: "/rectangle-4176-2.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "6 typów wsparcia", location: "Tarnów", coords: [50.0135, 20.9859], description: "Partner Korporacyjny" },
  { id: 114, name: "PGE Ventures", logo: "/rectangle-4176-3.png", category: "Firma", stage: "Seed, +2", supportTypes: "6 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 115, name: "Instytut Matki i Dziecka", logo: "/rectangle-4176-4.png", category: "Firma", stage: "Early stage", supportTypes: "7 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 116, name: "InPost", logo: "/rectangle-4174-4.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "5 typów wsparcia", location: "Kraków", coords: [50.0647, 19.945], description: "Partner Korporacyjny" },
  { id: 117, name: "ORLEN VS", logo: "/rectangle-4176-1.png", category: "Firma", stage: "Seed, +3", supportTypes: "6 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 118, name: "Saint-Gobain", logo: "/rectangle-4176-2.png", category: "Firma", stage: "Seed, +3", supportTypes: "8 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 119, name: "Totalizator Sportowy", logo: "/rectangle-4176-3.png", category: "Firma", stage: "Pre-seed, Seed", supportTypes: "7 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 120, name: "Bank Pekao S.A.", logo: "/rectangle-4176-4.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "8 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 121, name: "Neuca", logo: "/rectangle-4174-4.png", category: "Firma", stage: "Seed, Early stage", supportTypes: "6 typów wsparcia", location: "Poznań", coords: [52.4064, 16.9252], description: "Partner Korporacyjny" },
  { id: 122, name: "Rossmann", logo: "/rectangle-4176-1.png", category: "Firma", stage: "Early stage", supportTypes: "5 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 123, name: "Żabka", logo: "/rectangle-4176-2.png", category: "Firma", stage: "Pre-seed, +2", supportTypes: "7 typów wsparcia", location: "Poznań", coords: [52.4064, 16.9252], description: "Partner Korporacyjny" },
  { id: 124, name: "Citi Handlowy", logo: "/rectangle-4176-3.png", category: "Firma", stage: "Seed, +3", supportTypes: "8 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 125, name: "Novartis", logo: "/rectangle-4176-4.png", category: "Firma", stage: "Seed, +3", supportTypes: "9 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
  { id: 126, name: "Astra Zeneca", logo: "/rectangle-4174-4.png", category: "Firma", stage: "Seed, +3", supportTypes: "9 typów wsparcia", location: "Warszawa", coords: [52.2297, 21.0122], description: "Partner Korporacyjny" },
];

/* ============== marker z logiem ============== */
const logoIcon = (logoUrl: string, highlight = false) =>
  L.divIcon({
    html: `
      <div style="
        width:${highlight ? 54 : 42}px;height:${highlight ? 54 : 42}px;
        border-radius:50%;background:#fff;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 6px 20px rgba(15,85,117,.25);
        border:${highlight ? "3px solid #1B7BA7" : "2px solid #e5e7eb"};
      ">
        <img src="${logoUrl}" style="width:70%;height:70%;object-fit:contain;border-radius:50%;" />
      </div>`,
    iconSize: [highlight ? 54 : 42, highlight ? 54 : 42],
    iconAnchor: [highlight ? 27 : 21, highlight ? 27 : 21],
    className: "",
  });

/* ============== helpers mapy ============== */
const FlyToSelected: React.FC<{ coords?: LatLngExpression | null }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, Math.max(map.getZoom(), 7), { duration: 0.5 });
  }, [coords, map]);
  return null;
};

const FitBoundsSimple: React.FC<{ bounds: L.LatLngBounds; mapRef: React.MutableRefObject<LeafletMap | null>; }> = ({ bounds, mapRef }) => {
  useEffect(() => {
    const map = mapRef.current;
    if (map && bounds) map.fitBounds(bounds, { padding: [32, 32] } as any);
  }, [bounds, mapRef]);
  return null;
};

/* ============== Dropdown (pojedynczy wybór) ============== */
const Dropdown: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}> = ({ label, value, options, onChange, placeholder = "Wszystkie" }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-[#1B7BA7] focus:outline-none focus:ring-2 focus:ring-[#1B7BA7]/30"
      >
        <span className="truncate">{value || label}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={() => { onChange(""); setIsOpen(false); }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg"
          >
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => { onChange(option); setIsOpen(false); }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 last:rounded-b-lg"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ============== GŁÓWNY KOMPONENT ============== */
const BannerSection: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showMobileList, setShowMobileList] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    stage: "",
    supportType: "",
    location: "",
  });

  const selectedOrg = useMemo(
    () => (selectedId ? ALL_ORGS.find((o) => o.id === selectedId) || null : null),
    [selectedId]
  );

  /* filtracja */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_ORGS.filter((o) => {
      const byQ = !q || o.name.toLowerCase().includes(q);
      const byCategory = !filters.category || o.category === filters.category;
      const byStage = !filters.stage || o.stage.toLowerCase().includes(filters.stage.toLowerCase());
      const bySupport = !filters.supportType || o.supportTypes.toLowerCase().includes(filters.supportType.toLowerCase());
      const byLocation = !filters.location || o.location === filters.location;
      return byQ && byCategory && byStage && bySupport && byLocation;
    });
  }, [query, filters]);

  const bounds = useMemo(() => {
    if (!filtered.length) return undefined;
    return L.latLngBounds(filtered.map((o) => o.coords as [number, number]));
  }, [filtered]);

  const mapRef = useRef<LeafletMap | null>(null);

  // grupy do listy
  const grouped = useMemo(() => ({
    startups: filtered.filter((o) => o.category === "Startup"),
    companies: filtered.filter((o) => o.category === "Firma"),
  }), [filtered]);

  const filterOptions = {
    category: ["Startup", "Firma"],
    stage: ["MedTech", "SaaS", "Hardware", "AI", "Pre-seed", "Seed", "Early stage"],
    supportType: ["Inkubator", "Akceleracja", "Finansowanie"],
    location: ["Warszawa", "Kraków", "Poznań", "Gdańsk", "Wrocław", "Szczecin", "Katowice", "Tarnów", "Lublin"],
  };

  return (
    <section className="flex flex-col w-full items-center pt-[60px] pb-0 px-0">
      {/* nagłówek */}
      <div className="w-full">
        <div className="max-w-[1180px] mx-auto">
          <div className="pl-4 sm:pl-8 lg:pl-[72px] pt-6 pb-4">
            <div className="text-[#5DADE2] font-medium text-sm uppercase tracking-wide">MAPA EKOSYSTEMU</div>
            <h2 className="mt-2 text-gray-900 font-bold text-3xl lg:text-4xl leading-tight">
              Odkryj Polski Ekosystem<br />Startupowy
            </h2>
          </div>
        </div>
      </div>

      {/* mobile toggle */}
      <div className="lg:hidden w-full px-4 mb-4">
        <Button onClick={() => setShowMobileList(!showMobileList)} className="w-full h-[48px]">
          {showMobileList ? "Pokaż mapę" : "Pokaż listę podmiotów"}
        </Button>
      </div>

      {/* MAPA + LISTA */}
      <div className="w-full h-[400px] sm:h-[600px] lg:h-[851px] flex flex-col lg:flex-row">
        {/* Mapa */}
        <div className={cn("relative flex-1", showMobileList ? "hidden lg:block" : "block")}>
          <style>{`
            .leaflet-popup.leaflet-custom-popup .leaflet-popup-tip{display:none;}
            .leaflet-popup.leaflet-custom-popup .leaflet-popup-content-wrapper{background:transparent;box-shadow:none;border:none;padding:0;}
            .leaflet-popup.leaflet-custom-popup .leaflet-popup-content{margin:0;}
          `}</style>

          <MapContainer
            whenCreated={(m) => (mapRef.current = m)}
            center={[52.1, 19.4]}
            zoom={6}
            minZoom={4}
            maxZoom={18}
            className="absolute inset-0"
            scrollWheelZoom
            preferCanvas
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

            <FlyToSelected coords={selectedOrg?.coords ?? null} />
            {bounds && <FitBoundsSimple bounds={bounds} mapRef={mapRef} />}

            {filtered.map((org) => (
              <Marker
                key={org.id}
                position={org.coords}
                icon={logoIcon(org.logo, org.id === selectedId)}
                eventHandlers={{ click: () => setSelectedId(org.id) }}
              />
            ))}

            {selectedOrg && (
              <Popup position={selectedOrg.coords} offset={[0, 16]} closeButton={false} autoPan className="leaflet-custom-popup">
                <div className="w-[360px] rounded-2xl bg-white border border-[#b7d3e0] shadow-[0_12px_30px_rgba(15,85,117,0.18)] overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#EAF4FA] border-b border-[#b7d3e0]">
                    <img src={selectedOrg.logo} alt="" className="w-6 h-6 object-contain rounded" />
                    <div className="font-semibold text-gray-900 flex-1">{selectedOrg.name}</div>
                    <button onClick={() => setSelectedId(null)} className="w-6 h-6 inline-flex items-center justify-center rounded hover:bg-black/5" aria-label="Zamknij">
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="px-3 py-3 text-sm text-gray-700 space-y-1">
                    <div><span className="text-gray-500">Typ: </span>{selectedOrg.category}</div>
                    <div><span className="text-gray-500">Branża/Etap: </span>{selectedOrg.stage}</div>
                    <div><span className="text-gray-500">Wsparcie: </span>{selectedOrg.supportTypes}</div>
                    <div><span className="text-gray-500">Lokalizacja: </span>{selectedOrg.location}</div>
                  </div>
                </div>
              </Popup>
            )}
          </MapContainer>
        </div>

        {/* Panel listy */}
        <aside className={cn("w-full lg:w-[430px] h-full bg-white shadow-[-4px_0px_10px_#0f557526]", showMobileList ? "block" : "hidden lg:block")}>
          <header className="flex items-center gap-2.5 px-4 py-2 bg-[#EAF4FA] border-b border-[#b7d3e0]">
            <h3 className="font-semibold text-[#0F5575]">Lista podmiotów</h3>
          </header>

          {/* Filtry */}
          <div className="flex flex-col gap-3 p-4 border-b border-[#b7d3e0]">
            <div className="text-center font-semibold text-[#0F5575] text-xs">Filtruj</div>
            <div className="grid grid-cols-1 gap-2">
              <Dropdown label="Typ organizacji" value={filters.category} options={filterOptions.category} onChange={(v) => setFilters((f) => ({ ...f, category: v }))} />
              <Dropdown label="Branża/ścieżka lub Etap" value={filters.stage} options={filterOptions.stage} onChange={(v) => setFilters((f) => ({ ...f, stage: v }))} />
              <Dropdown label="Typ wsparcia" value={filters.supportType} options={filterOptions.supportType} onChange={(v) => setFilters((f) => ({ ...f, supportType: v }))} />
              <Dropdown label="Lokalizacja" value={filters.location} options={filterOptions.location} onChange={(v) => setFilters((f) => ({ ...f, location: v }))} />
            </div>
            <div className="relative">
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Wyszukaj po nazwie..." className="h-[35px] pl-10" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Lista */}
          <ScrollArea className="h-[calc(100%-200px)]">
            <div className="p-3">
              {/* STARTUPY */}
              {grouped.startups.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Startupy ({grouped.startups.length})
                  </h4>
                  <div className="space-y-2">
                    {grouped.startups.map((org) => {
                      const isSelected = org.id === selectedId;
                      return (
                        <Card
                          key={org.id}
                          onClick={() => setSelectedId(org.id)}
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-[#EAF4FA] border-0 border-t border-[#b7d3e0]",
                            isSelected ? "bg-[#EAF4FA]" : "bg-white"
                          )}
                        >
                          <CardContent className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <img className="w-16 h-6 object-contain" alt={`${org.name} logo`} src={org.logo} />
                              <div className={cn("flex-1 text-sm font-semibold", isSelected ? "text-[#1B7BA7]" : "text-gray-900")}>
                                {org.name}
                              </div>
                              {isSelected ? <CheckIcon className="w-4 h-4" /> : <ArrowRightIcon className="w-4 h-4" />}
                            </div>
                            <div className="mt-1 text-xs text-gray-600">
                              {/* jedna linia jak na screenie */}
                              {`Startup • ${org.stage} • ${org.supportTypes}`}
                            </div>
                            <div className="mt-0.5 text-[11px] text-gray-500">Lokalizacja: {org.location}</div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FIRMY */}
              {grouped.companies.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full" />
                    Firmy ({grouped.companies.length})
                  </h4>
                  <div className="space-y-2">
                    {grouped.companies.map((org) => {
                      const isSelected = org.id === selectedId;
                      return (
                        <Card
                          key={org.id}
                          onClick={() => setSelectedId(org.id)}
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-[#EAF4FA] border-0 border-t border-[#b7d3e0]",
                            isSelected ? "bg-[#EAF4FA]" : "bg-white"
                          )}
                        >
                          <CardContent className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <img className="w-16 h-6 object-contain" alt={`${org.name} logo`} src={org.logo} />
                              <div className={cn("flex-1 text-sm font-semibold", isSelected ? "text-[#1B7BA7]" : "text-gray-900")}>
                                {org.name}
                              </div>
                              {isSelected ? <CheckIcon className="w-4 h-4" /> : <ArrowRightIcon className="w-4 h-4" />}
                            </div>
                            {/* jedna linia dokładnie jak na screenie */}
                            <div className="mt-1 text-xs text-gray-600">
                              {`${org.description ?? "Partner Korporacyjny"} • ${org.stage} • ${org.supportTypes}`}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>
      </div>
    </section>
  );
};

export default BannerSection;
export { BannerSection };

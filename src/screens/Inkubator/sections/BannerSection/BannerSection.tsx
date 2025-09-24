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

/* =========================
   Mini UI (lokalne, 1 plik)
   ========================= */
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

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...p
}) => <div {...p} className={cn("p-4", className)} />;

const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...p
}) => <div {...p} className={cn("overflow-y-auto", className)} />;

/* ====== typy ====== */
type Org = {
  id: number;
  name: string;
  logo: string;
  category: "Startup" | "Firma";
  stage: string;
  supportTypes: string;
  location: string;
  coords: LatLngExpression;
  description?: string;
};

type Filters = {
  category: string;
  stage: string;
  supportType: string;
  location: string;
};

/* ====== DEMO dane ====== */
const ALL_ORGS: Org[] = [
  // Startupy (mniej podmiotów)
  {
    id: 1,
    name: "Polska Nagroda Innowacyjności 2021",
    logo: "/rectangle-4174-14.png",
    category: "Startup",
    stage: "MedTech",
    supportTypes: "Inkubator",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Startup B"
  },
  {
    id: 2,
    name: "Play.air",
    logo: "/rectangle-4174-19.png",
    category: "Startup",
    stage: "MedTech",
    supportTypes: "Finansowanie",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Startup B"
  },
  {
    id: 3,
    name: "Upmedic",
    logo: "/rectangle-4174-19.png",
    category: "Startup",
    stage: "MedTech",
    supportTypes: "Akceleracja",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Startup B"
  },
  {
    id: 4,
    name: "Gridaly",
    logo: "/rectangle-4174-19.png",
    category: "Startup",
    stage: "MedTech",
    supportTypes: "Inkubacja",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Startup B"
  },
  
  // Firmy (Partner Korporacyjny - więcej podmiotów)
  {
    id: 5,
    name: "Orange Polska",
    logo: "/rectangle-4174-4.png",
    category: "Firma",
    stage: "Pre seed, Seed +2",
    supportTypes: "8 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 6,
    name: "Ciech Ventures",
    logo: "/rectangle-4176-1.png",
    category: "Firma",
    stage: "Seed +2",
    supportTypes: "5 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 7,
    name: "HR Marketplace (eRecruiter)",
    logo: "/rectangle-4176-2.png",
    category: "Firma",
    stage: "Seed +2",
    supportTypes: "8 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 8,
    name: "Future Mind",
    logo: "/rectangle-4176-3.png",
    category: "Firma",
    stage: "Seed +3",
    supportTypes: "7 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 9,
    name: "BNP Paribas Polska",
    logo: "/rectangle-4176-4.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "6 typów wsparcia",
    location: "Kraków",
    coords: [50.0647, 19.945],
    description: "Partner Korporacyjny"
  },
  {
    id: 10,
    name: "PZU",
    logo: "/rectangle-4174-4.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "8 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 11,
    name: "Transcom",
    logo: "/rectangle-4176-1.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "5 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 12,
    name: "Maspex",
    logo: "/rectangle-4176-2.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "6 typów wsparcia",
    location: "Kraków",
    coords: [50.0647, 19.945],
    description: "Partner Korporacyjny"
  },
  {
    id: 13,
    name: "Veolia",
    logo: "/rectangle-4176-3.png",
    category: "Firma",
    stage: "Seed +2",
    supportTypes: "7 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 14,
    name: "Tauron Polska Energia",
    logo: "/rectangle-4176-4.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "6 typów wsparcia",
    location: "Katowice",
    coords: [50.2649, 19.0238],
    description: "Partner Korporacyjny"
  },
  {
    id: 15,
    name: "ORLEN Skylight Accelerator",
    logo: "/rectangle-4174-4.png",
    category: "Firma",
    stage: "Idea stage +1",
    supportTypes: "8 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 16,
    name: "Ringier Axel Springer",
    logo: "/rectangle-4176-1.png",
    category: "Firma",
    stage: "Seed +2",
    supportTypes: "7 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 17,
    name: "Grupa Azoty",
    logo: "/rectangle-4176-2.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "6 typów wsparcia",
    location: "Tarnów",
    coords: [50.0135, 20.9859],
    description: "Partner Korporacyjny"
  },
  {
    id: 18,
    name: "PGE Ventures",
    logo: "/rectangle-4176-3.png",
    category: "Firma",
    stage: "Seed +2",
    supportTypes: "6 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 19,
    name: "Instytut Matki i Dziecka",
    logo: "/rectangle-4176-4.png",
    category: "Firma",
    stage: "Early stage",
    supportTypes: "7 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 20,
    name: "InPost",
    logo: "/rectangle-4174-4.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "5 typów wsparcia",
    location: "Kraków",
    coords: [50.0647, 19.945],
    description: "Partner Korporacyjny"
  },
  {
    id: 21,
    name: "ORLEN VS",
    logo: "/rectangle-4176-1.png",
    category: "Firma",
    stage: "Seed +3",
    supportTypes: "6 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 22,
    name: "Saint-Gobain",
    logo: "/rectangle-4176-2.png",
    category: "Firma",
    stage: "Seed +3",
    supportTypes: "8 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 23,
    name: "Totalizator Sportowy",
    logo: "/rectangle-4176-3.png",
    category: "Firma",
    stage: "Pre-seed, Seed",
    supportTypes: "7 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 24,
    name: "Bank Pekao S.A.",
    logo: "/rectangle-4176-4.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "8 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 25,
    name: "Neuca",
    logo: "/rectangle-4174-4.png",
    category: "Firma",
    stage: "Seed, Early stage",
    supportTypes: "6 typów wsparcia",
    location: "Poznań",
    coords: [52.4064, 16.9252],
    description: "Partner Korporacyjny"
  },
  {
    id: 26,
    name: "Rossmann",
    logo: "/rectangle-4176-1.png",
    category: "Firma",
    stage: "Early stage",
    supportTypes: "5 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 27,
    name: "Żabka",
    logo: "/rectangle-4176-2.png",
    category: "Firma",
    stage: "Pre-seed +2",
    supportTypes: "7 typów wsparcia",
    location: "Poznań",
    coords: [52.4064, 16.9252],
    description: "Partner Korporacyjny"
  },
  {
    id: 28,
    name: "Citi Handlowy",
    logo: "/rectangle-4176-3.png",
    category: "Firma",
    stage: "Seed +3",
    supportTypes: "8 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 29,
    name: "Novartis",
    logo: "/rectangle-4176-4.png",
    category: "Firma",
    stage: "Seed +3",
    supportTypes: "9 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  },
  {
    id: 30,
    name: "Astra Zeneca",
    logo: "/rectangle-4174-4.png",
    category: "Firma",
    stage: "Seed +3",
    supportTypes: "9 typów wsparcia",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
    description: "Partner Korporacyjny"
  }
];

/* ====== marker z logiem ====== */
const logoIcon = (logoUrl: string, highlight = false) =>
  L.divIcon({
    html: `
      <div style="
        width:${highlight ? 54 : 42}px;height:${highlight ? 54 : 42}px;
        border-radius:50%;background:#fff;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 12px rgba(0,0,0,.15);
        border:${highlight ? "3px solid #1B7BA7" : "2px solid #e5e7eb"};
      ">
        <img src="${logoUrl}" style="width:70%;height:70%;object-fit:contain;border-radius:50%;" />
      </div>`,
    iconSize: [highlight ? 54 : 42, highlight ? 54 : 42],
    iconAnchor: [highlight ? 27 : 21, highlight ? 27 : 21],
    className: "",
  });

/* ====== flyTo ====== */
const FlyToSelected: React.FC<{ coords?: LatLngExpression | null }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, Math.max(map.getZoom(), 7), { duration: 0.5 });
  }, [coords, map]);
  return null;
};

/* ====== fitBounds ====== */
const FitBoundsSimple: React.FC<{
  bounds: L.LatLngBounds;
  mapRef: React.MutableRefObject<LeafletMap | null>;
}> = ({ bounds, mapRef }) => {
  useEffect(() => {
    const map = mapRef.current;
    if (map && bounds) {
      map.fitBounds(bounds, { padding: [32, 32] } as any);
    }
  }, [bounds, mapRef]);
  return null;
};

/* ====== Dropdown component ====== */
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
        <span className="flex items-center gap-2">
          {label === "Typ organizacji" && (
            <div className="w-5 h-5 bg-[#1B7BA7] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
          )}
          <span>{value || placeholder}</span>
        </span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg"
          >
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
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


/* =========================
   GŁÓWNY KOMPONENT
   ========================= */
const BannerSection: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showMobileList, setShowMobileList] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    stage: "",
    supportType: "",
    location: ""
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
      const byStage = !filters.stage || o.stage.includes(filters.stage);
      const bySupport = !filters.supportType || o.supportTypes.includes(filters.supportType);
      const byLocation = !filters.location || o.location === filters.location;
      return byQ && byCategory && byStage && bySupport && byLocation;
    });
  }, [query, filters]);

  const bounds = useMemo(() => {
    if (!filtered.length) return undefined;
    return L.latLngBounds(filtered.map((o) => o.coords as [number, number]));
  }, [filtered]);

  const mapRef = useRef<LeafletMap | null>(null);

  // Grupowanie według kategorii
  const groupedOrgs = useMemo(() => {
    const startups = filtered.filter(org => org.category === "Startup");
    const companies = filtered.filter(org => org.category === "Firma");
    return { startups, companies };
  }, [filtered]);

  // Opcje dla dropdownów
  const filterOptions = {
    category: ["Startup", "Firma"],
    stage: ["Pre-seed", "Seed", "Early stage", "Startup B"],
    supportType: ["Inkubator", "Akceleracja", "Finansowanie"],
    location: ["Warszawa", "Kraków", "Poznań", "Gdańsk"]
  };

  return (
    <section className="flex flex-col w-full items-center pt-[60px] pb-0 px-0">
      {/* Nagłówek z formularzem */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 py-8">
            {/* Lewa strona - nagłówek */}
            <div className="flex-1">
              <div className="text-[#5DADE2] font-medium text-sm uppercase tracking-wide mb-2">
                MAPA EKOSYSTEMU
              </div>
              <h2 className="text-gray-900 font-bold text-3xl lg:text-4xl leading-tight">
                Odkryj Polski Ekosystem<br />
                Startupowy
              </h2>
            </div>
            
            {/* Prawa strona - formularz */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Chcesz zaktualizować dane lub dodać nową organizację?
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full py-3 text-[#1B7BA7] border-[#1B7BA7] hover:bg-[#1B7BA7]/5"
                >
                  Wypełnij formularz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Przycisk mobile */}
      <div className="lg:hidden w-full px-4 mb-4">
        <Button 
          onClick={() => setShowMobileList(!showMobileList)} 
          className="w-full h-[48px] bg-[#1B7BA7] text-white hover:bg-[#1B7BA7]/90"
        >
          {showMobileList ? "Pokaż mapę" : "Pokaż listę podmiotów"}
        </Button>
      </div>

      {/* MAPA + LISTA */}
      <div className="w-full h-[400px] sm:h-[600px] lg:h-[700px] flex flex-col lg:flex-row">
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
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              attribution="&copy; OpenStreetMap contributors" 
            />

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
              <Popup 
                position={selectedOrg.coords} 
                offset={[0, -20]} 
                closeButton={false} 
                autoPan 
                className="leaflet-custom-popup"
              >
                <div className="w-80 rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <img src={selectedOrg.logo} alt="" className="w-8 h-8 object-contain rounded" />
                    <div className="font-semibold text-gray-900 flex-1">{selectedOrg.name}</div>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="w-6 h-6 inline-flex items-center justify-center rounded hover:bg-gray-200"
                      aria-label="Zamknij"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="text-sm text-gray-600">
                      Wypełnij formularz, żeby zobaczyć dane kontaktowe tego podmiotu Ekosystemu.
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Imię i nazwisko </span>
                        <span className="text-red-500">*</span>
                      </div>
                      <Input placeholder="Wpisz swoje imię i nazwisko..." className="text-sm" />
                      
                      <div>
                        <span className="text-gray-500">Adres e-mail </span>
                        <span className="text-red-500">*</span>
                      </div>
                      <Input placeholder="np. imie.nazwisko@gmail.com" className="text-sm" />
                      
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-xs text-gray-600">Przetwarzanie danych jakieś RODO? *</span>
                      </div>
                      
                      <Button className="w-full mt-3 py-2 bg-[#1B7BA7] text-white text-sm">
                        Wyślij i zobacz dane →
                      </Button>
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </MapContainer>
        </div>

        {/* Panel listy */}
        <aside
          className={cn(
            "w-full lg:w-[400px] h-full bg-white border-l border-gray-200",
            showMobileList ? "block" : "hidden lg:block"
          )}
        >
          <header className="px-4 py-3 bg-[#1B7BA7] text-white">
            <h3 className="font-semibold text-lg">Lista podmiotów</h3>
          </header>

          {/* Filtry */}
          <div className="p-4 border-b border-gray-200 space-y-3">
            <div className="text-center text-sm font-medium text-gray-700 mb-3">
              Filtruj
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Dropdown
                label="Typ organizacji"
                value={filters.category}
                options={filterOptions.category}
                onChange={(value) => setFilters({...filters, category: value})}
              />
              
              <Dropdown
                label="Branża/ścieżka"
                value={filters.stage}
                options={filterOptions.stage}
                onChange={(value) => setFilters({...filters, stage: value})}
              />
              
              <Dropdown
                label="Typ wsparcia"
                value={filters.supportType}
                options={filterOptions.supportType}
                onChange={(value) => setFilters({...filters, supportType: value})}
              />
              
              <Dropdown
                label="Etap rozwoju"
                value={filters.location}
                options={filterOptions.location}
                onChange={(value) => setFilters({...filters, location: value})}
              />
            </div>

            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Wyszukaj po nazwie..."
                className="pl-10"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Lista */}
          <ScrollArea className="h-[calc(100%-200px)]">
            <div className="p-4">
              {/* Startupy */}
              {groupedOrgs.startups.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Startupy ({groupedOrgs.startups.length})
                  </h4>
                  <div className="space-y-2">
                    {groupedOrgs.startups.map((org) => {
                      const isSelected = org.id === selectedId;
                      return (
                        <Card
                          key={org.id}
                          onClick={() => setSelectedId(org.id)}
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-gray-50 border-l-4",
                            isSelected ? "bg-blue-50 border-l-[#1B7BA7]" : "border-l-transparent"
                          )}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3 mb-2">
                              <img
                                className="w-8 h-8 object-contain"
                                alt={`${org.name} logo`}
                                src={org.logo}
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{org.name}</div>
                                <div className="text-xs text-gray-500">{org.description}</div>
                              </div>
                              {isSelected ? (
                                <CheckIcon className="w-4 h-4 text-[#1B7BA7]" />
                              ) : (
                                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                              <div>
                                <span className="text-gray-400">Branża</span>
                                <div>MedTech</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Typ wsparcia</span>
                                <div>{org.supportTypes}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Etap rozwoju</span>
                                <div>{org.stage}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Lokalizacja</span>
                                <div>{org.location}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Firmy */}
              {groupedOrgs.companies.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Firmy ({groupedOrgs.companies.length})
                  </h4>
                  <div className="space-y-2">
                    {groupedOrgs.companies.map((org) => {
                      const isSelected = org.id === selectedId;
                      return (
                        <Card
                          key={org.id}
                          onClick={() => setSelectedId(org.id)}
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-gray-50 border-l-4",
                            isSelected ? "bg-blue-50 border-l-[#1B7BA7]" : "border-l-transparent"
                          )}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3 mb-2">
                              <img
                                className="w-8 h-8 object-contain"
                                alt={`${org.name} logo`}
                                src={org.logo}
                              />
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{org.name}</div>
                                <div className="text-xs text-gray-500">{org.description}</div>
                              </div>
                              {isSelected ? (
                                <CheckIcon className="w-4 h-4 text-[#1B7BA7]" />
                              ) : (
                                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>{org.stage} • {org.supportTypes}</div>
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
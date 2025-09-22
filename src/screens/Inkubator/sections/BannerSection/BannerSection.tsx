// /src/screens/Inkubator/sections/BannerSection/BannerSection.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression, Map as LeafletMap } from "leaflet";

import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";

import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { ScrollArea } from "../../../../components/ui/scroll-area";

/* ====== typy ====== */
type Org = {
  id: number;
  name: string;
  logo: string;
  orgType: "Startup" | "Scaleup";
  industry: "SaaS" | "AI" | "Hardware";
  supportType: "Inkubacja" | "Akceleracja" | "Finansowanie";
  stage: "Proof of Concept" | "Pre-seed" | "Seed" | "Series A";
  location: string;
  coords: LatLngExpression;
};

type MultiFilters = Partial<{
  orgType: Org["orgType"][];
  industry: Org["industry"][];
  supportType: Org["supportType"][];
  stage: Org["stage"][];
}>;

type OpenDropdown = keyof MultiFilters | null;

/* ====== stałe filtrów ====== */
const FILTER_OPTIONS = {
  orgType: ["Startup", "Scaleup"] as Org["orgType"][],
  industry: ["SaaS", "AI", "Hardware"] as Org["industry"][],
  supportType: ["Inkubacja", "Akceleracja", "Finansowanie"] as Org["supportType"][],
  stage: ["Proof of Concept", "Pre-seed", "Seed", "Series A"] as Org["stage"][],
};

/* ====== DEMO dane ====== */
const ALL_ORGS: Org[] = [
  {
    id: 1,
    name: "Play.air",
    logo: "/rectangle-4174-14.png",
    orgType: "Startup",
    industry: "SaaS",
    supportType: "Inkubacja",
    stage: "Seed",
    location: "Gdańsk",
    coords: [54.352, 18.6466],
  },
  {
    id: 2,
    name: "OpenGrant",
    logo: "/rectangle-4174-19.png",
    orgType: "Startup",
    industry: "AI",
    supportType: "Finansowanie",
    stage: "Pre-seed",
    location: "Lublin",
    coords: [51.2465, 22.5684],
  },
  {
    id: 3,
    name: "NIRBY",
    logo: "/rectangle-4176-3.png",
    orgType: "Scaleup",
    industry: "Hardware",
    supportType: "Akceleracja",
    stage: "Series A",
    location: "Szczecin",
    coords: [53.4285, 14.5528],
  },
  {
    id: 4,
    name: "Binderless",
    logo: "/rectangle-4176-2.png",
    orgType: "Startup",
    industry: "Hardware",
    supportType: "Inkubacja",
    stage: "Proof of Concept",
    location: "Katowice",
    coords: [50.2649, 19.0238],
  },
  {
    id: 5,
    name: "Gridaly",
    logo: "/rectangle-4174-19.png",
    orgType: "Scaleup",
    industry: "SaaS",
    supportType: "Akceleracja",
    stage: "Seed",
    location: "Poznań",
    coords: [52.4064, 16.9252],
  },
  {
    id: 6,
    name: "Redstone Oracles",
    logo: "/rectangle-4174-19.png",
    orgType: "Startup",
    industry: "AI",
    supportType: "Finansowanie",
    stage: "Series A",
    location: "Wrocław",
    coords: [51.1079, 17.0385],
  },
  {
    id: 7,
    name: "Logoplan",
    logo: "/rectangle-4174-4.png",
    orgType: "Startup",
    industry: "SaaS",
    supportType: "Inkubacja",
    stage: "Pre-seed",
    location: "Warszawa",
    coords: [52.2297, 21.0122],
  },
  {
    id: 8,
    name: "Calmsie",
    logo: "/rectangle-4176-1.png",
    orgType: "Scaleup",
    industry: "AI",
    supportType: "Akceleracja",
    stage: "Seed",
    location: "Kraków",
    coords: [50.0647, 19.945],
  },
];

/* ====== marker z logiem ====== */
const logoIcon = (logoUrl: string, highlight = false) =>
  L.divIcon({
    html: `
      <div style="
        width:${highlight ? 54 : 42}px;height:${highlight ? 54 : 42}px;
        border-radius:9999px;background:#fff;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 6px 20px rgba(15,85,117,.25);
        border:${highlight ? "3px solid #4EBFEE" : "1px solid #F5FAFD"};
      ">
        <img src="${logoUrl}" style="width:80%;height:80%;object-fit:contain;border-radius:9999px;" />
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

/* ====== komponent ====== */
export const BannerSection = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null); // start bez popupu
  const [filters, setFilters] = useState<MultiFilters>({});
  const [open, setOpen] = useState<OpenDropdown>(null);

  const selectedOrg = useMemo(
    () => (selectedId ? ALL_ORGS.find((o) => o.id === selectedId) || null : null),
    [selectedId]
  );

  /* filtracja (multi) */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_ORGS.filter((o) => {
      const byQ = !q || o.name.toLowerCase().includes(q);

      const byOrgType =
        !filters.orgType?.length || filters.orgType.includes(o.orgType);

      const byIndustry =
        !filters.industry?.length || filters.industry.includes(o.industry);

      const bySupport =
        !filters.supportType?.length || filters.supportType.includes(o.supportType);

      const byStage =
        !filters.stage?.length || filters.stage.includes(o.stage);

      return byQ && byOrgType && byIndustry && bySupport && byStage;
    });
  }, [query, filters]);

  const bounds = useMemo(() => {
    if (!filtered.length) return undefined;
    return L.latLngBounds(filtered.map((o) => o.coords as [number, number]));
  }, [filtered]);

  const mapRef = useRef<LeafletMap | null>(null);

  return (
    <section className="flex flex-col w-full items-center pt-[60px] pb-0 px-0">
      {/* Header */}
      {/* Nagłówek nad mapą – jak na screenie */}
<div className="w-full">
  <div className="max-w-[1180px] mx-auto">
    <div className="pl-[72px] pt-6 pb-4">
      <div className="text-uiblue font-section-name font-[number:var(--section-name-font-weight)] text-[length:var(--section-name-font-size)] tracking-[var(--section-name-letter-spacing)] leading-[var(--section-name-line-height)] [font-style:var(--section-name-font-style)]">
        MAPA EKOSYSTEMU
      </div>

      <h2 className="mt-2 text-ui-black font-header-h2 font-[number:var(--header-h2-font-weight)] text-[length:var(--header-h2-font-size)] tracking-[var(--header-h2-letter-spacing)] leading-[var(--header-h2-line-height)] [font-style:var(--header-h2-font-style)]">
        Odkryj Polski Ekosystem
        <br />
        Startupowy
      </h2>
    </div>
  </div>
</div>


      {/* MAPA + LISTA */}
      <div className="w-full h-[851px] flex">
        {/* Mapa */}
        <div className="relative flex-1">
          <style>
            {`
              .leaflet-popup.leaflet-custom-popup .leaflet-popup-tip{display:none;}
              .leaflet-popup.leaflet-custom-popup .leaflet-popup-content-wrapper{background:transparent;box-shadow:none;border:none;padding:0;}
              .leaflet-popup.leaflet-custom-popup .leaflet-popup-content{margin:0;}
            `}
          </style>

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
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
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

            {/* Popup tylko po kliknięciu */}
            {selectedOrg && (
              <Popup
                position={selectedOrg.coords}
                offset={[0, 16]}
                closeButton={false}
                autoPan
                className="leaflet-custom-popup"
              >
                <div className="w-[360px] rounded-2xl bg-white border border-[#b7d3e0] shadow-[0_12px_30px_rgba(15,85,117,0.18)] overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-uiblue-tint border-b border-[#b7d3e0]">
                    <img src={selectedOrg.logo} alt="" className="w-6 h-5 object-contain rounded" />
                    <div className="font-header-h4 text-ui-black flex-1">{selectedOrg.name}</div>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="w-6 h-6 inline-flex items-center justify-center rounded hover:bg-black/5"
                      aria-label="Zamknij"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-3 py-2">
                    <MetaCol label="Typ organizacji" value={selectedOrg.orgType} />
                    <MetaCol label="Branża/ścieżka" value={selectedOrg.industry} />
                    <MetaCol label="Typ wsparcia" value={selectedOrg.supportType} />
                    <MetaCol label="Etap rozwoju" value={selectedOrg.stage} />
                    <MetaCol label="Lokalizacja" value={selectedOrg.location} />
                  </div>

                  <div className="px-3 pb-3">
                    <div className="opacity-50 font-body-body-3 text-ui-black mb-1">Opis</div>
                    <p className="font-body-body-3 text-ui-black">
                      Przykładowy opis organizacji. Podmień na realne dane z API.
                    </p>
                    <button className="mt-3 w-full h-[46px] rounded-[6px] bg-[#0f5575] text-white hover:bg-[#0f5575]/90 [font-family:'Montserrat',Helvetica] font-semibold">
                      Dane kontaktowe
                    </button>
                  </div>
                </div>
              </Popup>
            )}
          </MapContainer>
        </div>

        {/* Panel listy */}
        <aside className="w-[430px] h-full bg-white shadow-[-4px_0px_10px_#0f557526]">
          <header className="flex items-center gap-2.5 px-4 py-2 bg-uiblue-tint">
            <h3 className="font-header-h4 text-ui-dark-blue">Lista podmiotów</h3>
          </header>

          {/* Filtry */}
          <div className="flex flex-col gap-4 p-4 border-t border-[#b7d3e0] relative">
            <div className="text-center [font-family:'Raleway',Helvetica] font-semibold text-ui-dark-blue text-xs">Filtruj</div>

            <div className="flex flex-wrap items-center gap-2">
              <DropdownChipMulti
                label="Typ organizacji"
                value={filters.orgType ?? []}
                options={FILTER_OPTIONS.orgType}
                open={open === "orgType"}
                onOpen={() => setOpen(open === "orgType" ? null : "orgType")}
                onToggle={(opt) =>
                  setFilters((f) => toggleMulti(f, "orgType", opt))
                }
                onClear={() =>
                  setFilters((f) => ({ ...f, orgType: undefined }))
                }
              />

              <DropdownChipMulti
                label="Branża/ścieżka"
                value={filters.industry ?? []}
                options={FILTER_OPTIONS.industry}
                open={open === "industry"}
                onOpen={() => setOpen(open === "industry" ? null : "industry")}
                onToggle={(opt) =>
                  setFilters((f) => toggleMulti(f, "industry", opt))
                }
                onClear={() =>
                  setFilters((f) => ({ ...f, industry: undefined }))
                }
              />

              <DropdownChipMulti
                label="Typ wsparcia"
                value={filters.supportType ?? []}
                options={FILTER_OPTIONS.supportType}
                open={open === "supportType"}
                onOpen={() => setOpen(open === "supportType" ? null : "supportType")}
                onToggle={(opt) =>
                  setFilters((f) => toggleMulti(f, "supportType", opt))
                }
                onClear={() =>
                  setFilters((f) => ({ ...f, supportType: undefined }))
                }
              />

              <DropdownChipMulti
                label="Etap rozwoju"
                value={filters.stage ?? []}
                options={FILTER_OPTIONS.stage}
                open={open === "stage"}
                onOpen={() => setOpen(open === "stage" ? null : "stage")}
                onToggle={(opt) =>
                  setFilters((f) => toggleMulti(f, "stage", opt))
                }
                onClear={() =>
                  setFilters((f) => ({ ...f, stage: undefined }))
                }
              />
            </div>

            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Wyszukaj po nazwie..."
                className="h-[35px] px-[17px] bg-white rounded-2xl border border-[#5fa5c5] [font-family:'Raleway',Helvetica] text-[#080e1480] text-sm"
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Lista */}
          <ScrollArea className="h-[calc(100%-140px)] w-full">
            <div className="flex flex-col">
              {filtered.map((org) => {
                const isSelected = org.id === selectedId;
                return (
                  <Card
                    key={org.id}
                    onClick={() => setSelectedId(org.id)}
                    className={`w-full rounded-none border-0 border-t border-[#b7d3e0] ${
                      isSelected ? "bg-uiblue-tint" : "bg-white"
                    } hover:bg-uiblue-tint cursor-pointer`}
                  >
                    <CardContent className="flex flex-col gap-1 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <img className="w-20 h-8 object-contain" alt={`${org.name} logo`} src={org.logo} />
                        <div
                          className={`text-sm flex-1 [font-family:'Montserrat',Helvetica] font-semibold ${
                            isSelected ? "text-uiblue" : "text-ui-black"
                          }`}
                        >
                          {org.name}
                        </div>
                        {isSelected ? <CheckIcon className="w-4 h-4" /> : <ArrowRightIcon className="w-4 h-4" />}
                      </div>

                      <div className="flex flex-wrap items-end gap-[2px_12px]">
                        <Meta label="Typ" value={org.orgType} />
                        <Meta label="Branża" value={org.industry} />
                        <Meta label="Wsparcie" value={org.supportType} />
                        <Meta label="Etap" value={org.stage} />
                        <Meta label="Lokalizacja" value={org.location} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </aside>
      </div>
    </section>
  );
};

/* ====== Multi chip dropdown ====== */
function DropdownChipMulti<T extends string>({
  label,
  value,
  options,
  open,
  onOpen,
  onToggle,
  onClear,
}: {
  label: string;
  value: T[];                      // zaznaczone opcje
  options: readonly T[];           // wszystkie opcje
  open: boolean;
  onOpen: () => void;              // toggle otwarcia
  onToggle: (opt: T) => void;      // włącz/wyłącz opcję
  onClear: () => void;             // wyczyść cały filtr
}) {
  const hasAny = value.length > 0;
  const summary =
    hasAny ? (value.length <= 2 ? value.join(", ") : `${value[0]}, +${value.length - 1}`) : "";

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={onOpen}
        className={`${hasAny ? "bg-[#d4e9f6]" : "bg-[#e9f4fa]"} h-[35px] px-2.5 py-3.5 rounded-2xl hover:opacity-80 flex items-center gap-1`}
      >
        {hasAny && (
          <Badge className="w-4 h-4 bg-ui-dark-blue text-white text-[10px] rounded-full p-0 flex items-center justify-center">
            {value.length}
          </Badge>
        )}
        <span className="[font-family:'Raleway',Helvetica] font-medium text-ui-black text-sm tracking-[-0.28px] leading-[21px]">
          {label}
          {hasAny ? `: ${summary}` : ""}
        </span>
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      {open && (
        <div className="absolute z-20 mt-2 w-60 bg-white border border-[#b7d3e0] rounded-xl shadow-card-shadow p-2">
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-xs text-ui-black/70">Zaznacz wiele</span>
            <button
              onClick={onClear}
              className="text-xs text-ui-dark-blue hover:underline"
            >
              Wyczyść
            </button>
          </div>
          <div className="my-[2px] h-px bg-[#e6eef3]" />
          {options.map((opt) => {
            const active = value.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => onToggle(opt)}
                className={`w-full flex items-center gap-2 text-left px-2 py-1.5 rounded hover:bg-uiblue-tint text-sm`}
              >
                <span
                  className={`inline-flex w-4 h-4 items-center justify-center rounded-[4px] border ${
                    active ? "bg-ui-dark-blue border-ui-dark-blue text-white" : "border-[#b7d3e0]"
                  }`}
                >
                  {active ? <CheckIcon className="w-3 h-3" /> : null}
                </span>
                <span className={`${active ? "font-semibold text-ui-dark-blue" : ""}`}>{opt}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ====== helpers ====== */
function toggleMulti<T extends keyof MultiFilters>(
  f: MultiFilters,
  key: T,
  opt: NonNullable<MultiFilters[T]>[number]
): MultiFilters {
  const current = (f[key] ?? []) as string[];
  const exists = current.includes(opt as string);
  const next = exists ? current.filter((x) => x !== opt) : [...current, opt as string];
  return { ...f, [key]: next.length ? (next as any) : undefined };
}

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div className="inline-flex items-center gap-2">
    <span className="opacity-50 font-body-body-3 text-ui-black">{label}</span>
    <span className="font-body-body-3 text-ui-black">{value}</span>
  </div>
);

const MetaCol = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="opacity-50 font-body-body-3 text-ui-black">{label}</div>
    <div className="font-body-body-3 text-ui-black">{value}</div>
  </div>
);

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

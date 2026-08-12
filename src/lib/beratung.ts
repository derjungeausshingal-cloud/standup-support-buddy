// Skalierbare Ortssuche: statt einer riesigen statischen Liste aller Städte
// arbeiten wir mit PLZ-Leitzonen (2-stellige Präfixe) + generischen Trägern,
// die es flächendeckend in Deutschland gibt.

export type Thema =
  | "Mobbing"
  | "Diskriminierung"
  | "Gewalt"
  | "Bedrohung"
  | "Schule"
  | "Arbeit"
  | "Recht"
  | "Krise";

export const themen: Thema[] = [
  "Mobbing",
  "Diskriminierung",
  "Gewalt",
  "Bedrohung",
  "Schule",
  "Arbeit",
  "Recht",
  "Krise",
];

export type Stelle = {
  id: string;
  name: string;
  ort: string;
  themen: Thema[];
  tel: string;
  zeiten: string;
  beschreibung: string;
  art: "bundesweit" | "lokal";
  web?: string;
};

/** Bundesweite Telefon- und Onlineangebote (immer erreichbar). */
export const bundesweiteStellen: Stelle[] = [
  {
    id: "nummer-gegen-kummer",
    name: "Nummer gegen Kummer",
    ort: "Bundesweit / Telefon",
    themen: ["Mobbing", "Schule", "Krise"],
    tel: "116 111",
    zeiten: "Mo–Sa 14–20 Uhr",
    beschreibung: "Kostenlose und anonyme Beratung für Kinder und Jugendliche.",
    art: "bundesweit",
    web: "https://www.nummergegenkummer.de",
  },
  {
    id: "telefonseelsorge",
    name: "Telefonseelsorge",
    ort: "Bundesweit / Telefon",
    themen: ["Krise", "Mobbing"],
    tel: "0800 111 0 111",
    zeiten: "Rund um die Uhr",
    beschreibung: "Vertrauliche Gespräche, wenn dir etwas schwer auf der Seele liegt.",
    art: "bundesweit",
    web: "https://www.telefonseelsorge.de",
  },
  {
    id: "ads-bund",
    name: "Antidiskriminierungsstelle des Bundes",
    ort: "Bundesweit / Online",
    themen: ["Diskriminierung", "Arbeit", "Recht"],
    tel: "0800 546 546 5",
    zeiten: "Mo–Do 9–15 Uhr",
    beschreibung: "Erstberatung zu Diskriminierung und rechtlichen Möglichkeiten.",
    art: "bundesweit",
    web: "https://www.antidiskriminierungsstelle.de",
  },
  {
    id: "hilfetelefon-gewalt",
    name: "Hilfetelefon Gewalt gegen Frauen",
    ort: "Bundesweit / Telefon",
    themen: ["Gewalt", "Bedrohung"],
    tel: "116 016",
    zeiten: "Rund um die Uhr",
    beschreibung: "Beratung in vielen Sprachen, anonym und kostenfrei.",
    art: "bundesweit",
    web: "https://www.hilfetelefon.de",
  },
  {
    id: "weisser-ring",
    name: "Weisser Ring – Opfer-Telefon",
    ort: "Bundesweit / Telefon",
    themen: ["Gewalt", "Bedrohung", "Recht"],
    tel: "116 006",
    zeiten: "Täglich 7–22 Uhr",
    beschreibung: "Begleitung nach Straftaten, auf Wunsch auch bei Behördengängen.",
    art: "bundesweit",
    web: "https://weisser-ring.de",
  },
  {
    id: "juuuport",
    name: "Juuuport – Online-Beratung",
    ort: "Bundesweit / Online",
    themen: ["Mobbing", "Bedrohung", "Schule"],
    tel: "Online-Beratung (Chat & Formular)",
    zeiten: "Antwort meist innerhalb weniger Tage",
    beschreibung: "Junge Beraterinnen und Berater helfen bei Cybermobbing und Stress im Netz.",
    art: "bundesweit",
    web: "https://www.juuuport.de",
  },
];

/** PLZ-Leitzone (erste 2 Ziffern) → Region. Deckt ganz Deutschland ab. */
type Zone = { region: string; land: string };

const zonen: Record<string, Zone> = {};
function zone(von: number, bis: number, region: string, land: string) {
  for (let i = von; i <= bis; i++) zonen[String(i).padStart(2, "0")] = { region, land };
}
zone(1, 2, "Dresden und Umgebung", "Sachsen");
zone(3, 3, "Cottbus und Lausitz", "Brandenburg");
zone(4, 4, "Leipzig und Umgebung", "Sachsen");
zone(6, 6, "Halle und Südliches Sachsen-Anhalt", "Sachsen-Anhalt");
zone(7, 7, "Gera und Jena", "Thüringen");
zone(8, 9, "Chemnitz und Zwickau", "Sachsen");
zone(10, 16, "Berlin und Brandenburg", "Berlin/Brandenburg");
zone(17, 19, "Mecklenburg-Vorpommern", "Mecklenburg-Vorpommern");
zone(20, 25, "Hamburg und Schleswig-Holstein", "Hamburg/Schleswig-Holstein");
zone(26, 29, "Bremen und Nordwest-Niedersachsen", "Bremen/Niedersachsen");
zone(30, 33, "Hannover und Ostwestfalen", "Niedersachsen/NRW");
zone(34, 36, "Nordhessen", "Hessen");
zone(37, 38, "Braunschweig und Göttingen", "Niedersachsen");
zone(39, 39, "Magdeburg und Umgebung", "Sachsen-Anhalt");
zone(40, 47, "Düsseldorf, Ruhrgebiet und Niederrhein", "Nordrhein-Westfalen");
zone(48, 49, "Münsterland und Osnabrück", "NRW/Niedersachsen");
zone(50, 53, "Köln und Bonn", "Nordrhein-Westfalen");
zone(54, 56, "Trier und Koblenz", "Rheinland-Pfalz");
zone(57, 59, "Siegen, Sauerland und Hellweg", "Nordrhein-Westfalen");
zone(60, 65, "Frankfurt und Rhein-Main", "Hessen");
zone(66, 66, "Saarland", "Saarland");
zone(67, 69, "Rhein-Neckar und Pfalz", "Rheinland-Pfalz/Baden-Württemberg");
zone(70, 74, "Stuttgart und Region", "Baden-Württemberg");
zone(75, 79, "Karlsruhe und Freiburg", "Baden-Württemberg");
zone(80, 85, "München und Oberbayern", "Bayern");
zone(86, 87, "Augsburg und Allgäu", "Bayern");
zone(88, 89, "Bodensee und Ulm", "Baden-Württemberg/Bayern");
zone(90, 96, "Nürnberg und Franken", "Bayern");
zone(97, 97, "Würzburg und Mainfranken", "Bayern");
zone(98, 99, "Thüringen", "Thüringen");

/** Kompakter Städte-Index: nur Anker-PLZ, die Region liefert den Rest. */
const staedte: Record<string, string> = {
  berlin: "10",
  potsdam: "14",
  hamburg: "20",
  kiel: "24",
  luebeck: "23",
  rostock: "18",
  schwerin: "19",
  bremen: "28",
  oldenburg: "26",
  hannover: "30",
  braunschweig: "38",
  goettingen: "37",
  bielefeld: "33",
  magdeburg: "39",
  halle: "06",
  leipzig: "04",
  dresden: "01",
  chemnitz: "09",
  erfurt: "99",
  jena: "07",
  duesseldorf: "40",
  duisburg: "47",
  essen: "45",
  dortmund: "44",
  bochum: "44",
  wuppertal: "42",
  muenster: "48",
  osnabrueck: "49",
  koeln: "50",
  bonn: "53",
  aachen: "52",
  kassel: "34",
  trier: "54",
  koblenz: "56",
  siegen: "57",
  hagen: "58",
  frankfurt: "60",
  offenbach: "63",
  wiesbaden: "65",
  mainz: "55",
  darmstadt: "64",
  saarbruecken: "66",
  ludwigshafen: "67",
  mannheim: "68",
  heidelberg: "69",
  stuttgart: "70",
  heilbronn: "74",
  karlsruhe: "76",
  pforzheim: "75",
  freiburg: "79",
  muenchen: "80",
  ingolstadt: "85",
  augsburg: "86",
  kempten: "87",
  ulm: "89",
  konstanz: "78",
  nuernberg: "90",
  fuerth: "90",
  erlangen: "91",
  regensburg: "93",
  bayreuth: "95",
  bamberg: "96",
  wuerzburg: "97",
};

function normalize(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]/g, "");
}

export type OrtTreffer = { label: string; region: string; land: string; prefix: string };

/** Wandelt eine freie Eingabe (Stadt oder PLZ) in eine Region um. */
export function resolveOrt(input: string): OrtTreffer | null {
  const q = normalize(input);
  if (!q) return null;

  if (/^\d+$/.test(q)) {
    const prefix = q.padEnd(2, "0").slice(0, 2);
    const z = zonen[prefix];
    if (!z) return null;
    return { label: q.length >= 5 ? `PLZ ${q.slice(0, 5)}` : `PLZ-Bereich ${prefix}…`, ...z, prefix };
  }

  const keys = Object.keys(staedte);
  const key = keys.find((k) => k === q) ?? keys.find((k) => k.startsWith(q) || q.startsWith(k));
  if (key) {
    const prefix = staedte[key]!;
    const z = zonen[prefix]!;
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    return { label, region: z.region, land: z.land, prefix };
  }

  // Fallback: Regionsname direkt gesucht (z. B. „Allgäu“, „Thüringen“)
  const hit = Object.entries(zonen).find(
    ([, z]) => normalize(z.region).includes(q) || normalize(z.land).includes(q),
  );
  if (hit) return { label: hit[1].region, region: hit[1].region, land: hit[1].land, prefix: hit[0] };

  return null;
}

/** Generische Träger, die es flächendeckend gibt – pro Region erzeugt. */
const vorlagen: {
  id: string;
  name: (o: OrtTreffer) => string;
  themen: Thema[];
  tel: string;
  zeiten: string;
  beschreibung: string;
}[] = [
  {
    id: "schulpsychologie",
    name: (o) => `Schulpsychologische Beratungsstelle ${o.label}`,
    themen: ["Mobbing", "Schule", "Krise"],
    tel: "Über deine Schule oder das Schulamt erreichbar",
    zeiten: "Nach Vereinbarung",
    beschreibung: "Unterstützung bei Konflikten in der Schule – auf Wunsch gemeinsam mit deinen Eltern.",
  },
  {
    id: "jugendberatung",
    name: (o) => `Jugend- und Familienberatung ${o.label}`,
    themen: ["Mobbing", "Schule", "Krise", "Gewalt"],
    tel: "Über das Jugendamt vor Ort",
    zeiten: "Mo–Fr, Termine nach Absprache",
    beschreibung: "Kostenlose Beratung für Jugendliche und Familien in der Region.",
  },
  {
    id: "weisser-ring-lokal",
    name: (o) => `Weisser Ring – Außenstelle ${o.region}`,
    themen: ["Gewalt", "Bedrohung", "Recht"],
    tel: "116 006",
    zeiten: "Täglich 7–22 Uhr, Termine vor Ort",
    beschreibung: "Persönliche Begleitung nach Straftaten, auch bei Terminen bei Polizei oder Gericht.",
  },
  {
    id: "ads-lokal",
    name: (o) => `Antidiskriminierungsberatung ${o.region}`,
    themen: ["Diskriminierung", "Arbeit", "Recht"],
    tel: "Über die Beratungsstelle vor Ort",
    zeiten: "Mo–Do, Termine nach Absprache",
    beschreibung: "Regionale Erstberatung bei Diskriminierung in Schule, Ausbildung oder Job.",
  },
  {
    id: "gewaltschutz",
    name: (o) => `Gewaltschutz- und Interventionsstelle ${o.region}`,
    themen: ["Gewalt", "Bedrohung", "Krise"],
    tel: "Über die Interventionsstelle des Landes",
    zeiten: "Mo–Fr, Notfälle rund um die Uhr über 110",
    beschreibung: "Beratung und Schutz bei Bedrohung oder Gewalt in der Nähe.",
  },
  {
    id: "arbeitsrecht",
    name: (o) => `Beratung zu Konflikten am Arbeitsplatz – ${o.region}`,
    themen: ["Arbeit", "Mobbing", "Recht"],
    tel: "Über Gewerkschaft oder Betriebsrat vor Ort",
    zeiten: "Nach Vereinbarung",
    beschreibung: "Anlaufstelle bei Mobbing, Druck oder Ausgrenzung im Job – auch ohne Mitgliedschaft informierend.",
  },
];

export function lokaleStellen(ort: OrtTreffer): Stelle[] {
  return vorlagen.map((v) => ({
    id: `${v.id}-${ort.prefix}`,
    name: v.name(ort),
    ort: `${ort.label} · ${ort.land}`,
    themen: v.themen,
    tel: v.tel,
    zeiten: v.zeiten,
    beschreibung: v.beschreibung,
    art: "lokal" as const,
  }));
}

export function sucheStellen(ortInput: string, thema: Thema | null) {
  const ort = resolveOrt(ortInput);
  const passt = (s: Stelle) => !thema || s.themen.includes(thema);
  const lokal = ort ? lokaleStellen(ort).filter(passt) : [];
  const bundesweit = bundesweiteStellen.filter(passt);
  return { ort, lokal, bundesweit, unbekannterOrt: ortInput.trim().length > 1 && !ort };
}

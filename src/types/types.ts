export type Term = {
  term: string;
};

export type Person = {
  rolle: string;
  nachname: string;
};

export type Location = {
  typ: string;
  term: string;
};

export type Record = {
  imdasid: string;
  anzeigetitel: string;
  objektstatus: string;
  bereich: string;
  sammlung: string;
  eingangsnummer: string;
  eingangsjahr: string;
  eingangsart: string;
  inventarnummer: string;
  inventarisierungsdatum: string;
  standort: string;
  objekttitel: string;
  objektbezeichnung: Term[];
  werktitel: string;
  entstehungszeit: string;
  kurzbeschreibung: string;
  person: Person[];
  onlinepublikation: Term[];
  sammlungsgliederung: Term[];
  medium: { typ: string; version: string }[];
  ort: Location[];
};

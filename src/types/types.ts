export type Term = {
  term: string;
};

export type ObjektBezeichnung = Term;

export type Person = {
  rolle: string;
  nachname: string;
};

export type OnlinePublikation = Term;

export type Sammlungsgliederung = Term;

export type Medium = {
  typ: string;
  version: string;
};

export type Record = {
  imdasid: string;
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
  objektbezeichnung: ObjektBezeichnung[];
  werktitel: string;
  entstehungszeit: string;
  kurzbeschreibung: string;
  person: Person[];
  onlinepublikation: OnlinePublikation[];
  sammlungsgliederung: Sammlungsgliederung[];
  medium: Medium[];
};

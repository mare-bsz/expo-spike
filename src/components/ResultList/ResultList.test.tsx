import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultList from './ResultList';
import { Record } from '../../types/types';

const records: Record[] = [
  {
    imdasid: '1',
    objektstatus: 'Status 1',
    bereich: 'Bereich 1',
    sammlung: 'Sammlung 1',
    eingangsnummer: 'E1',
    eingangsjahr: '2020',
    eingangsart: 'Art 1',
    inventarnummer: '0001',
    inventarisierungsdatum: '2020-03-29',
    standort: 'Fach 1',
    objekttitel: 'Titel 1',
    objektbezeichnung: [{ term: 'Bezeichnung 1' }],
    werktitel: 'Werktitel 1',
    entstehungszeit: '1989',
    kurzbeschreibung: 'Beschreibung 1',
    person: [{ rolle: 'Hersteller', nachname: 'Name 1' }],
    onlinepublikation: [{ term: 'Online 1' }],
    sammlungsgliederung: [{ term: 'Sammlung 1' }],
    medium: [{ typ: 'Bild', version: 'v1' }],
  },
  {
    imdasid: '2',
    objektstatus: 'Status 2',
    bereich: 'Bereich 2',
    sammlung: 'Sammlung 2',
    eingangsnummer: 'E2',
    eingangsjahr: '2019',
    eingangsart: 'Art 2',
    inventarnummer: '0002',
    inventarisierungsdatum: '2019-02-21',
    standort: 'Fach 2',
    objekttitel: 'Titel 2',
    objektbezeichnung: [{ term: 'Bezeichnung 2' }],
    werktitel: 'Werktitel 2',
    entstehungszeit: '1990',
    kurzbeschreibung: 'Beschreibung 2',
    person: [{ rolle: 'Hersteller', nachname: 'Name 2' }],
    onlinepublikation: [{ term: 'Online 2' }],
    sammlungsgliederung: [{ term: 'Sammlung 2' }],
    medium: [{ typ: 'Bild', version: 'v2' }],
  },
];

describe('ResultList Component', () => {
  test('renders a list of records', () => {
    render(<ResultList records={records} />);

    records.forEach(record => {
      expect(
        screen.getByText(`${record.inventarnummer}: ${record.werktitel}`)
      ).toBeInTheDocument();
    });
  });

  test('renders an empty list without errors', () => {
    render(<ResultList records={[]} />);

    expect(screen.queryByText(/:/)).toBeNull();
  });
});

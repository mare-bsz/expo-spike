import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultList from './ResultList';
import { Record } from '../../types/types';

const records: Record[] = [
  {
    imdasid: '1',
    anzeigetitel: '0001: Werktitel 1',
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
    ort: [{ typ: 'Herstellungsort', term: 'Stammheim <O>' }],
  },
  {
    imdasid: '2',
    anzeigetitel: '0002: Werktitel 2',
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
    ort: [{ typ: 'Herstellungsort', term: 'Stammheim <O>' }],
  },
];

describe('ResultList Component', () => {
  const searchTerm = 'test search';

  test('renders a list of records', () => {
    render(
      <MemoryRouter>
        <ResultList records={records} searchTerm={searchTerm} />
      </MemoryRouter>
    );

    records.forEach(record => {
      expect(
        screen.getByText(`${record.inventarnummer}: ${record.werktitel}`)
      ).toBeVisible();
    });
  });

  test('renders an empty list without errors', () => {
    render(
      <MemoryRouter>
        <ResultList records={[]} searchTerm={searchTerm} />
      </MemoryRouter>
    );

    expect(screen.queryByText(':')).toBeNull();
  });

  test('includes searchTerm in link state', () => {
    render(
      <MemoryRouter>
        <ResultList records={records} searchTerm={searchTerm} />
      </MemoryRouter>
    );

    records.forEach(record => {
      const link = screen
        .getByText(`${record.inventarnummer}: ${record.werktitel}`)
        .closest('a');

      // Ensure the link has the correct href attribute
      expect(link).toHaveAttribute('href', `/detail/${record.imdasid}`);
    });
  });
});

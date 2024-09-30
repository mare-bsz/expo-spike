import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailPageDefinitionList from './DetailPageDefinitionList';
import { Record } from '../../../types/types';
import detailTranslations from '../../../translations/detail.de.json';

// Mocking formatRecordValue function
jest.mock('../utils/formatters', () => ({
  formatRecordValue: jest.fn(value => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value))
      return value.map(v => JSON.stringify(v)).join(', ');
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }),
}));

const record: Record = {
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
  sammlungsgliederung: [{ term: 'Sammlungsgliederung 1' }],
  medium: [{ typ: 'Bild', version: 'v1' }],
  ort: [{ typ: 'Herstellungsort', term: 'Stammheim <O>' }],
};

describe('DetailPageDefinitionList Component', () => {
  test('renders all keys and values correctly', () => {
    render(<DetailPageDefinitionList record={record} />);

    // Check translated keys (dt elements)
    Object.keys(record).forEach(key => {
      // @ts-ignore no typings for translations available
      const translatedKey = detailTranslations.record[key];
      expect(screen.getByText(translatedKey)).toBeVisible();
    });

    // Check string values (dd elements)
    Object.entries(record).forEach(([, value]) => {
      if (typeof value === 'string') {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(screen.getByText(value)).toBeVisible();
      }
    });
  });

  test('renders nested object values correctly', () => {
    render(<DetailPageDefinitionList record={record} />);

    expect(screen.getByText('{"term":"Bezeichnung 1"}')).toBeVisible();
    expect(
      screen.getByText('{"rolle":"Hersteller","nachname":"Name 1"}')
    ).toBeVisible();
    expect(screen.getByText('{"term":"Online 1"}')).toBeVisible();
    expect(screen.getByText('{"term":"Sammlungsgliederung 1"}')).toBeVisible();
    expect(screen.getByText('{"typ":"Bild","version":"v1"}')).toBeVisible();
    expect(
      screen.getByText('{"typ":"Herstellungsort","term":"Stammheim <O>"}')
    ).toBeVisible();
  });
});

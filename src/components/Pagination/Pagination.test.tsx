import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const setFirstResultPosition = jest.fn();
  const renderComponent = (firstResultPosition: number, numFound: number) => {
    return render(
      <Pagination
        firstResultPosition={firstResultPosition}
        setFirstResultPosition={setFirstResultPosition}
        numFound={numFound}
      />
    );
  };

  test('renders both back and forward buttons correctly when navigation is possible', () => {
    renderComponent(25, 100);

    expect(screen.getByText(/zurück/i)).toBeVisible();
    expect(screen.getByText(/weiter/i)).toBeVisible();
  });

  test('renders only the forward button when at the beginning', () => {
    renderComponent(0, 100);

    expect(screen.queryByText(/zurück/i)).toBeNull();
    expect(screen.getByText(/weiter/i)).toBeVisible();
  });

  test('renders only the back button when at the end', () => {
    renderComponent(75, 100); // 75 + 25 = 100 (end)

    expect(screen.getByText(/zurück/i)).toBeVisible();
    expect(screen.queryByText(/weiter/i)).toBeNull();
  });

  test('does not render buttons if no navigation is possible', () => {
    renderComponent(0, 0);

    expect(screen.queryByText(/zurück/i)).toBeNull();
    expect(screen.queryByText(/weiter/i)).toBeNull();
  });

  test('clicking the back button updates the firstResultPosition', () => {
    renderComponent(50, 100);

    fireEvent.click(screen.getByText(/zurück/i));
    expect(setFirstResultPosition).toHaveBeenCalledWith(25); // 50 - 25 = 25
  });

  test('clicking the forward button updates the firstResultPosition', () => {
    renderComponent(50, 100);

    fireEvent.click(screen.getByText(/weiter/i));
    expect(setFirstResultPosition).toHaveBeenCalledWith(75); // 50 + 25 = 75
  });
});

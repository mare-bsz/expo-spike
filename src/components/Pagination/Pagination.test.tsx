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

    expect(screen.getByLabelText(/zurück/i)).toBeVisible();
    expect(screen.getByLabelText(/weiter/i)).toBeVisible();
  });

  test('only the forward button is visible at the beginning', () => {
    renderComponent(0, 100);

    expect(screen.getByLabelText(/zurück/i)).toHaveClass(
      'pagination__button--invisible'
    );
    expect(screen.getByLabelText(/weiter/i)).toBeVisible();
  });

  test('only the back button is visible at the end', () => {
    renderComponent(75, 100);

    expect(screen.getByLabelText(/zurück/i)).toBeVisible();
    expect(screen.getByLabelText(/weiter/i)).toHaveClass(
      'pagination__button--invisible'
    );
  });

  test('both buttons are invisible if navigation is not possible', () => {
    renderComponent(0, 0);

    expect(screen.getByLabelText(/zurück/i)).toHaveClass(
      'pagination__button--invisible'
    );
    expect(screen.getByLabelText(/weiter/i)).toHaveClass(
      'pagination__button--invisible'
    );
  });

  test('clicking the back button updates the firstResultPosition', () => {
    renderComponent(50, 100);

    fireEvent.click(screen.getByLabelText(/zurück/i));
    expect(setFirstResultPosition).toHaveBeenCalledWith(25); // 50 - 25 = 25
  });

  test('clicking the forward button updates the firstResultPosition', () => {
    renderComponent(50, 100);

    fireEvent.click(screen.getByLabelText(/weiter/i));
    expect(setFirstResultPosition).toHaveBeenCalledWith(75); // 50 + 25 = 75
  });
});

import { render } from '@testing-library/react';
import React from 'react';

import CalendarHeader, { type CalendarHeaderProps } from './CalendarHeader';

describe(CalendarHeader.name, () => {
  const props: CalendarHeaderProps = {
    activeMonthLabel: 'January',
    activeYear: '2022',
    prevButtonProps: {
      disabled: false,
      'aria-label': 'Previous month',
    },
    nextButtonProps: {
      disabled: false,
      'aria-label': 'Next month',
    },
    onNavigateBack: jest.fn(),
    onNavigateForward: jest.fn(),
  };

  it('should render month and year', () => {
    const { getByText } = render(<CalendarHeader {...props} />);
    expect(getByText('January 2022')).toBeInTheDocument();
  });

  it('should disable previous button', () => {
    const { getByRole } = render(
      <CalendarHeader
        {...props}
        prevButtonProps={{ ...props.prevButtonProps, disabled: true }}
      />
    );
    expect(getByRole('navigate-back')).toBeDisabled();
  });

  it('should disable next button', () => {
    const { getByRole } = render(
      <CalendarHeader
        {...props}
        nextButtonProps={{ ...props.nextButtonProps, disabled: true }}
      />
    );
    expect(getByRole('navigate-forward')).toBeDisabled();
  });

  it('should call onNavigateBack', () => {
    const { getByRole } = render(<CalendarHeader {...props} />);
    getByRole('navigate-back').click();
    expect(props.onNavigateBack).toHaveBeenCalled();
  });

  it('should call onNavigateForward', () => {
    const { getByRole } = render(<CalendarHeader {...props} />);
    getByRole('navigate-forward').click();
    expect(props.onNavigateForward).toHaveBeenCalled();
  });
});

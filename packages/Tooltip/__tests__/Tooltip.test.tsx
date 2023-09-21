import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Tooltip from '..';

describe('Tooltip', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Tooltip content="I am a tooltip">Hover me</Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    const { container } = render(
      <Tooltip content="I am a tooltip" className="custom-tooltip">
        Hover me
      </Tooltip>
    );
    expect(container.firstChild).toHaveClass('custom-tooltip');
  });

  test('should show tooltip when mouse over target', () => {
    render(<Tooltip content="I am a tooltip">Hover me</Tooltip>);
    const element = document.querySelector('.raw-tooltip');
    fireEvent.mouseOver(element);
    setTimeout(() => {
      expect('I am a tooltip').toBeInTheDocument();
    }, 50);
  });

  test('should hide tooltip when mouse out target', () => {
    render(<Tooltip content="I am a tooltip">Hover me</Tooltip>);
    const element = document.querySelector('.raw-tooltip');
    fireEvent.mouseOver(element);
    setTimeout(() => {
      expect('I am a tooltip').toBeInTheDocument();
    }, 50);
    fireEvent.mouseOut(element);
    setTimeout(() => {
      expect('I am a tooltip').not.toBeInTheDocument();
    }, 50);
  });

  test('should support disabled tooltip', () => {
    render(
      <Tooltip content="I am a tooltip" disabled>
        Hover me
      </Tooltip>
    );
    const element = document.querySelector('.raw-tooltip');
    fireEvent.mouseOver(element);
    setTimeout(() => {
      expect('I am a tooltip').not.toBeInTheDocument();
    }, 50);
  });
});

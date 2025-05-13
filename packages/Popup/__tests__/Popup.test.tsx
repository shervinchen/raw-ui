import React, { useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popup from '../Popup';

const mockGetPopupPosition = jest.fn().mockReturnValue({
  top: 0,
  left: 0,
});

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

const Component = ({
  visible,
  targetElement,
  getPopupContainer,
}: {
  visible: boolean;
  targetElement: HTMLElement | null;
  getPopupContainer: () => HTMLElement | null;
}) => {
  return (
    <Popup
      name="testPopup"
      visible={visible}
      zIndex={1000}
      targetElement={targetElement}
      getPopupPosition={mockGetPopupPosition}
      getPopupContainer={getPopupContainer}
    >
      Popup Content
    </Popup>
  );
};

describe('Popup', () => {
  const targetElement = document.createElement('div');
  const getPopupContainerMock = jest.fn();

  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Component
        visible
        targetElement={targetElement}
        getPopupContainer={getPopupContainerMock}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render correctly content when visible is true', () => {
    render(
      <Component
        visible
        targetElement={targetElement}
        getPopupContainer={getPopupContainerMock}
      />,
    );
    expect(screen.queryByTestId('popup')).toBeInTheDocument();
  });

  test('should not render content when visible is false', () => {
    render(
      <Component
        visible={false}
        targetElement={targetElement}
        getPopupContainer={getPopupContainerMock}
      />,
    );
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });

  test('should not render content when targetElement is null', () => {
    render(
      <Component
        visible
        targetElement={null}
        getPopupContainer={getPopupContainerMock}
      />,
    );
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });

  test('should update popup position when first render', () => {
    render(
      <Component
        visible
        targetElement={targetElement}
        getPopupContainer={getPopupContainerMock}
      />,
    );
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
  });

  test('should render to specified container', () => {
    const Container = () => {
      const customContainerRef = useRef<HTMLDivElement>(null);

      return (
        <div>
          <div ref={customContainerRef} data-testid="customContainer" />
          <div>
            <Component
              visible
              targetElement={targetElement}
              getPopupContainer={() => customContainerRef.current}
            />
          </div>
        </div>
      );
    };
    render(<Container />);
    expect(
      screen
        .getByTestId('customContainer')
        .contains(screen.getByTestId('popup')),
    ).toBeTruthy();
  });

  test('should prevent event on popup', async () => {
    const handleClick = jest.fn();
    const handleMouseDown = jest.fn();
    render(
      <div onClick={handleClick} onMouseDown={handleMouseDown}>
        <Component
          visible
          targetElement={targetElement}
          getPopupContainer={getPopupContainerMock}
        />
      </div>,
    );
    const popup = screen.getByTestId('popup');
    fireEvent.mouseDown(popup);
    await user.click(popup);
    expect(handleClick).not.toHaveBeenCalled();
    expect(handleMouseDown).not.toHaveBeenCalled();
  });

  test('should not trigger overflow ancestor scroll event when targetElement is null', () => {
    const ScrollableComponent = () => {
      return (
        <div
          data-testid="parentElement"
          style={{
            overflowY: 'auto',
            width: '400px',
            height: '200px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
            }}
          >
            <Component
              visible
              targetElement={null}
              getPopupContainer={getPopupContainerMock}
            />
          </div>
        </div>
      );
    };
    render(<ScrollableComponent />);
    const parentElement = screen.getByTestId('parentElement');
    fireEvent.scroll(parentElement, {
      target: { scrollTop: 100 },
    });
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(0);
  });
});

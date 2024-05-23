import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popup from '..';
import { MutableRefObject, useRef } from 'react';

const mockGetPopupPosition = jest.fn().mockReturnValue({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  transform: 'translate(0, 0)',
});

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

const Component = ({
  visible,
  targetRef,
  getPopupContainer,
}: {
  visible: boolean;
  targetRef?: MutableRefObject<HTMLElement | null>;
  getPopupContainer: () => HTMLElement | null;
}) => {
  return (
    <Popup
      name="testPopup"
      visible={visible}
      targetRef={targetRef}
      getPopupPosition={mockGetPopupPosition}
      getPopupContainer={getPopupContainer}
    >
      Popup Content
    </Popup>
  );
};

describe('Popup', () => {
  const targetRefMock = {
    current: document.createElement('div'),
  };
  const getPopupContainerMock = jest.fn();

  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render correctly content when visible is true', () => {
    render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(screen.queryByTestId('popup')).toBeInTheDocument();
  });

  test('should not render content when visible is false', () => {
    render(
      <Component
        visible={false}
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });

  test('should update popup position when targetRef changes', () => {
    const { rerender } = render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
    const newTargetRefMock = {
      current: document.createElement('div'),
    };
    rerender(
      <Component
        visible
        targetRef={newTargetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
  });

  test('should update popup position when window resize', () => {
    render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
    fireEvent(window, new Event('resize'));
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(2);
  });

  test('should update popup position when mouse over', async () => {
    render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
    await user.hover(targetRefMock.current);
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(2);
  });

  test('should update popup position when document size change', async () => {
    render(
      <Component visible targetRef={targetRefMock} getPopupContainer={null} />
    );
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
    document.body.style.height = '10000px';
    await waitFor(() => {
      expect(mockGetPopupPosition).toHaveBeenCalledTimes(2);
    });
  });

  test('should update popup position when container size change', async () => {
    render(
      <div
        id="parentElement"
        style={{
          position: 'relative',
          overflowY: 'auto',
          width: '400px',
          height: '200px',
        }}
      >
        <Component
          visible
          targetRef={targetRefMock}
          getPopupContainer={() => document.querySelector('#parentElement')}
        />
      </div>
    );
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
    const parentElement = document.querySelector(
      '#parentElement'
    ) as HTMLElement;
    parentElement.style.height = '10000px';
    await waitFor(() => {
      expect(mockGetPopupPosition).toHaveBeenCalledTimes(2);
    });
  });

  test('should render to specified container', () => {
    const Container = () => {
      const ref = useRef<HTMLDivElement>(null);
      const customContainerRef = useRef<HTMLDivElement>(null);

      return (
        <div>
          <div ref={customContainerRef} data-testid="customContainer" />
          <div ref={ref}>
            <Component
              visible
              targetRef={ref}
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
        .contains(screen.getByTestId('popup'))
    ).toBeTruthy();
  });

  test('should prevent event on popup', async () => {
    render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    const popup = screen.getByTestId('popup');
    await user.click(popup);
    expect(popup).toBeInTheDocument();
  });

  test('should not trigger mouse over event when target is empty', async () => {
    render(<Component visible getPopupContainer={getPopupContainerMock} />);
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
    await user.hover(targetRefMock.current);
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
  });

  test('should not trigger mouse over event when event is removed', async () => {
    const { unmount } = render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
    unmount();
    await user.hover(targetRefMock.current);
    expect(mockGetPopupPosition).toHaveBeenCalledTimes(1);
  });
});

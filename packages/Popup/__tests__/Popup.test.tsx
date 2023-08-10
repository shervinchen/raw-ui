import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popup from '..';
import { MutableRefObject, useRef } from 'react';

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
      getPopupContainer={getPopupContainer}
    >
      Popup Content
    </Popup>
  );
};

const mockComputePopupRect = jest.fn().mockReturnValue({
  top: 0,
  left: 0,
  width: 0,
});
jest.mock('../computePopupRect.ts', () => ({
  computePopupRect: () => mockComputePopupRect,
}));

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

  test('should update popup rect when targetRef changes', () => {
    const { rerender } = render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockComputePopupRect).toHaveBeenCalledTimes(1);
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
    expect(mockComputePopupRect).toHaveBeenCalledTimes(2);
  });

  test('should update popup rect when window resize', () => {
    render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockComputePopupRect).toHaveBeenCalledTimes(1);
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(mockComputePopupRect).toHaveBeenCalledTimes(2);
  });

  test('should update popup rect when document click', () => {
    render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockComputePopupRect).toHaveBeenCalledTimes(1);
    act(() => {
      document.dispatchEvent(new MouseEvent('click'));
    });
    expect(mockComputePopupRect).toHaveBeenCalledTimes(2);
  });

  test('should update popup rect when mouse over', () => {
    render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockComputePopupRect).toHaveBeenCalledTimes(1);
    act(() => {
      targetRefMock.current.dispatchEvent(new Event('mouseenter'));
    });
    expect(mockComputePopupRect).toHaveBeenCalledTimes(2);
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
    await userEvent.click(popup);
    expect(popup).toBeInTheDocument();
  });

  test('should not trigger mouse over event when target is empty', () => {
    render(<Component visible getPopupContainer={getPopupContainerMock} />);
    expect(mockComputePopupRect).toHaveBeenCalledTimes(1);
    act(() => {
      targetRefMock.current.dispatchEvent(new Event('mouseenter'));
    });
    expect(mockComputePopupRect).toHaveBeenCalledTimes(1);
  });

  test('should not trigger mouse over event when event is removed', () => {
    const { unmount } = render(
      <Component
        visible
        targetRef={targetRefMock}
        getPopupContainer={getPopupContainerMock}
      />
    );
    expect(mockComputePopupRect).toHaveBeenCalledTimes(1);
    unmount();
    act(() => {
      targetRefMock.current.dispatchEvent(new Event('mouseenter'));
    });
    expect(mockComputePopupRect).toHaveBeenCalledTimes(1);
  });
});

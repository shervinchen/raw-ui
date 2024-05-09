import React, { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Button, Modal, ModalProps } from '../..';
import userEvent from '@testing-library/user-event';
import { KeyCode } from '../../utils/constant';

const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('Modal', () => {
  const closeHandler = jest.fn();

  const Component = (props: ModalProps) => {
    const [visible, setVisible] = useState(false);

    const openModal = () => setVisible(true);

    const closeModal = () => {
      setVisible(false);
      closeHandler();
    };

    return (
      <>
        <Button onClick={openModal} data-testid="openModal">
          Open Modal
        </Button>
        <Modal visible={visible} onClose={closeModal} {...props}>
          <Modal.Header>Modal Title</Modal.Header>
          <Modal.Body>
            <div>This is a modal.</div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" onClick={closeModal}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Modal visible>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <div>This is a modal.</div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button type="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    render(
      <Modal visible className="custom-modal">
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <div>This is a modal.</div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button type="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
    expect(screen.getByTestId('modalWrapper')).toHaveClass('custom-modal');
  });

  test('should support custom width', () => {
    render(
      <Modal visible width="400px">
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <div>This is a modal.</div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Cancel</Button>
          <Button type="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
    const modalWrapper = screen.getByTestId('modalWrapper') as Element;
    expect(modalWrapper).toHaveStyle('max-width: 400px');
  });

  test('should open modal and close modal when click target', async () => {
    render(<Component closeOnOverlayClick={true} />);
    await user.click(screen.getByTestId('openModal'));
    const modalContainer = await screen.findByTestId('modalContainer');
    expect(modalContainer).toBeInTheDocument();
    await user.click(modalContainer);
    // act(() => {
    //   jest.runAllTimers();
    // });
    await waitFor(() => {
      expect(screen.queryByTestId('modalContainer')).not.toBeInTheDocument();
    });
    expect(closeHandler).toHaveBeenCalledTimes(1);
  });

  test('should not close modal when disabled overlay clicked', async () => {
    render(<Component closeOnOverlayClick={false} />);
    await user.click(screen.getByTestId('openModal'));
    await user.click(await screen.findByTestId('modalContainer'));
    expect(closeHandler).toHaveBeenCalledTimes(0);
  });

  test('should not propagate the click event', async () => {
    render(<Component closeOnOverlayClick={true} />);
    await user.click(screen.getByTestId('openModal'));
    expect(await screen.findByTestId('modalContainer')).toBeInTheDocument();
    await user.click(await screen.findByTestId('modalWrapper'));
    expect(await screen.findByTestId('modalContainer')).toBeInTheDocument();
    expect(closeHandler).toHaveBeenCalledTimes(0);
  });

  test('should close modal when press the Escape key', async () => {
    render(<Component />);
    await user.click(screen.getByTestId('openModal'));
    await user.keyboard(`[${KeyCode.Escape}]`);
    await waitFor(() => {
      expect(screen.queryByTestId('modalContainer')).not.toBeInTheDocument();
    });
  });
});

import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Button, Modal, ModalProps } from '../..';

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
    const { getByTestId } = render(
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
    expect(getByTestId('modalWrapper')).toHaveClass('custom-modal');
  });

  test('should support custom width', () => {
    const { getByTestId } = render(
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
    const modalWrapper = getByTestId('modalWrapper') as Element;
    expect(getComputedStyle(modalWrapper).maxWidth).toBe('400px');
  });

  test('should open modal and close modal when click target', () => {
    const { getByTestId } = render(<Component closeOnOverlayClick={true} />);
    fireEvent.click(getByTestId('openModal'));
    setTimeout(() => {
      expect('This is a modal.').toBeInTheDocument();
    }, 50);
    fireEvent.click(document.querySelector('.raw-modal-container'));
    setTimeout(() => {
      expect('This is a modal.').not.toBeInTheDocument();
      expect(closeHandler).toHaveBeenCalledTimes(1);
    }, 350);
  });

  test('should not close modal when disabled overlay clicked', () => {
    const { getByTestId } = render(<Component closeOnOverlayClick={false} />);
    fireEvent.click(getByTestId('openModal'));
    fireEvent.click(document.querySelector('.raw-modal-container'));
    expect(closeHandler).toHaveBeenCalledTimes(0);
  });
});

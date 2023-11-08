import { useState } from 'react';
import Unit from '../Unit';
import { Button, Modal } from '@/packages';

export function DemoModalDefault() {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Unit layout="row">
      <>
        <Button onClick={openModal}>Open Modal</Button>
        <Modal visible={visible} onClose={closeModal}>
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
    </Unit>
  );
}

export function DemoModalNotCloseOnOverlayClick() {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Unit layout="row">
      <>
        <Button onClick={openModal}>Open Modal</Button>
        <Modal
          visible={visible}
          onClose={closeModal}
          closeOnOverlayClick={false}
        >
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
    </Unit>
  );
}

export function DemoModalWidth() {
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Unit layout="row">
      <>
        <Button onClick={openModal}>Open Modal</Button>
        <Modal visible={visible} onClose={closeModal} width="400px">
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
    </Unit>
  );
}

import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

export type ModalComponentType = typeof Modal & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

(Modal as ModalComponentType).Header = ModalHeader;
(Modal as ModalComponentType).Body = ModalBody;
(Modal as ModalComponentType).Footer = ModalFooter;

export default Modal as ModalComponentType;

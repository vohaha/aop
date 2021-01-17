import * as Modal from '@accessible/modal';
import React, { FC, useEffect } from 'react';
import './index.scss';
import { useModal } from '@accessible/modal';

export const ModalTarget: FC<{ onOpen?: () => void; onClose?: () => void }> = ({
  children,
  onOpen,
  onClose,
}) => {
  const { isOpen } = useModal();
  useEffect(() => {
    if (isOpen) {
      onOpen != null && onOpen();
    } else {
      onClose != null && onClose();
    }
  }, [isOpen, onClose, onOpen]);
  return (
    <Modal.Target portal preventScroll closeOnEscape openClass="modal--open">
      <div className="modal">
        <Modal.CloseButton>
          <div className="modal__underlay" />
        </Modal.CloseButton>
        <div className="modal__content">{children}</div>
      </div>
    </Modal.Target>
  );
};

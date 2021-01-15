import * as Modal from '@accessible/modal';
import React, { FC } from 'react';
import './index.scss';

export const ModalTarget: FC<any> = ({ children }) => (
  <Modal.Target portal preventScroll closeOnEscape openClass="modal--open">
    <div className="modal">
      <Modal.CloseButton>
        <div className="modal__underlay" />
      </Modal.CloseButton>
      <div className="modal__content">{children}</div>
    </div>
  </Modal.Target>
);

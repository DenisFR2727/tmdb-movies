import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

const modalElement = document.querySelector('#modal') as HTMLElement;
interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}
function Modal({ children, onClose }: ModalProps) {
    return createPortal(
        <div className={styles.modal}>
            <button className={styles.btnModalClose} onClick={() => onClose()}>
                <div className="btn-close"></div>
            </button>
            {children}
        </div>,
        modalElement
    );
}

export default Modal;

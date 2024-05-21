import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

const modalElement = document.querySelector('#modal') as HTMLElement;

function Modal({ children }: any) {
    return createPortal(
        <div className={styles.modal}>{children}</div>,
        modalElement
    );
}

export default Modal;

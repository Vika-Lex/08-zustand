'use client'

import css from './Modal.module.css';
import {createPortal} from "react-dom";
import {ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";

interface ModalProps {
    children?: ReactNode;
    onCloseModal?: () => void;
}

const Modal = ({children, onCloseModal}:ModalProps) => {
    const router = useRouter();
    const handleCloseModal = () => {
        if (onCloseModal) {
            onCloseModal();
        } else {
            router.back();
        }
    }

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) {
            return
        }
        handleCloseModal()
    }

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseModal()
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onCloseModal]);
    return createPortal(
        (
            <div
                onClick={handleBackdropClick}
                className={css.backdrop}
                role="dialog"
                aria-modal="true"
            >
                <div className={css.modal}>
                    {children}
                </div>
            </div>

        ), document.body
    );
};
export default Modal
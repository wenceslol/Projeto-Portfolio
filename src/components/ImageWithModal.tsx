import { useState } from 'react';
import { createPortal } from 'react-dom';
import '../styles/imagewithmodal.css';

type ImageModalProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ImageWithModal({ src, alt, className = '' }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const modal = (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          &times;
        </button>
        <img
          src={src}
          alt={alt}
          className="modal-image"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`image-with-modal ${className}`}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && createPortal(modal, document.body)}
    </>
  );
}

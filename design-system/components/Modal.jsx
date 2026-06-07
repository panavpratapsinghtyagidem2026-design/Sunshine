import { useEffect, useRef } from "react";
import "./Modal.css";

/**
 * Usage
 * — Reserve for genuinely blocking moments (confirm/cancel an SOS,
 *   confirm a destructive action, a single must-see notice). If the
 *   content can wait or be dismissed casually, it isn't a modal —
 *   use a Card or a page instead.
 * — Always provide exactly the actions the person needs to resolve the
 *   interruption (usually two: confirm / go back). Avoid stacking more
 *   than two actions — a confused tap here can have real consequences.
 * — Focus moves to the dialog on open and is trapped within it; closing
 *   returns focus to the element that opened it.
 */
export function Modal({ title, children, actions, onClose, labelledBy }) {
  const dialogRef = useRef(null);
  const titleId = labelledBy || "modal-title";

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal__overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        tabIndex={-1}
      >
        {title && (
          <h2 className="modal__title" id={titleId}>
            {title}
          </h2>
        )}
        {children && <div className="modal__body">{children}</div>}
        {actions && <div className="modal__actions">{actions}</div>}
      </div>
    </div>
  );
}

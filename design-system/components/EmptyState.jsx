import "./EmptyState.css";

/**
 * Usage
 * — Write `title`/`message` in a warm, human voice — never system-speak
 *   ("No data found"). E.g. "Your circle is just getting started" rather
 *   than "No community posts."
 * — `action`, when present, should be the single gentlest possible next
 *   step (e.g. "Say hello to your first neighbour"), not a hard sell.
 * — Never use this component for error states — that's a distinct,
 *   honest message (see Badge/inline alert patterns), not a soft "empty."
 */
export function EmptyState({ icon, title, message, action }) {
  return (
    <div className="empty-state">
      {icon && (
        <div className="empty-state__art" aria-hidden="true">
          {icon}
        </div>
      )}
      {title && <h3 className="empty-state__title">{title}</h3>}
      {message && <p className="empty-state__message">{message}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

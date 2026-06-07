import "./Badge.css";

/**
 * Usage
 * — Use to show *state* ("Medicine taken," "Reply needed," "Offline"),
 *   never as a generic label or tag — if it doesn't represent a status,
 *   it isn't a badge.
 * — Pick the tone that matches meaning, not the tone that looks nicest:
 *   success = completed/safe, warning = needs attention soon,
 *   danger = needs attention now, info = neutral status, neutral = inactive.
 */
export function Badge({ tone = "neutral", children }) {
  return (
    <span className={`badge badge--${tone}`}>
      <span className="badge__dot" aria-hidden="true" />
      {children}
    </span>
  );
}

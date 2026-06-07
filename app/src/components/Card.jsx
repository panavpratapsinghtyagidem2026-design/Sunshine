import "./Card.css";

/**
 * Usage
 * — Default card: any grouped content (a contact, a reminder, a post).
 * — `interactive`: only when the whole card navigates somewhere — if just
 *   one element inside it is actionable, put the action on that element
 *   instead, so the tap target matches what the user expects to happen.
 * — `tone`: reserve for cards that represent a *state* (an upcoming
 *   reminder = harbor, a completed wellbeing check-in = sage, something
 *   needing attention = marigold). Don't use tone for plain decoration.
 */
export function Card({
  eyebrow,
  title,
  tone,
  interactive = false,
  footer,
  children,
  ...rest
}) {
  const classes = [
    "card",
    interactive ? "card--interactive" : "",
    tone ? `card--${tone}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    >
      {eyebrow && <span className="card__eyebrow">{eyebrow}</span>}
      {title && <h3 className="card__title">{title}</h3>}
      {children && <div className="card__body">{children}</div>}
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
}

import "./Button.css";

/**
 * Usage
 * — primary: one per screen — the action you want most people to take.
 * — secondary: a real alternative ("Call instead of message").
 * — ghost: low-stakes, repeated actions inside lists or rows.
 * — danger: irreversible/destructive actions only — never for SOS or alerts.
 *
 * Do not: stack more than one `primary` button in the same view — it
 * removes the very decisiveness the style exists to create.
 */
export function Button({
  variant = "primary",
  size = "comfortable",
  icon,
  full = false,
  disabled = false,
  type = "button",
  children,
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size === "compact" ? "btn--compact" : "",
    full ? "btn--full" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}

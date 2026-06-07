import { useId } from "react";
import "./Input.css";

/**
 * Usage
 * — Always pass a `label`; it is rendered visibly and permanently above
 *   the field. Do not rely on placeholder text as a label substitute —
 *   it disappears exactly when it's needed most.
 * — Use `hint` for one-line guidance ("We'll only call, never text"),
 *   and `error` for validation problems. Both are announced to screen
 *   readers via aria-describedby; `error` additionally sets aria-invalid.
 * — Use `as="textarea"` for any answer likely to run beyond one line —
 *   resizing a single-line input to fit a paragraph reads as broken.
 */
export function Input({
  label,
  hint,
  error,
  as = "input",
  id,
  ...rest
}) {
  const autoId = useId();
  const fieldId = id || autoId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const Control = as === "textarea" ? "textarea" : "input";

  return (
    <div className={`field${error ? " field--error" : ""}`}>
      <label className="field__label" htmlFor={fieldId}>
        {label}
      </label>
      {hint && (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      )}
      <Control
        id={fieldId}
        className="field__control"
        aria-invalid={Boolean(error)}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        {...rest}
      />
      {error && (
        <span className="field__error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

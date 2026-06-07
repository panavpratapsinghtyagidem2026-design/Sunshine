import "./NavBar.css";

/**
 * Usage
 * — Maximum 5 items, every one labeled with a real word (no icon-only
 *   entries) — see the rationale comment in NavBar.css.
 * — Exactly one item should use `variant="sos"`, and it should always
 *   occupy the same position across every screen of the app. Consistency
 *   of *position* is what lets a frightened person find it without reading.
 */
export function NavBar({ items, activeId, onSelect }) {
  return (
    <nav className="navbar" aria-label="Primary">
      {items.map((item) => {
        const isActive = item.id === activeId;
        const isSos = item.variant === "sos";
        const classes = [
          "navbar__item",
          isActive ? "navbar__item--active" : "",
          isSos ? "navbar__item--sos" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={item.id}
            type="button"
            className={classes}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onSelect(item.id)}
          >
            <span className="navbar__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

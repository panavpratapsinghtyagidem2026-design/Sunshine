import { useEffect, useState } from "react";
import "./SOSButton.css";

const ARM_WINDOW_MS = 4000;

/**
 * Usage
 * — There is exactly one of these in the product, always in the same
 *   physical position (bottom navigation, see NavBar). Never duplicate
 *   it as a "quick action" elsewhere — one unambiguous location is what
 *   makes it findable under stress.
 * — Press once to "arm" (a visible countdown begins, label changes to
 *   "Sending help in 4… tap to cancel"); press again within the window
 *   to cancel; let it run out to send. This protects against accidental
 *   triggers WITHOUT ever blocking on a confirmation dialog — a person
 *   in real distress should never have to read and dismiss a modal.
 * — `onTrigger` fires only when the window completes. Wire it directly
 *   to the real escalation path (alert contacts / emergency services);
 *   this component must never be the last line of defense on its own.
 */
export function SOSButton({ onTrigger, label = "SOS" }) {
  const [phase, setPhase] = useState("idle"); // idle | armed | sent
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (phase !== "armed") return undefined;

    setSecondsLeft(Math.ceil(ARM_WINDOW_MS / 1000));
    const tick = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    const fire = setTimeout(() => {
      setPhase("sent");
      onTrigger?.();
    }, ARM_WINDOW_MS);

    return () => {
      clearInterval(tick);
      clearTimeout(fire);
    };
  }, [phase, onTrigger]);

  function handlePress() {
    if (phase === "idle") setPhase("armed");
    else if (phase === "armed") setPhase("idle");
  }

  const classes = ["sos-button", phase !== "idle" ? `sos-button--${phase}` : ""]
    .filter(Boolean)
    .join(" ");

  const display =
    phase === "idle"
      ? { title: label, sub: "Tap for help" }
      : phase === "armed"
      ? { title: `${secondsLeft}…`, sub: "Tap to cancel" }
      : { title: "On the way", sub: "Help is coming" };

  return (
    <button
      type="button"
      className={classes}
      onClick={handlePress}
      aria-live="assertive"
      aria-label={
        phase === "idle"
          ? "Send an emergency alert"
          : phase === "armed"
          ? `Sending an emergency alert in ${secondsLeft} seconds. Tap to cancel.`
          : "Emergency alert sent. Help is on the way."
      }
    >
      <span aria-hidden="true">{display.title}</span>
      <span className="sos-button__label" aria-hidden="true">
        {display.sub}
      </span>
    </button>
  );
}

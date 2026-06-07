import { useState } from "react";
import { SOSButton } from "../components/SOSButton.jsx";
import { Card } from "../components/Card.jsx";
import { Badge } from "../components/Badge.jsx";
import { Button } from "../components/Button.jsx";
import { sampleContacts } from "../data/sampleContacts.js";
import "./SOSScreen.css";

/**
 * Phase 1 — proves out the SOS flow end to end on its own screen:
 * idle → armed/countdown (handled inside SOSButton) → sent → confirmation.
 * No backend yet: "sending" is simulated, and the contact list is sample
 * data. The real escalation wiring is a Phase 4+ decision.
 */
export function SOSScreen() {
  const [sent, setSent] = useState(false);

  return (
    <main className="sos-screen">
      {!sent ? (
        <>
          <p className="sos-screen__eyebrow">Sunshine is here</p>
          <h1>If something's wrong, press the button below</h1>
          <p className="sos-screen__lead">
            Hold nothing back — pressing it once starts a short countdown.
            If you don't need help, just tap it again to cancel.
          </p>

          <div className="sos-screen__stage">
            <SOSButton onTrigger={() => setSent(true)} />
          </div>

          <Card eyebrow="Who gets told" title="Your circle will be alerted in this order">
            <ul className="sos-screen__contact-list">
              {sampleContacts.map((contact) => (
                <li key={contact.id}>
                  <span className="sos-screen__contact-name">{contact.name}</span>
                  <span className="sos-screen__contact-role">{contact.role}</span>
                  <Badge tone="info">{contact.method}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </>
      ) : (
        <Card tone="sage" eyebrow="Alert sent" title="Help is on the way">
          <p>
            We've let your circle know you need help. Someone should be in
            touch with you very soon.
          </p>
          <ul className="sos-screen__contact-list">
            {sampleContacts.map((contact) => (
              <li key={contact.id}>
                <span className="sos-screen__contact-name">{contact.name}</span>
                <Badge tone="success">Notified</Badge>
              </li>
            ))}
          </ul>
          <div className="sos-screen__actions">
            <Button variant="secondary" onClick={() => setSent(false)}>
              I'm alright now — start over
            </Button>
          </div>
        </Card>
      )}
    </main>
  );
}

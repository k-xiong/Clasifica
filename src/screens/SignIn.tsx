import logo from "../assets/obra-padre-cacho-logo.png";
import { copy, type Language } from "../data";
import { SettingsIcon, SpeakerIcon } from "../icons";

type Props = {
  language: Language;
  onSpeak: () => void;
  onSignIn: () => void;
};

export default function SignIn({ language, onSpeak, onSignIn }: Props) {
  const en = language === "EN";
  return (
    <div className="screen sign-in-screen">
      <div className="sign-in-actions">
        {/* ponytail: not wired up yet; gets an onClick when the Settings screen is ported */}
        <button type="button" className="settings-button" aria-label="Open settings">
          <SettingsIcon />
        </button>
        <button
          type="button"
          className="language-button speaker-button"
          onClick={onSpeak}
          aria-label={en ? "Hear instructions" : "Escuchar instrucciones"}
        >
          <SpeakerIcon />
        </button>
      </div>

      <div className="brand-card">
        <img
          className="brand-logo-image"
          src={logo}
          alt="Obra Padre Cacho, Organización San Vicente"
        />
      </div>

      <div className="sign-in-copy">
        <span className="eyebrow">Montevideo · Uruguay</span>
        <h2>
          {en ? "Small actions," : "Pequeñas acciones,"}
          <br />
          {en ? "lasting change." : "cambios duraderos."}
        </h2>
      </div>

      <button type="button" className="primary-button" onClick={onSignIn}>
        {copy[language].signIn}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
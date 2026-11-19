import { clientPlaces, organizations, type Classification, type Language } from "../data";

type Props = {
  language: Language;
  draft: Classification;
  onSelectOrganization: (id: string, name: string) => void;
  onSelectLocation: (location: string) => void;
  onContinue: () => void;
};

export default function ClassifySetup({
  language,
  draft,
  onSelectOrganization,
  onSelectLocation,
  onContinue,
}: Props) {
  const en = language === "EN";
  // "Client Nuevo" is not offered when collecting or classifying.
  const clients = organizations.filter((o) => o.id !== "nuevo");
  const locations = clientPlaces[draft.organization] ?? [];

  return (
    <div className="screen flow-screen">
      <div className="flow-heading">
        <span className="eyebrow">{en ? "Classify" : "Clasificar"}</span>
        <h2>{en ? "Organization" : "Organización"}</h2>
      </div>

      <section className="choice-section">
        <div className="organization-grid">
          {clients.map((item, index) => {
            const selected = draft.organization === item.id;
            return (
              <button
                type="button"
                key={item.id}
                className={`visual-choice ${selected ? "is-selected" : ""}`}
                onClick={() => onSelectOrganization(item.id, item.name)}
                aria-pressed={selected}
              >
                <span className="organization-logo">Logo</span>
                <span>
                  <small>{index + 1}</small>
                  <strong>{item.name}</strong>
                </span>
                <span className="selection-check" aria-hidden="true">
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="flow-heading inline-flow-heading">
        <h2>{en ? "Location" : "Ubicación"}</h2>
      </div>
      <section className="choice-section">
        <div className="location-grid">
          {locations.map((item, index) => {
            const selected = draft.location === item;
            return (
              <button
                type="button"
                key={item}
                className={`location-choice ${selected ? "is-selected" : ""}`}
                onClick={() => onSelectLocation(item)}
                aria-pressed={selected}
              >
                <span className="choice-number">{index + 1}</span>
                <strong>{item}</strong>
                <span className="selection-check" aria-hidden="true">
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        className="primary-button flow-continue"
        disabled={!draft.organization || !draft.location}
        onClick={onContinue}
      >
        {en ? "Review classification" : "Revisar clasificación"}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
import { categories, materialOptions, type CategoryId, type Language } from "../data";
import { CategoryIcon, SpeakerIcon } from "../icons";
import { materialLabel } from "../materials";

type Props = {
  language: Language;
  category: CategoryId;
  weights: Record<string, number>;
  onPickMaterial: (material: string) => void;
  onHearOptions: () => void;
  onDone: () => void;
};

export default function ClassifyMaterial({
  language,
  category,
  weights,
  onPickMaterial,
  onHearOptions,
  onDone,
}: Props) {
  const en = language === "EN";
  const cat = categories.find((c) => c.id === category)!;

  return (
    <div className="screen flow-screen material-screen">
      <div className="flow-heading compact-heading">
        <span className="category-title-icon">
          <CategoryIcon category={category} />
        </span>
        <span className="eyebrow material-type-eyebrow">
          {en ? cat.en : cat.es}
        </span>
        <h2>{en ? "Classify" : "Clasificar"}</h2>
      </div>

      <button type="button" className="collect-voice-guide" onClick={onHearOptions}>
        <SpeakerIcon />
        {en ? "Hear options" : "Escuchar opciones"}
      </button>

      <div className="material-list">
        {materialOptions[category].map((material, index, all) => {
          const selected = material in weights;
          // Spread the shades from the category's full color to a lighter tint.
          const lighten = all.length > 1 ? (index / (all.length - 1)) * 45 : 0;
          const shade = `color-mix(in srgb, ${cat.color} ${100 - lighten}%, white)`;
          return (
            <div className="material-row" key={material}>
              <button
                type="button"
                className={`material-card ${selected ? "is-selected" : ""}`}
                onClick={() => onPickMaterial(material)}
                aria-pressed={selected}
              >
                <span className="material-picture" style={{ background: shade }}>
                  <CategoryIcon category={category} />
                </span>
                <span className="numbered-label">
                  <small>{index + 1}</small>
                  <strong>{materialLabel(material, language)}</strong>
                </span>
                {selected && <span className="weight-badge">{weights[material]} kg</span>}
              </button>
            </div>
          );
        })}
      </div>

      <button type="button" className="primary-button done-button" onClick={onDone}>
        {en ? "Done" : "Listo"}
        <span aria-hidden="true">✓</span>
      </button>
    </div>
  );
}

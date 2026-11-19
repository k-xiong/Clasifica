import { categories, organizations, type CategoryId, type Language } from "../data";
import { totalWeight, type Collection } from "../collect";
import { CategoryIcon, SpeakerIcon } from "../icons";

type Props = {
  language: Language;
  draft: Collection;
  /** Tapping a category starts a new bag of that category (open your weight entry here). */
  onPickCategory: (category: CategoryId) => void;
  onSummary: () => void;
  onHearOptions: () => void;
};

export default function CollectCategories({
  language,
  draft,
  onPickCategory,
  onSummary,
  onHearOptions,
}: Props) {
  const en = language === "EN";
  const count = draft.bags.length;
  const total = totalWeight(draft.bags);
  const orgName =
    organizations.find((o) => o.id === draft.organization)?.name ?? draft.organization.toUpperCase();

  return (
    <div className="screen flow-screen category-screen">
      <div className="flow-heading compact-heading">
        <span className="eyebrow">
          {orgName} · {draft.location}
        </span>
        <h2>{en ? "Collect" : "Recolectar"}</h2>
      </div>

      <button type="button" className="collect-voice-guide" onClick={onHearOptions}>
        <SpeakerIcon />
        {en ? "Hear options" : "Escuchar opciones"}
      </button>

      <div className="category-list">
        {categories.map((category, index) => (
          <div className="category-row" key={category.id}>
            <button
              type="button"
              className="category-card"
              style={{ "--category-color": category.color } as React.CSSProperties}
              onClick={() => onPickCategory(category.id)}
            >
              <span className="category-art">
                <CategoryIcon category={category.id} />
              </span>
              <span className="numbered-label">
                <small>{index + 1}</small>
                <strong>{en ? category.en : category.es}</strong>
              </span>
              <span className="card-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        ))}
      </div>

      <div className="classification-footer">
        <span>
          <strong>{count}</strong>
          {en ? (count === 1 ? " bag" : " bags") : count === 1 ? " bolsa" : " bolsas"} · {total.toFixed(1)} kg
        </span>
        <button type="button" onClick={onSummary}>
          {en ? "Summary" : "Resumen"}
        </button>
      </div>
    </div>
  );
}
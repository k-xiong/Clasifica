import { useState } from "react";
import { categoryOf, type CategoryId, type Language } from "../data";
import { CategoryIcon } from "../icons";

type Props = {
  language: Language;
  material: string;
  /** Picture shown at the top; defaults to the material's own category. */
  category?: CategoryId;
  initialWeight: number;
  onCancel: () => void;
  onSave: (weight: number) => void;
};

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];
const MAX_LENGTH = 7;
const MAX_DECIMALS = 2;

/** Big number pad for typing a weight in kilograms (made for gloves and large fingers). */
export default function WeightSheet({
  language,
  material,
  category,
  initialWeight,
  onCancel,
  onSave,
}: Props) {
  const en = language === "EN";
  const [text, setText] = useState(String(initialWeight));
  // The first key typed replaces the starting value instead of adding to it.
  const [fresh, setFresh] = useState(true);

  function press(key: string) {
    if (key === "⌫") {
      setText((t) => (t.length > 1 ? t.slice(0, -1) : "0"));
      setFresh(false);
      return;
    }
    const base = fresh ? "" : text;
    setFresh(false);
    if (base.length >= MAX_LENGTH) return setText(base);
    if (key === ".") {
      if (base.includes(".")) return setText(base);
      return setText(base === "" ? "0." : `${base}.`);
    }
    if (base.includes(".") && base.split(".")[1].length >= MAX_DECIMALS) return setText(base);
    setText(base === "" || base === "0" ? key : base + key);
  }

  const weight = Number(text);
  const valid = Number.isFinite(weight) && weight > 0;

  return (
    <div className="help-overlay" role="dialog" aria-modal="true" aria-label={en ? "Material weight" : "Peso del material"}>
      <div className="help-sheet weight-sheet">
        <span className="weight-illustration">
          <CategoryIcon category={category ?? categoryOf(material)} />
        </span>
        <span className="eyebrow">{en ? "Material weight" : "Peso del material"}</span>
        <h3>{material}</h3>

        <output className="weight-display" aria-live="polite">
          <strong>{text}</strong> kg
        </output>

        <div className="weight-keypad">
          {KEYS.map((key) => (
            <button
              type="button"
              key={key}
              onClick={() => press(key)}
              aria-label={key === "⌫" ? (en ? "Delete last digit" : "Borrar último dígito") : key === "." ? (en ? "Decimal point" : "Punto decimal") : key}
            >
              {key}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            {en ? "Cancel" : "Cancelar"}
          </button>
          <button
            type="button"
            className="primary-button"
            style={{ justifyContent: "center" }}
            disabled={!valid}
            onClick={() => onSave(weight)}
          >
            {en ? "Add weight" : "Agregar peso"}
          </button>
        </div>
      </div>
    </div>
  );
}
import type { Language } from "./data";

/** Spanish names for the materials in data.ts. Weights stay keyed by the English name. */
const materialEs: Record<string, string> = {
  "White paper": "Papel blanco",
  "Colored paper": "Papel de color",
  Magazine: "Revista",
  Newspaper: "Diario",
  "Corrugated cardboard": "Cartón corrugado",
  "Colored cardboard": "Cartón de color",
  "Clear PET (1)": "PET transparente (1)",
  "Green PET (1)": "PET verde (1)",
  "White PET (1)": "PET blanco (1)",
  "Bottle – HDPE (2)": "Botella – HDPE (2)",
  "Clear film – LDPE (4)": "Film transparente – LDPE (4)",
  "Colored film – LDPE (4)": "Film de color – LDPE (4)",
  "Foam – PS (6)": "Espuma – PS (6)",
  "Polypropylene – PP (5)": "Polipropileno – PP (5)",
  "Other plastic (7)": "Otro plástico (7)",
  "Aluminum cans": "Latas de aluminio",
  "Scrap metal cans": "Latas de chatarra",
  Electronics: "Electrónicos",
  Glass: "Vidrio",
  "Tetra Pak": "Tetra Pak",
  "Fruit & vegetables": "Frutas y verduras",
  "Coffee & tea": "Café y té",
  "Garden waste": "Restos de jardín",
  "Food scraps": "Restos de comida",
  "Dirty packaging": "Envases sucios",
  Ceramics: "Cerámica",
  "Sanitary waste": "Residuos sanitarios",
  "Mixed waste": "Residuos mezclados",
};

/** The material's name in the chosen language (falls back to the English name). */
export function materialLabel(material: string, language: Language): string {
  return language === "ES" ? (materialEs[material] ?? material) : material;
}
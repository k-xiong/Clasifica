import { categories, copy, materialOptions, type CategoryId, type Language, type Screen } from "./data";
import { materialLabel } from "./materials";

type Text = { EN: string; ES: string };

/** What the top-right speaker button reads on each page: what the user needs to do or fill out. */
const pageText: Partial<Record<Screen, Text>> = {
  "sign-in": {
    EN: "Tap Sign in to start.",
    ES: "Toque Iniciar sesión para comenzar.",
  },
  users: {
    EN: "Tap your name to enter the app.",
    ES: "Toque su nombre para entrar a la aplicación.",
  },
  "collect-setup": {
    EN: "Step one: choose the organization by tapping its button. Step two: choose the location. Then tap Review collection.",
    ES: "Paso uno: elija la organización tocando su botón. Paso dos: elija la ubicación. Luego toque Revisar recolección.",
  },
  "collect-review": {
    EN: "This is your collection in progress. Tap Edit next to the date to change the date and time. Tap Add bag to add a bag, or Send when you are done. Tap Hear summary to listen to the bags you added.",
    ES: "Esta es su recolección en curso. Toque Editar junto a la fecha para cambiar la fecha y la hora. Toque Agregar bolsa para añadir una bolsa, o Enviar cuando termine. Toque Escuchar resumen para oír las bolsas agregadas.",
  },
  "collect-categories": {
    EN: "Choose the type of material in the bag by tapping an option. Then type the weight in kilograms with the number pad and tap Add weight. Tap Hear options to listen to the list. Tap Summary when you are done.",
    ES: "Elija el tipo de material de la bolsa tocando una opción. Luego escriba el peso en kilos con el teclado y toque Agregar peso. Toque Escuchar opciones para oír la lista. Toque Resumen cuando termine.",
  },
  "classify-setup": {
    EN: "Step one: choose the organization by tapping its button. Step two: choose the location. Then tap Review classification.",
    ES: "Paso uno: elija la organización tocando su botón. Paso dos: elija la ubicación. Luego toque Revisar clasificación.",
  },
  review: {
    EN: "This is your classification in progress. Tap Edit next to the date to change the date and time. Tap Add bag to add materials, or Send when you are done. Tap Hear summary to listen to the materials you added.",
    ES: "Esta es su clasificación en curso. Toque Editar junto a la fecha para cambiar la fecha y la hora. Toque Agregar bolsa para añadir materiales, o Enviar cuando termine. Toque Escuchar resumen para oír los materiales agregados.",
  },
  "classify-categories": {
    EN: "Choose the type of material by tapping an option. Then choose the specific material. Tap Hear options to listen to the list. Tap Summary when you are done.",
    ES: "Elija el tipo de material tocando una opción. Luego elija el material específico. Toque Escuchar opciones para oír la lista. Toque Resumen cuando termine.",
  },
  material: {
    EN: "Choose the material by tapping an option. Then type the weight in kilograms with the number pad and tap Add weight. Tap Hear options to listen to the list. Tap Done when you finish.",
    ES: "Elija el material tocando una opción. Luego escriba el peso en kilos con el teclado y toque Agregar peso. Toque Escuchar opciones para oír la lista. Toque Listo cuando termine.",
  },
  history: {
    EN: "Here you can review or edit past work. Tap Collected or Classified to switch lists. Use the search box to find an entry. Tap Edit to change the weight or number of bags, or the trash icon to delete an entry. Tap Hear summary to listen to the totals.",
    ES: "Aquí puede revisar o editar trabajos anteriores. Toque Recolectado o Clasificado para cambiar de lista. Use el buscador para encontrar un registro. Toque Editar para cambiar el peso o la cantidad de bolsas, o la papelera para eliminar un registro. Toque Escuchar resumen para oír los totales.",
  },
  "evidence-setup": {
    EN: "Choose the client, then the location where you took the photos. Then tap Continue.",
    ES: "Elija el cliente y luego la ubicación donde tomó las fotos. Luego toque Continuar.",
  },
  "evidence-entry": {
    EN: "Tap Take photo to add up to four clear photos of the work area. If you want, write a note. Then tap Review and send.",
    ES: "Toque Tomar foto para agregar hasta cuatro fotos claras del lugar de trabajo. Si quiere, escriba una nota. Luego toque Revisar y enviar.",
  },
  settings: {
    EN: "Adjust the app to suit you with the options on this page.",
    ES: "Ajuste la aplicación a su medida con las opciones de esta página.",
  },
};

export function pageInstructions(screen: Screen, language: Language): string {
  if (screen === "dashboard") {
    const options = copy[language].options.map((option, i) => `${i + 1}, ${option}`).join(". ");
    return language === "EN"
      ? `Choose an option. ${options}. Tap the information icon next to an option to hear how it works.`
      : `Elija una opción. ${options}. Toque el icono de información junto a una opción para oír cómo funciona.`;
  }
  return pageText[screen]?.[language] ?? "";
}

/** Spoken "learn more" summary for each dashboard feature, in dashboard order. */
const featureText: Text[] = [
  {
    EN: "Collect. Use this when you pick up bags of materials. Choose the organization and the location, add each bag with its type of material and its weight, and tap Send at the end.",
    ES: "Recolectar. Use esta opción cuando recoja bolsas de materiales. Elija la organización y la ubicación, agregue cada bolsa con su tipo de material y su peso, y toque Enviar al final.",
  },
  {
    EN: "Classify. Use this to sort materials in detail at the drop-off center. Choose the organization and the location, then pick each type of material, enter its weight, and tap Send.",
    ES: "Clasificar. Use esta opción para clasificar los materiales en detalle en el centro de acopio. Elija la organización y la ubicación, luego elija cada tipo de material, escriba su peso y toque Enviar.",
  },
  {
    EN: "History. Use this to look at past work. You can search for an entry, change its weight or number of bags, or delete it. If you delete one by mistake, tap Undo.",
    ES: "Historial. Use esta opción para ver trabajos anteriores. Puede buscar un registro, cambiar su peso o la cantidad de bolsas, o eliminarlo. Si elimina uno por error, toque Deshacer.",
  },
  {
    EN: "Record. Use this to take photos of the work area when you finish a pickup, so there is proof of how the place was left. Choose the organization and the location, take up to four photos, and tap Review and send.",
    ES: "Registrar. Use esta opción para tomar fotos del lugar de trabajo al terminar una recolección, y dejar constancia de cómo quedó el lugar. Elija la organización y la ubicación, tome hasta cuatro fotos y toque Revisar y enviar.",
  },
];

export function featureInfo(index: number, language: Language): string {
  return featureText[index]?.[language] ?? "";
}

/** "Option 1: Paper and cardboard. Option 2: ..." for the category list. */
export function categoryOptionsText(language: Language): string {
  const en = language === "EN";
  const list = categories
    .map((c, i) => `${en ? "Option" : "Opción"} ${i + 1}: ${en ? c.en : c.es}.`)
    .join(" ");
  return `${en ? "Type of material." : "Tipo de material."} ${list}`;
}

/** "Option 1: White paper. ..." for the materials inside one category. */
export function materialOptionsText(category: CategoryId, language: Language): string {
  const en = language === "EN";
  const cat = categories.find((c) => c.id === category);
  const list = materialOptions[category]
    .map((m, i) => `${en ? "Option" : "Opción"} ${i + 1}: ${materialLabel(m, language)}.`)
    .join(" ");
  return `${en ? "Type of material:" : "Tipo de material:"} ${en ? cat?.en : cat?.es}. ${list}`;
}
/* DE/EN/FR language handling (same pattern as the main Hamster Rocket demo). Load in <head>.
   Static text: <span data-l="en">…</span><span data-l="de">…</span><span data-l="fr">…</span> (CSS hides the inactive ones).
   Dynamic text: HRI18N.t(key, englishFallback). Auto-detect: fr* -> fr, de* -> de, else en. A manual choice is remembered. */
(() => {
  const KEY = "hr_lang", LANGS = ["en", "de", "fr"];
  let saved = null; try { saved = localStorage.getItem(KEY); } catch (e) { }
  const nav = ((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase();
  const guess = /^fr\b/.test(nav) ? "fr" : /^de\b/.test(nav) ? "de" : "en";
  let lang = LANGS.includes(saved) ? saved : guess;
  const root = document.documentElement;
  root.dataset.lang = lang; root.lang = lang;

  const DICT = {
    de: {
      "hud.perfect": "PERFEKT!", "hud.combo": "KOMBO", "hud.tap": "TIPPEN ZUM FALLENLASSEN!",
      "ui.best": "Bestwert", "ui.blocks": "Blöcke", "ui.combo": "beste Kombo", "ui.noBest": "Noch kein Bestwert. Leg los!",
      "share.text": "Ich habe einen Turm aus {n} Blöcken in Hamster Stack gebaut 🐹🌻 Schaffst du mehr?",
      "a11y.mute": "Ton aus", "a11y.unmute": "Ton an"
    },
    fr: {
      "hud.perfect": "PARFAIT !", "hud.combo": "COMBO", "hud.tap": "TAPE POUR LÂCHER !",
      "ui.best": "Record", "ui.blocks": "blocs", "ui.combo": "meilleur combo", "ui.noBest": "Pas encore de record. À toi de jouer !",
      "share.text": "J’ai empilé une tour de {n} blocs dans Hamster Stack 🐹🌻 Tu peux faire mieux\u00a0?",
      "a11y.mute": "Couper le son", "a11y.unmute": "Activer le son"
    }
  };
  const t = (k, en) => (DICT[lang] && DICT[lang][k]) || en;
  function sync() {
    document.querySelectorAll("[data-lang-btn]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.langBtn === lang)));
    document.querySelectorAll("[data-i18n-attr]").forEach(el => { const [attr, en, de, fr] = el.dataset.i18nAttr.split("|"); el.setAttribute(attr, lang === "de" ? de : lang === "fr" ? (fr || en) : en); });
    window.dispatchEvent(new CustomEvent("hr:lang", { detail: lang }));
  }
  function set(l) {
    lang = LANGS.includes(l) ? l : "en"; root.dataset.lang = lang; root.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) { }
    sync();
  }
  window.HRI18N = { t, set, get lang() { return lang; } };
  document.addEventListener("DOMContentLoaded", () => {
    sync();   // auto-detected language is applied but not stored as a choice
    document.querySelectorAll("[data-lang-btn]").forEach(b => b.addEventListener("click", () => set(b.dataset.langBtn)));
  });
})();

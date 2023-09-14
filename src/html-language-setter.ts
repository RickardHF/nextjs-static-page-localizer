import { useDetermineLanguage } from "./helpers/language-determinor";
const { setHtmlLanguage } = require("./lang-support");

export function useLanguageSetter() {
    const language = useDetermineLanguage();
    setHtmlLanguage(language);
}
